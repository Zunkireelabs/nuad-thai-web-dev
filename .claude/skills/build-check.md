---
name: build-check
description: Run build and lint checks to verify site has no errors
user_invocable: true
---

# Build Check

Run a full build and lint check on the Nuad Thai website.

## Steps

1. Run `npm run lint` and report any linting errors or warnings
2. Run `npm run build` and verify:
   - Compilation succeeds
   - Static pages generate successfully
   - No TypeScript errors
   - Output `out/` directory is created
3. Report the build summary:
   - Route sizes
   - Any warnings
   - Pass/fail status
4. If there are errors, analyze them and suggest fixes
