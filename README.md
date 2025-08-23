# BacheLORE

A clean React + Vite frontend scaffold for the BacheLORE project (JSX). Designed as a single-page app prototype with Bootstrap 5 and a small, opinionated global stylesheet.

## What this repo contains

- React + Vite app (JSX)
- Client-side routing with `react-router-dom`
- Global CSS in `src/assets/global.css` (theme variables, layout, auth card styles)
- Pages: Home, Login, Signup and a small set of placeholder routes
- Components: `Navbar`, `Footer` and several presentational pieces
- UI: Bootstrap 5 (CSS + JS), Google Fonts, Bootstrap Icons

## Quick start (Windows / PowerShell)

Prerequisites: Node.js 16+ and npm.

1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview the production build locally

```powershell
npm run preview
```

Notes:

- The Bootstrap collapse (mobile navbar toggler) requires the Bootstrap JS bundle to be imported in the app entry (`src/main.jsx`). If the navbar toggler doesn't open, check that `bootstrap/dist/js/bootstrap.bundle.min.js` is imported.

## Project structure (important files)

- `index.html` — app shell
- `src/main.jsx` — app entry (imports global CSS, bootstrap)
- `src/routes/router.jsx` — route definitions
- `src/pages/` — page components (Home, Login, Signup)
- `src/components/` — shared UI components (Navbar, Footer, etc.)
- `src/assets/global.css` — single global stylesheet for theme and layout
- `src/assets/brand.js` — small brand constants used by components

## Implemented features

- Hero, feature cards and a newsletter form on the Home page (client-side validation + mock submit)
- Static testimonials block (previous complex carousel removed by design)
- Auth pages (Login / Signup) with a centered card (`.auth-card`) and theme styles
- Sticky footer implemented via flexbox (`main { flex: 1 }` / `.app-root main { flex: 1 }` fallback)
- Reusable theme variables (colors, radii) in `global.css`

## Development notes & tips

- CSS: The visual styles are centralized in `src/assets/global.css`. If you change the `.auth-card` visuals, look for the `::before` pseudo-element (older versions used a left accent stripe).
- Run `npm run dev` while working and open the browser to the dev server Vite reports.
- There are no backend APIs wired in this repo — newsletter and auth forms use client-side mock handlers. If you add a backend, consider adding an `.env` file and updating fetch endpoints.

## Contributing

- Create a branch for your work (feature/bugfix), keep commits focused and open a pull request against `main` when ready.
- Keep UI changes scoped to `src/assets/global.css` where possible.

## Known gaps / TODO

- No centralized state store (Zustand) or mock server implemented yet.
- Extra pages (dashboard, item-detail) are placeholders and need real implementations.

## License & contact

This repository is intended as a project scaffold. Add a license file (`LICENSE`) if you plan to open-source this.

---

If you'd like, I can:

- Add a minimal `CONTRIBUTING.md` and `ISSUE_TEMPLATE.md`.
- Generate a small checklist of remaining UI pages and wire a mock API.
- Re-run the app and confirm the navbar toggler behaviour in your environment.
