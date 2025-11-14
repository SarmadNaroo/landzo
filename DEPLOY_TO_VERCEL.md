# Deploy to Vercel - Quick Guide

## ✅ Pre-Deployment Checklist

Your app is now properly configured for Vercel! Here's what was fixed:

### Changes Made:
1. ✅ **Removed `outputDirectory`** from `vercel.json` - Now ALL requests go through Express
2. ✅ **Fixed path resolution** in `server.ts` - Uses absolute paths that work in serverless
3. ✅ **Created `api/index.ts`** - Wraps your Express app for Vercel
4. ✅ **Added `includeFiles`** - Ensures `dist/` folder is bundled with serverless function
5. ✅ **Tested locally** - Production build works perfectly!

### What Routes Work:
- ✅ **`/` (Home)** → SSR - Fully rendered HTML
- ✅ **`/states`** → SSR - Fully rendered HTML
- ✅ **`/register`** → CSR - Empty shell, client-side hydration
- ✅ **`/categories`** → CSR - Empty shell, client-side hydration

## 🚀 Deploy Now

### Option 1: Vercel CLI (Recommended - Fastest)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

That's it! Vercel will:
1. Run `npm run build` (builds client + SSR bundles)
2. Deploy your Express serverless function
3. Route all requests through `api/index.ts`
4. Your Express server handles SSR vs CSR logic

### Option 2: GitHub + Vercel Dashboard

```bash
# 1. Commit your changes
git add .
git commit -m "Configure Express SSR/CSR for Vercel deployment"
git push origin main

# 2. Go to Vercel Dashboard
# Visit: https://vercel.com/new

# 3. Import your repository
# - Click "Add New Project"
# - Import from GitHub
# - Select your repository

# 4. Deploy
# Vercel auto-detects settings from vercel.json
# Just click "Deploy"
```

## 🧪 After Deployment - Verify

Once deployed, Vercel will give you a URL like: `https://landzo.vercel.app`

### Test SSR Routes:
```bash
# These should return fully rendered HTML
curl https://your-app.vercel.app/ | grep '<div id="root">'
# Should show: <div id="root"><header>...full content...</div>

curl https://your-app.vercel.app/states | grep '<div id="root">'
# Should show: <div id="root"><header>...full content...</div>
```

### Test CSR Routes:
```bash
# These should return empty shell
curl https://your-app.vercel.app/register | grep '<div id="root">'
# Should show: <div id="root"><!--app-html--></div>

curl https://your-app.vercel.app/categories | grep '<div id="root">'
# Should show: <div id="root"><!--app-html--></div>
```

### Or Test in Browser:
1. Visit your deployed URL
2. Right-click → "View Page Source" (or Ctrl+U / Cmd+U)
3. Look at `<div id="root">`:
   - **SSR pages** (`/`, `/states`): Should have full HTML content
   - **CSR pages** (`/register`, `/categories`): Should have only `<!--app-html-->`

## 📊 How It Works on Vercel

```
User Request → Vercel Edge Network
                ↓
         vercel.json rewrites all to /api
                ↓
         api/index.ts (serverless function)
                ↓
         Imports src/server.ts createServer()
                ↓
         Express checks route in ssrRoutes array
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
SSR Route (/)          CSR Route (/register)
    ↓                       ↓
entry-server.tsx       Returns HTML shell
Renders full HTML      (<!--app-html-->)
    ↓                       ↓
Returns HTML           Client hydrates
```

## 🔍 Check Vercel Logs

If something goes wrong:

```bash
# View real-time logs
vercel logs --follow

# Or view logs for specific deployment
vercel logs <deployment-url>
```

Look for:
- `[Vercel] Creating Express app instance...` - App is starting
- `[Vercel] Express app created successfully` - App ready
- Any errors in SSR rendering

## 🐛 Troubleshooting

### Issue: Still seeing `<!--app-html-->` on `/`

**Check:**
1. Are you on the correct URL? (Not the old deployment)
2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
3. Check Vercel logs: `vercel logs --follow`
4. Ensure build succeeded in Vercel dashboard

**Fix:**
```bash
# Redeploy
vercel --prod --force
```

### Issue: "Module not found" error

**Cause:** dist/ folder not included in serverless function

**Fix:** Already configured in `vercel.json`:
```json
"functions": {
  "api/index.ts": {
    "includeFiles": "dist/**"
  }
}
```

If still failing, check Vercel build logs.

### Issue: 500 Internal Server Error

**Check logs:**
```bash
vercel logs --follow
```

Common causes:
- Path resolution issue
- Missing dependencies
- SSR rendering error

**Debug:**
Add more logging in `api/index.ts` (already added):
```typescript
console.log('[Vercel] Creating Express app instance...');
console.log('[Vercel] Express app created successfully');
```

## 🎯 Environment Variables (If Needed)

If you add environment variables later:

```bash
# Add via CLI
vercel env add VARIABLE_NAME production

# Or via Dashboard:
# Project Settings → Environment Variables
```

## 📈 Performance Monitoring

Your setup includes:
- ✅ Template caching (templateHtml cached on load)
- ✅ App instance caching (Express app created once)
- ✅ Compression middleware (gzip)
- ✅ Static file serving with cache headers (sirv)
- ✅ Serverless function with 1024MB memory

Expected performance:
- **Cold start**: ~500ms-1s (first request after idle)
- **Warm start**: ~50-200ms (subsequent requests)
- **SSR render**: ~10-50ms

## 🔄 Continuous Deployment

Connect GitHub to Vercel for automatic deployments:

1. **Every push to `main`** → Production deployment
2. **Every pull request** → Preview deployment
3. **Automatic rollbacks** on build failures

Configure in Vercel Dashboard:
- Project Settings → Git → Production Branch

## 🎉 You're Done!

Your Express SSR/CSR app is now Vercel-ready!

**Just run:**
```bash
vercel --prod
```

And your app will be live with:
- ✅ `/` - Server-side rendered (SEO-friendly, fast)
- ✅ `/states` - Server-side rendered
- ✅ `/register` - Client-side rendered (interactive)
- ✅ `/categories` - Client-side rendered
- ✅ Same code running locally and on Vercel
- ✅ Production-grade performance

---

## 📝 Quick Commands Reference

```bash
# Local development
npm run dev:server

# Build for production
npm run build

# Test production locally
npm run serve

# Deploy to Vercel
vercel --prod

# View logs
vercel logs --follow

# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

---

**Need help?** Check Vercel logs first: `vercel logs --follow`
