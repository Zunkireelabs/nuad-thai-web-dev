#!/usr/bin/env node
// Deep mobile audit: takes a screenshot every viewport-height down the entire
// mobile page so we get full coverage of every section, plus per-<section>
// labelled snapshots when sections are tagged.

import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const TARGET_URL = process.argv[2] || 'http://localhost:3000';
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const ROOT = join(process.cwd(), 'qa-reports', ts + '-mobile-deep');

const browser = await chromium.launch();
const context = await browser.newContext(devices['iPhone 13']);
const page = await context.newPage();

await mkdir(ROOT, { recursive: true });

await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(2500);

const docHeight = await page.evaluate(() => document.body.scrollHeight);
const vh = await page.evaluate(() => window.innerHeight);
process.stderr.write(`[deep] doc=${docHeight}px vh=${vh}px\n`);

// scroll all the way down once to trigger lazy loaders, then back up
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, y);
      y += 400;
      if (y < document.body.scrollHeight) setTimeout(step, 50);
      else resolve();
    };
    step();
  });
});
await page.waitForTimeout(1000);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);

// Frame-by-frame screenshots
const stride = Math.floor(vh * 0.85); // overlap a bit so nothing is split awkwardly
let i = 0;
for (let y = 0; y < docHeight; y += stride) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await page.waitForTimeout(400);
  const path = join(ROOT, `frame-${String(i).padStart(2, '0')}-y${y}.png`);
  await page.screenshot({ path });
  i++;
}

// Per-<section> screenshots if any
const sections = await page.$$('section, header, footer, main > div');
let s = 0;
for (const sec of sections) {
  try {
    const id = (await sec.getAttribute('id')) || (await sec.getAttribute('data-section')) || '';
    const path = join(ROOT, `section-${String(s).padStart(2, '0')}-${id || 'anon'}.png`);
    await sec.screenshot({ path });
    s++;
  } catch {
    // skip elements that can't be screenshotted (e.g. zero height)
  }
}

await browser.close();
process.stderr.write(`[deep] frames=${i} sections=${s} dir=${ROOT}\n`);
console.log(JSON.stringify({ dir: ROOT, frames: i, sections: s, target: TARGET_URL }, null, 2));
