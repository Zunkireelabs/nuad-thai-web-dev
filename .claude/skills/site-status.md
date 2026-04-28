---
name: site-status
description: Check health of dev and prod containers and show deployment info
user_invocable: true
---

# Site Status

Check the health and status of both dev and production deployments.

## Steps

1. Check if containers are running:
   - `docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep naud-thai`
2. For each running container, check:
   - Uptime
   - Port mappings
   - Quick content verification: `docker exec <container> ls /usr/share/nginx/html/index.html`
3. Check git status for any uncommitted changes
4. Show recent git log (last 5 commits) for deploy history context
5. Present a summary table:
   | Environment | Container | Status | Uptime | URL |
   |---|---|---|---|---|
   | Dev | naud-thai-web-dev | Running/Stopped | ... | https://dev-naud.zunkireelabs.com |
   | Prod | naud-thai-web-prod | Running/Stopped | ... | https://naud-web.zunkireelabs.com |
