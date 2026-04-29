#!/usr/bin/env node
// QA audit: loads the site in desktop + tablet + mobile viewports, captures
// screenshots, console errors, failed requests, layout overflow, broken images,
// and heading structure. Outputs a JSON report + PNGs under qa-reports/<ts>/.
//
// Usage:
//   node scripts/qa-audit.mjs                          # audits prod (https://nuadthainepal.com)
//   node scripts/qa-audit.mjs https://...              # audits given URL
//   node scripts/qa-audit.mjs --local                  # audits http://localhost:3000

import { chromium, devices } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const localFlag = args.includes('--local');
const urlArg = args.find((a) => a.startsWith('http'));
const TARGET_URL = urlArg ?? (localFlag ? 'http://localhost:3000' : 'https://nuadthainepal.com');

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, isMobile: false },
  { name: 'tablet',  viewport: { width: 768,  height: 1024 }, deviceScaleFactor: 2, isMobile: true  },
  { name: 'mobile',  ...devices['iPhone 13'] },
];

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const ROOT = join(process.cwd(), 'qa-reports', ts);

async function auditViewport(browser, vp) {
  const dir = join(ROOT, vp.name);
  await mkdir(dir, { recursive: true });

  const context = await browser.newContext(vp);
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    const entry = { type: msg.type(), text: msg.text(), location: msg.location() };
    if (msg.type() === 'error') consoleErrors.push(entry);
    else if (msg.type() === 'warning') consoleWarnings.push(entry);
  });
  page.on('pageerror', (err) => pageErrors.push({ name: err.name, message: err.message, stack: err.stack }));
  page.on('requestfailed', (req) =>
    failedRequests.push({
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType(),
      failure: req.failure()?.errorText ?? null,
    })
  );

  const t0 = Date.now();
  let navError = null;
  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (err) {
    navError = err.message;
  }
  const loadMs = Date.now() - t0;

  // let GSAP/lenis settle
  await page.waitForTimeout(2500);

  await page.screenshot({ path: join(dir, 'fold.png') });
  await page.screenshot({ path: join(dir, 'full.png'), fullPage: true });

  // scroll-driven sections — sample two more frames mid + bottom
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(dir, 'mid.png') });

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(dir, 'bottom.png') });

  // back to top for diagnostics
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(200);

  const diagnostics = await page.evaluate(() => {
    const docEl = document.documentElement;
    const horizontalOverflow = docEl.scrollWidth > docEl.clientWidth;
    const overflowDelta = docEl.scrollWidth - docEl.clientWidth;

    const imgs = Array.from(document.querySelectorAll('img'));
    const brokenImages = imgs
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => ({ src: img.currentSrc || img.src, alt: img.alt || null }));
    const missingAlt = imgs.filter((img) => !img.hasAttribute('alt')).map((img) => img.currentSrc || img.src);

    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4'))
      .map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 100) }));

    const h1Count = document.querySelectorAll('h1').length;

    const links = Array.from(document.querySelectorAll('a'));
    const emptyHrefs = links
      .filter((a) => {
        const h = a.getAttribute('href');
        return h === null || h === '' || h === '#';
      })
      .map((a) => ({ text: (a.textContent || '').trim().slice(0, 60), href: a.getAttribute('href') }));

    // viewport-overflowing elements (common cause of horizontal scroll on mobile)
    const vw = window.innerWidth;
    const overflowingEls = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0) {
        overflowingEls.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && typeof el.className === 'string' ? el.className : '').slice(0, 80),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    });

    return {
      title: document.title,
      url: location.href,
      horizontalOverflow,
      overflowDelta,
      overflowingElements: overflowingEls.slice(0, 20),
      brokenImages,
      imagesMissingAlt: missingAlt.slice(0, 20),
      imageCount: imgs.length,
      headings,
      h1Count,
      emptyOrHashLinks: emptyHrefs.slice(0, 30),
      docHeight: document.body.scrollHeight,
      viewportWidth: vw,
      viewportHeight: window.innerHeight,
    };
  });

  await context.close();

  return {
    viewport: vp.name,
    loadMs,
    navError,
    consoleErrors,
    consoleWarnings: consoleWarnings.slice(0, 20),
    pageErrors,
    failedRequests,
    diagnostics,
    screenshots: {
      fold: join(dir, 'fold.png'),
      full: join(dir, 'full.png'),
      mid: join(dir, 'mid.png'),
      bottom: join(dir, 'bottom.png'),
    },
  };
}

async function main() {
  await mkdir(ROOT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const vp of VIEWPORTS) {
      process.stderr.write(`[qa-audit] auditing ${vp.name} @ ${TARGET_URL}\n`);
      const r = await auditViewport(browser, vp);
      results.push(r);
    }
  } finally {
    await browser.close();
  }

  const report = { target: TARGET_URL, timestamp: ts, results };
  const reportPath = join(ROOT, 'report.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  process.stderr.write(`[qa-audit] report: ${reportPath}\n`);
  // stdout = machine-readable summary for callers
  console.log(JSON.stringify({ reportDir: ROOT, reportPath, target: TARGET_URL }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
