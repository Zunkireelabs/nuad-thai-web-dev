---
name: update-price
description: Find and update pricing for a service or treatment
user_invocable: true
---

# Update Price

Find a service by name and update its pricing.

## Context

- All service pricing lives in `src/components/sections/ServicesSection.tsx` in the `categories` array
- Prices are stored as strings (e.g., "Rs. 4,500 / 6,100 / 7,500")
- Some prices have multiple tiers separated by " / " for different durations

## Steps

1. Ask the user which service to update and the new price (if not already provided)
2. Read `src/components/sections/ServicesSection.tsx`
3. Search for the service name in the categories data
4. If multiple matches found, ask the user to clarify which one
5. Show the user the current price and the proposed new price
6. After confirmation, update the price using the Edit tool
7. Run `npm run build` to verify no errors
8. Show what was changed (old price -> new price)
