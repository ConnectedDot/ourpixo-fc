
# Imagely — Church Gallery

A clean, OurPixo-inspired gallery viewer built with **React + Vite + Tailwind**, sourcing images dynamically from **Google Drive folders** via a Vercel Serverless API.

## Features
- Responsive, aesthetic gallery grid + polished lightbox
- Browse by Google Drive subfolders (sidebar + breadcrumbs)
- Share (Web Share API) & direct Download
- Lazy grid, eager lightbox with neighbor preloading
- PWA manifest (add to Home Screen)

## Getting Started

### 1) Install
```bash
npm i
```

### 2) Configure environment
Create a `.env.local` in project root with:
```
DRIVE_ROOT_FOLDER_ID=YOUR_FOLDER_ID
GOOGLE_CLIENT_EMAIL=service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----
"
DRIVE_CACHE_TTL=300
```
> Share your Google Drive **root folder** with the Service Account as **Viewer**.

### 3) Run locally
```bash
npm run dev
```
Open the shown localhost URL.

### 4) Deploy to Vercel
- Push to GitHub
- Import project on Vercel
- Add the same env vars in **Settings → Environment Variables**
- Deploy

## Notes
- Drive thumbnails can be small; the lightbox uses the view URL for crisp images.
- If you need resizing/CDN later, add a Vercel image proxy (Sharp) or Cloudinary remote fetch.
- Accessibility: keyboard navigation and focusable controls included.

## License
MIT
