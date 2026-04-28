---
name: deploy-prod
description: Build and deploy the site to production (naud-web.zunkireelabs.com) with verification
user_invocable: true
---

# Deploy to Production

Deploy the Nuad Thai website to the production environment. This is a high-impact action.

## Steps

1. Run `npm run build` and verify it succeeds with no errors
2. Check that the `out/` directory was created
3. **Ask the user for final confirmation before proceeding** — remind them this is production
4. Run `echo "y" | ./deploy.sh prod` to build the Docker image and restart the prod container
5. After deployment, verify the container `naud-thai-web-prod` is running with `docker ps | grep naud-thai-web-prod`
6. Spot-check a key piece of content inside the prod container to confirm the latest build is served: `docker exec naud-thai-web-prod sh -c 'grep -rl "<a known string from recent changes>" /usr/share/nginx/html/_next/static/chunks/ | wc -l'`
7. Report the deployment status and URL: https://naud-web.zunkireelabs.com
