---
name: add-service
description: Add a new treatment or service to the services page
user_invocable: true
---

# Add Service

Add a new treatment or service to the Nuad Thai services menu.

## Context

- All services live in `src/components/sections/ServicesSection.tsx`
- Services are organized in a `categories` array of `ServiceCategory` objects
- Each category has: id, title, subtitle (optional), note (optional), image, items, extras (optional)
- Each item has: name, duration (optional), price, description (optional)
- Extras are shown separately below the main items (e.g., add-ons, threading under waxing)

## Steps

1. Read `src/components/sections/ServicesSection.tsx` to understand the current categories and data structure
2. Ask the user for:
   - Which existing category this belongs to, OR if it's a new category
   - Service name
   - Duration (if applicable)
   - Price (in Rs. format, e.g., "Rs. 4,500")
   - Description (optional, one sentence)
   - Whether it's a main item or an extra/add-on
3. If it's a new category, also ask for: category title, subtitle, and which image to use
4. Add the service to the correct position in the data array
5. Run `npm run build` to verify no errors
6. Show the user what was added and where
