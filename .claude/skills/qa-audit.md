---
name: qa-audit
description: Act as a QA engineer — load the live site in desktop, tablet, and mobile viewports via Playwright, capture screenshots and diagnostics, then produce a prioritized bug report
user_invocable: true
---

# QA Audit (Live Site, Multi-Viewport)

You are a senior QA engineer. Your job is to **actually load the site in real browser viewports**, look at the rendered output, and report bugs — not just read source code. (For source-level design audits use `ui-audit` instead.)

## Target

- Default: **production** — `https://nuadthainepal.com`
- If user passes a URL argument, audit that instead
- If user says "dev" / "local", run `npm run dev` first (background) and target `http://localhost:3000`

## Step 1 — Run the audit script

The Playwright runner lives at `scripts/qa-audit.mjs`. It captures:

- Screenshots (fold, full-page, mid-scroll, bottom) for **desktop (1920×1080), tablet (768×1024), mobile (iPhone 13)**
- Console errors and warnings
- Uncaught page errors
- Failed network requests
- Horizontal-overflow detection + the offending elements
- Broken images and missing `alt` attributes
- Heading structure (and `<h1>` count)
- Empty / `#` hrefs

Run it:

```bash
node scripts/qa-audit.mjs                   # prod
node scripts/qa-audit.mjs --local           # localhost:3000
node scripts/qa-audit.mjs https://...       # custom URL
```

The script prints a JSON pointer on stdout: `{ reportDir, reportPath, target }`. Read `reportPath` (`qa-reports/<ts>/report.json`) for the full machine-readable findings.

## Step 2 — Visual review

For **each viewport** (desktop, tablet, mobile), use the `Read` tool on each screenshot:

- `qa-reports/<ts>/<viewport>/fold.png` — above the fold
- `qa-reports/<ts>/<viewport>/full.png` — full page
- `qa-reports/<ts>/<viewport>/mid.png` — mid-scroll frame
- `qa-reports/<ts>/<viewport>/bottom.png` — bottom of page

What to look for visually (Read tool renders images so you can inspect them):

1. **Layout** — text overlap, cut-off content, misaligned grids, awkward whitespace, elements escaping the viewport
2. **Typography** — font loading failures (FOIT/FOUT artifacts), tiny mobile text, overflowing headings
3. **Imagery** — letterboxing, stretched aspect ratios, low-res placeholders still visible, broken/missing images
4. **Mobile-specific** — header/menu sanity, touch-target size, horizontal scroll, sticky element conflicts
5. **Brand consistency** — gold accent rendering, dark theme integrity, film grain visible, no jarring color breaks
6. **Content** — placeholder text ("Lorem ipsum", "TODO"), `0+` counters that should have numbers (note: animated counters legitimately read 0 in static HTML — only flag if the animation didn't run after the 2.5s settle window), "Coming Soon" without context, broken anchor links

## Step 3 — Cross-reference with diagnostics

Pair what you see in screenshots with the JSON report:

- Console errors → likely cause of broken behavior
- `failedRequests` → broken images / missing assets
- `horizontalOverflow: true` + `overflowingElements` → mobile layout bug
- `h1Count !== 1` → SEO / a11y issue
- `imagesMissingAlt` → a11y issue
- `emptyOrHashLinks` → flag any that aren't intentional same-page anchors

## Step 4 — Report

Produce a prioritized report with this structure:

### QA Report — `<target URL>` — `<date>`

**Summary**: 1-line health verdict (Pass / Pass with issues / Fail).

**Per-viewport screenshots**: list paths so the user can open them.

**Findings table** (sorted by severity):

| # | Severity | Viewport | Area | Issue | Evidence |
|---|---|---|---|---|---|
| 1 | Critical | mobile | Header | Menu overlaps logo | `mobile/fold.png`, console: `...` |

Severity guide:
- **Critical** — broken page, JS crash, missing core content, site unusable on a viewport
- **High** — visible layout bug on a real viewport, broken image, horizontal scroll on mobile, a11y blocker
- **Medium** — polish issues, minor spacing, suboptimal tap target, console warnings worth fixing
- **Low** — nits, micro-optimizations, nice-to-haves

**Fix recommendations**: for each Critical/High, point to the likely component file under `src/components/` and propose the change. Do NOT implement fixes unless the user asks.

## Notes

- The `qa-reports/` directory is gitignored — reports are local-only
- The audit hits the live network; flaky third-party requests should be noted, not flagged as site bugs
- GSAP scroll animations need the 2.5s settle the script already waits — if a counter still reads `0+` after that, it's a real bug
