---
name: add-location
description: Add a new spa location to the locations section
user_invocable: true
---

# Add Location

Add a new Nuad Thai spa branch to the website.

## Context

- Locations live in `src/components/sections/LocationsSection.tsx`
- Two arrays: `locations` (main cards with images) and `beyondLocations` (smaller listed branches)
- Main location fields: name, area, phone, image, flagship (boolean), note, status ("open" | "coming-soon")
- Beyond location fields: name, label, phone

## Steps

1. Read `src/components/sections/LocationsSection.tsx` to see current locations
2. Ask the user for:
   - Location name (e.g., "Thamel")
   - Area (e.g., "Kathmandu")
   - Phone number
   - Whether it's a main location (with image card) or a "beyond" location (smaller listing)
   - If main: flagship status, note text, status (open/coming-soon), and image path
   - If beyond: label text (e.g., "Nuad Thai SPA")
3. Add the location to the correct array
4. If a main location, remind the user to add the location image to `/public/images/locations/`
5. Run `npm run build` to verify no errors
6. Show what was added
