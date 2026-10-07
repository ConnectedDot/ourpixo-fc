# OurPixo Faith City Gallery — V2 Revamp

A responsive React + Vite gallery backed directly by Google Drive. This revamp keeps the existing Drive API architecture while turning folder navigation into a shareable, mobile-first gallery experience.

## What changed

- Shareable deep links for every nested folder. The full folder trail is encoded in the URL and restored on refresh; browser Back/Forward works naturally.
- Gallery-aware photo sharing. Shared photo URLs open inside the gallery context instead of linking only to a raw Drive image.
- Redesigned Redeem/Faith City palette using Deep Twilight through Light Cyan.
- Mobile bottom navigation plus Search, Albums and More bottom sheets.
- First-visit spotlight tour with Next, Back, Skip and replay support.
- Rebuilt lightbox media stage to eliminate horizontal layout shift while a new image loads.
- Swipe navigation on touch devices and keyboard navigation on desktop.
- Animated album cards, masonry reveals, shimmer loading, glass surfaces and reduced-motion accessibility support.
- Multi-page Drive loading so albums can exceed the Drive API's 1,000-item page limit (guarded at 20 pages / 20,000 images per navigation).
- Longer edge/browser caching for thumbnails and full-image proxy responses.

## Environment

Copy `config/.env.example` values into your deployment environment. The existing serverless endpoints require `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `DRIVE_ROOT_FOLDER_ID`.

## Run

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
```

## Deployment note

The folder deep links use query-state (`?path=...`) rather than server-side pathname routes, so they work on both Vercel and Netlify without additional SPA rewrite rules. Keep the `/api/drive/*` functions deployed on a runtime that supports the existing Google APIs and Sharp dependencies.

## Local Google Drive authentication

If local development returns `ERR_OSSL_UNSUPPORTED` / `DECODER routines::unsupported`, the service-account private key is being read as an invalid PEM value. V2.1 accepts any of these configurations:

```env
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
DRIVE_ROOT_FOLDER_ID=...
```

Or set `GOOGLE_PRIVATE_KEY_BASE64` to the base64 value of the complete PEM file. You can also provide the complete service-account JSON through `GOOGLE_SERVICE_ACCOUNT_JSON`.

Do not manually remove the `BEGIN/END PRIVATE KEY` lines. If `.env.local` contains the key, restart the Vite/Vercel development server after changing it.

## V3 visual/search pass
- Editorial photographic home experience: image-led hero, stronger typography, layered archive card and restrained Faith City cyan accent.
- Dimensional collection cards inspired by V1: stacked sheets, folder geometry, elevation and spring interactions.
- Search is now a real unified current-view search: it filters both photo filenames and folder/album names, shows match counts, has Clear state, works from desktop and mobile bottom sheet, and supports Cmd/Ctrl+K.
- Existing deep-linked folders, Drive API, share links, stable lightbox, dark/light mode, tour and mobile bottom navigation remain intact.

Search intentionally operates on the currently loaded Drive level rather than recursively downloading the entire archive. This keeps large Google Drive libraries responsive and predictable.
