---
name: ui-audit
description: Full UI/UX design audit — checks padding, margins, spacing, typography, colors, responsiveness, and design consistency across all sections
user_invocable: true
---

# UI/UX Design Audit

Act as a senior UI/UX designer reviewing the Nuad Thai website for design consistency, polish, and visual harmony. Audit every section against the design system.

## Design System Reference

Before auditing, read `src/app/globals.css` for design tokens and utility classes. The design system is:

- **Colors**: Background `#0A0A0A` (primary), `#111111` (secondary). Gold `#C9A96E` (accent), `#D4BA85` (light gold), `#A8894E` (dark gold). Text `#E7E3DE` (primary), `#A09B93` (secondary), `#6B6560` (muted)
- **Typography**: Headings use `Cormorant Garamond` (serif). Body uses `Inter` (sans-serif)
- **Spacing rhythm**: Sections should follow a consistent vertical rhythm
- **Dark luxury aesthetic**: Film grain overlay, gold accents, generous whitespace

## Audit Checklist

For EVERY component/section file in `src/components/`, check:

### 1. Typography
- [ ] Headings use `font-heading` / Cormorant Garamond — never Inter
- [ ] Body text uses Inter — never Cormorant for paragraphs
- [ ] Font size hierarchy is consistent (h1 > h2 > h3 > body)
- [ ] `letter-spacing` on uppercase labels is `0.2em`+ (tracking-widest or custom)
- [ ] `letter-spacing` on headings is tight (`-0.02em` to `-0.01em`)
- [ ] Line heights: headings `leading-[1]` to `leading-tight`, body `leading-relaxed`
- [ ] No font-size jumps that break hierarchy (e.g., a subtitle bigger than its heading)

### 2. Spacing & Layout
- [ ] Section padding is consistent: `py-20 md:py-32` or similar pattern across all sections
- [ ] Container max-width is consistent: `max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12`
- [ ] Vertical spacing between elements within sections follows a rhythm (mb-4, mb-6, mb-8, mb-12, mb-16)
- [ ] No double-spacing (two consecutive large margins creating awkward gaps)
- [ ] Gap between section label/eyebrow and heading is consistent
- [ ] Gap between heading and body text is consistent
- [ ] Card padding is uniform within the same section

### 3. Colors & Contrast
- [ ] Gold accent uses correct token: `#C9A96E` for primary, `#D4BA85` for hover/light, `#A8894E` for dark
- [ ] No hardcoded colors that should be tokens (e.g., random `text-yellow-500` instead of gold)
- [ ] Text contrast ratios meet WCAG AA: primary text on dark bg, muted text still readable
- [ ] Gradient overlays on images are consistent (similar opacity levels)
- [ ] Background colors transition smoothly between sections (bridge divs)
- [ ] No section has a jarring color break

### 4. Responsive Design
- [ ] All sections are readable on mobile (320px+)
- [ ] Font sizes scale properly: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` pattern
- [ ] Grid layouts collapse properly (e.g., 3 cols -> 2 cols -> 1 col)
- [ ] Padding reduces on mobile (px-6 not px-12)
- [ ] No horizontal overflow on any viewport
- [ ] Touch targets are at least 44px on mobile
- [ ] Images have proper aspect ratios and don't stretch

### 5. Animations & Interactions
- [ ] Hover states exist on all interactive elements
- [ ] Gold accent appears on hover for links/buttons
- [ ] GSAP ScrollTrigger `start` values are consistent for similar reveal patterns
- [ ] Animation durations are consistent (0.6-0.8s for reveals, 0.3s for hovers)
- [ ] No janky or overlapping animations
- [ ] 3D tilt effects have consistent perspective values

### 6. Component Consistency
- [ ] All eyebrow/label text follows the same pattern: small caps, tracking-widest, gold color, with decorative lines
- [ ] CTAs/buttons have consistent styling (padding, border, hover effect)
- [ ] Decorative dividers (ornaments, lines) are consistent in style
- [ ] Cards within the same section have identical structure and spacing
- [ ] Image treatments (overlays, borders, rounded corners) are consistent

### 7. Micro-details
- [ ] No orphaned words (single word on last line of a paragraph) where preventable
- [ ] Consistent use of em-dash vs hyphen
- [ ] Price formatting is uniform ("Rs. X,XXX" everywhere)
- [ ] Phone number formatting is consistent
- [ ] No placeholder text left in (Lorem ipsum, TODO, etc.)

## Process

1. Read `src/app/globals.css` for design tokens
2. Read `src/app/layout.tsx` for font setup
3. Read EACH section component file in `src/components/sections/`
4. Read EACH UI component in `src/components/ui/`
5. Read layout components in `src/components/layout/`
6. For each file, check against ALL items in the audit checklist above
7. Compile findings into a report:

### Report Format

**Section: [SectionName]**
| Issue | Severity | Current | Recommended | Line |
|---|---|---|---|---|
| Description | High/Medium/Low | What it is now | What it should be | file:line |

Severity guide:
- **High**: Visible inconsistency, broken layout, wrong font family, accessibility fail
- **Medium**: Spacing mismatch, minor color inconsistency, animation timing off
- **Low**: Polish items, micro-optimizations, nice-to-haves

8. After the report, offer to fix all High and Medium issues automatically
