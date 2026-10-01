# Metropola deployment demo

React + TypeScript hero matching `C:\Projects\metropola-prototype`: original logo, local Sarajevo aerial video, photographic fallback, overlay navigation, and responsive headline. Includes BS/EN switching, a mobile menu, video pause/play, and reduced-motion support.

This is a hero-only deployment test. Property, news, about, and explore links lead to the existing Metropola website homepage; contact opens email. No backend or listing pages are included.

Requires Node.js 22 or newer. Run `npm ci` and `npm run dev` for local development.

Static deployment settings:

- Install: `npm ci`
- Build: `npm run build`
- Output directory: `dist`

Run `npm run preview` to check the production build locally. No environment variables are required. Images and video are bundled locally; Google Fonts is optional with an Arial fallback.
