---
name: deploy-dev
description: Build and deploy the site to the dev environment (dev-naud.zunkireelabs.com)
user_invocable: true
---

# Deploy to Dev

Deploy the Nuad Thai website to the development environment.

## Steps

1. Run `npm run build` and verify it succeeds with no errors
2. Check that the `out/` directory was created
3. Run `./deploy.sh dev` to build the Docker image and restart the dev container
4. After deployment, verify the container `naud-thai-web-dev` is running with `docker ps | grep naud-thai-web-dev`
5. Report the deployment status and URL: https://dev-naud.zunkireelabs.com
