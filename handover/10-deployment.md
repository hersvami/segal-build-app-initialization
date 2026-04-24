# 10 — Deployment
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Always run `npm run build` and verify it passes BEFORE deploying.

---

## Build & Deploy

```bash
npm install
npm run build
firebase deploy --only hosting
```

**Live URL:** https://segal-build-app.web.app

---

## Firebase Configuration

`firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [{
      "source": "**",
      "headers": [{ "key": "Cache-Control", "value": "no-store, no-cache, must-revalidate" }]
    }],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

`.firebaserc`:
```json
{ "projects": { "default": "segal-build-app" } }
```

---

## Environment Variables (.env)

```bash
# Optional — AI features (free tier only)
VITE_GEMINI_API_KEY=your_gemini_key

# Optional — Photo uploads (base64 fallback if not set)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

---

## Build Output

- Single-file `dist/index.html` via `vite-plugin-singlefile`
- All JS and CSS inlined — no external assets required
- Current size: ~385 kB (gzip: ~110 kB)

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Build fails with import error | Check file exists + export name matches |
| Cache shows old version | Hard refresh Ctrl+F5 |
| Firebase deploy fails | Run `firebase login` first |
| AI not working | Check Gemini key, or use without (keyword fallback) |
| Photos not uploading | Cloudinary env vars not set — falls back to base64 |

---

## Console Links
- Firebase: https://console.firebase.google.com/project/segal-build-app
- Gemini API Key: https://aistudio.google.com/apikey
- Cloudinary: https://cloudinary.com/console
- GitHub: https://github.com/hersvami/phase-2-rollout-execution
