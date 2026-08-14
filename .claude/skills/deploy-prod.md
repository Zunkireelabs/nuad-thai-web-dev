---
name: deploy-prod
description: Deploy the site to production (nuadthainepal.com) via GitHub Actions, with verification
user_invocable: true
---

# Deploy to Production

Deploys are automated: pushing to `main` triggers `.github/workflows/deploy.yml`,
which builds the Docker image on the VPS and restarts `naud-thai-web-prod`.
`main` is branch-protected — changes land via PR, not direct push.

## Steps

1. Confirm the target branch is `main` and it's up to date: `git fetch origin && git log origin/main -1`
2. If deploying from a feature branch, open a PR into `main`, wait for the `CI` check to pass, then merge
   (merging is what actually deploys — `deploy.yml` triggers on push to `main`)
3. **Ask the user for final confirmation before merging** — remind them this ships to production
4. After merge, watch the "Deploy to Production" run: `gh run watch --repo Zunkireelabs/nuad-thai-web-dev`
5. Verify the site responds: `curl -I https://nuadthainepal.com` → expect `HTTP/2 200`
6. Report the deployment status and URL: https://nuadthainepal.com

If the deploy fails or needs to be undone, use the `Rollback` workflow
(`.github/workflows/rollback.yml`, `workflow_dispatch` with a target commit SHA)
rather than pushing a revert commit under time pressure.
