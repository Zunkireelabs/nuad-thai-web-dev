# CLAUDE.md - Nuad Thai Web Project Intelligence

## Project Overview

**Project**: Nuad Thai Spa & Wellness Website
**Client**: Nuad Thai (Thai massage spa chain)
**Type**: Premium Immersive Spa Website
**Reference**: https://www.resortkaskady.com/ (design style)
**Existing Site**: https://www.nuadthainepal.com/ (content/branding source)

## URLs

- **Production**: https://nuadthainepal.com

## Tech Stack

- Next.js 14 (Static Export)
- TypeScript (strict mode)
- Tailwind CSS v4
- GSAP + ScrollTrigger (FREE tier only)
- Lenis (smooth scroll)
- Framer Motion (UI animations)
- Nginx Alpine (Docker)
- Traefik (Auto SSL)

## Design System

### Colors
- Background: `#0A0A0A` (primary), `#111111` (secondary)
- Gold: `#C9A96E` (primary accent), `#D4BA85` (light), `#A8894E` (dark)
- Text: `#E7E3DE` (primary), `#A09B93` (secondary), `#6B6560` (muted)

### Typography
- Headings: Cormorant Garamond (serif, elegant)
- Body: Inter (sans-serif, clean)

### Visual Style
- Dark luxury aesthetic
- Gold accents throughout
- Film grain overlay
- Parallax depth effects
- Letter-by-letter text reveals
- 3D card tilt on hover (CSS perspective)
- Smooth scroll (Lenis)

## Commands

```bash
npm run dev      # Local dev server
npm run build    # Build static export
npm run lint     # ESLint
```

Deploys are automated via GitHub Actions: push to `main` (via PR — branch
protected) builds and deploys to production automatically. No manual deploy
script; see `.github/workflows/deploy.yml` and `.claude/skills/deploy-prod.md`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Design tokens, animations, utilities
├── components/
│   ├── animations/
│   │   ├── TextReveal.tsx      # Letter-by-letter heading animation
│   │   ├── ParallaxImage.tsx   # Parallax image wrapper
│   │   └── ScrollReveal.tsx    # Scroll-triggered fade-in
│   ├── layout/
│   │   ├── Header.tsx          # Navigation + mobile menu
│   │   ├── Footer.tsx          # Footer links
│   │   └── SmoothScroll.tsx    # Lenis wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx     # Full-screen hero + parallax
│   │   ├── MarqueeStrip.tsx    # Scrolling text strip
│   │   ├── AboutSection.tsx    # Brand story
│   │   ├── ServicesSection.tsx # Treatment cards (placeholder)
│   │   ├── GallerySection.tsx  # Image gallery grid
│   │   ├── ExperienceSection.tsx # Stats + values
│   │   ├── LocationsSection.tsx  # Nepal/UK locations
│   │   └── CTASection.tsx      # Booking CTA
│   └── ui/
│       ├── AudioToggle.tsx     # Background music control
│       └── LoadingScreen.tsx   # Initial loading animation
├── hooks/
├── lib/
│   └── utils.ts            # cn() utility
└── types/
```

## Assets Needed

- `/public/audio/ambient.mp3` — Ambient nature/spa sounds (looping)
- `/public/images/hero/hero-bg.jpg` — Hero background
- `/public/images/hero/cta-bg.jpg` — CTA section background
- `/public/images/about-spa.jpg` — About section image
- `/public/images/services/*.jpg` — Service card images
- `/public/images/gallery/*.jpg` — Gallery images
- Logo assets from nuadthainepal.com

## Key Features

- Background ambient music with fade-in/out toggle
- Film grain overlay for cinematic feel
- GSAP-powered scroll animations
- 3D perspective card effects on hover
- Animated number counters
- Responsive mobile menu with staggered transitions
- Marquee text strip
- Parallax image sections

## Constraints

- GSAP FREE tier only
- No WebGL/Three.js (CSS/GSAP for all 3D effects)
- Static export (no server-side rendering)
- Images gracefully fall back to gradients if missing
