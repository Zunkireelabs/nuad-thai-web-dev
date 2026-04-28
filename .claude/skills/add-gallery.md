---
name: add-gallery
description: Add new images to the gallery section
user_invocable: true
---

# Add Gallery Images

Add new images to the Nuad Thai gallery section.

## Context

- Gallery component is at `src/components/sections/GallerySection.tsx`
- Gallery images are stored in `/public/images/gallery/`
- Look for the images/gallery data array in the component

## Steps

1. Read `src/components/sections/GallerySection.tsx` to understand the data structure
2. Check what images currently exist: `ls /public/images/gallery/`
3. Ask the user for:
   - Image file path(s) or confirm images are already in `/public/images/gallery/`
   - Caption or alt text for each image
   - Any category/tag if the gallery supports filtering
4. Add the image entries to the gallery data array
5. Run `npm run build` to verify no errors
6. Show what was added and remind user to verify images render correctly
