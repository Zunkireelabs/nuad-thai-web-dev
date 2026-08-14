---
name: site-status
description: Check health of the production container and show deployment info
user_invocable: true
---

# Site Status

Check the health and status of the production deployment (single environment,
no staging/dev container).

## Steps

1. Check if the container is running:
   - `docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep naud-thai-web-prod`
2. Check container health, uptime, port mapping
3. Quick content verification: `docker exec naud-thai-web-prod ls /usr/share/nginx/html/index.html`
4. Check git status for any uncommitted changes
5. Show recent git log (last 5 commits) and recent GitHub Actions runs:
   `gh run list --repo Zunkireelabs/nuad-thai-web-dev --limit 5`
6. Present a summary:
   | Environment | Container | Status | Uptime | URL |
   |---|---|---|---|---|
   | Prod | naud-thai-web-prod | Running/Stopped | ... | https://nuadthainepal.com |
