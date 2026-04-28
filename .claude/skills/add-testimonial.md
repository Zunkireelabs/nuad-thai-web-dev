---
name: add-testimonial
description: Add a new customer testimonial or review
user_invocable: true
---

# Add Testimonial

Add a new customer testimonial to the Nuad Thai website.

## Context

- Testimonials live in `src/components/sections/TestimonialsSection.tsx`
- Look for the testimonials data array in the file

## Steps

1. Read `src/components/sections/TestimonialsSection.tsx` to understand the data structure
2. Ask the user for:
   - Customer name
   - Review text / quote
   - Rating (if applicable)
   - Service they experienced (if applicable)
   - Any other fields the data structure requires
3. Add the testimonial to the array
4. Run `npm run build` to verify no errors
5. Show what was added
