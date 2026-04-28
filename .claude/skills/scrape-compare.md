---
name: scrape-compare
description: Scrape nuadthainepal.com and compare content with our site for gaps
user_invocable: true
---

# Scrape & Compare

Scrape the original Nuad Thai Nepal website and compare all content against our site.

## Steps

1. Use WebFetch to scrape these pages from https://www.nuadthainepal.com/:
   - Homepage (`/`)
   - About (`/about-us/`)
   - Treatments (`/treatments/`)
   - All treatment subpages: `/traditional-healing-treatment-thai-stretching-massage/`, `/signature-treatment/`, `/pregnancy-treatments/`, `/nail-care/`, `/facial/`, `/waxing-services/`, `/body-scrub/`, `/womens-saloon/`, `/nuad-thai-mens-saloon/`
   - Packages (`/packages/`) and VIP package subpages
   - Policies (`/policies/`)
   - Contact (`/contact/`)
   Extract all service names, prices, descriptions, and content.

2. Read our site's key files:
   - `src/components/sections/ServicesSection.tsx` (all services & pricing)
   - `src/components/sections/AboutSection.tsx` (brand story)
   - `src/components/sections/LocationsSection.tsx` (locations)
   - `src/components/sections/SpaEtiquette.tsx` (policies)
   - `src/components/sections/TestimonialsSection.tsx`

3. Compare and produce a detailed report:
   - Services/treatments: missing items, price mismatches
   - Content: missing text, outdated copy
   - Locations: new branches not on our site
   - Any new pages or sections on their site

4. Present findings as a table with: Item | Their Site | Our Site | Status (Match/Mismatch/Missing)
