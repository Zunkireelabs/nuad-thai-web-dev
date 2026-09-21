# Stage 1: Build the static Next.js export
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.mjs tsconfig.json postcss.config.mjs eslint.config.mjs ./
COPY src/ src/
COPY public/ public/

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/static.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
