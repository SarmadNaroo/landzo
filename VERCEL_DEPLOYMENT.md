# Vercel Deployment Guide

This guide explains how to deploy your React SSR/CSR application to Vercel.

## 🎯 Architecture Overview

### Local Development (Express Server)
- **Server**: `src/server.ts` - Express server handles all requests
- **SSR Routes**: `/`, `/states` - Server-side rendered
- **CSR Routes**: `/register`, `/categories` - Client-side rendered
- **Command**: `npm run dev:server`

### Vercel Production (Serverless)
- **Static Files**: `dist/client/` - Served directly by Vercel CDN
- **SSR Function**: `api/ssr.ts` - Serverless function for SSR routes
- **SSR Routes**: `/`, `/states` - Handled by serverless function
- **CSR Routes**: `/register`, `/categories` - Served as static HTML shell

## 📁 Project Structure for Vercel

```
landzo/
├── api/
│   └── ssr.ts              # Vercel serverless function (SSR handler)
├── src/
│   ├── api/
│   │   └── ssr.ts          # Original SSR handler (not used by Vercel)
│   ├── entry-client.tsx    # Client entry with Redux Provider
│   ├── entry-server.tsx    # SSR render function
│   ├── server.ts           # Express server (local dev only)
│   └── App.tsx
├── dist/
│   ├── client/             # Built static files (Vercel serves these)
│   │   ├── index.html
│   │   └── assets/
│   └── server/             # Built SSR bundle
│       └── entry-server.js # Imported by api/ssr.ts
├── vercel.json             # Vercel configuration
└── package.json
```

## 🔧 Configuration Files

### vercel.json
Routes are configured to:
1. Serve static assets directly
2. SSR routes (`/`, `/states`) → `api/ssr.ts` serverless function
3. All other routes → `index.html` (CSR)

### package.json Scripts
- `build`: Builds both client and SSR bundles
- `build:client`: Builds static files to `dist/client`
- `build:ssr`: Builds SSR bundle to `dist/server`

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # First deployment
   vercel

   # Follow prompts:
   # - Set up and deploy? Yes
   # - Which scope? (select your account)
   # - Link to existing project? No
   # - Project name? landzo (or your choice)
   # - Directory? ./ (current directory)
   # - Override settings? No
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Setup SSR/CSR for Vercel"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`
   - Click "Deploy"

3. **Configure Environment** (if needed):
   - Go to Project Settings → Environment Variables
   - Add any required environment variables

## ✅ Verify Deployment

After deployment, test your routes:

### SSR Routes (Should show rendered HTML in source):
- `https://your-app.vercel.app/` - Home page
- `https://your-app.vercel.app/states` - States page

**How to verify SSR:**
- Right-click → "View Page Source"
- You should see full HTML content inside `<div id="root">`

### CSR Routes (Should show empty shell in source):
- `https://your-app.vercel.app/register` - Registration page
- `https://your-app.vercel.app/categories` - Categories page

**How to verify CSR:**
- Right-click → "View Page Source"
- You should see only `<div id="root"><!--app-html--></div>`
- Content appears after JavaScript loads

## 🔍 Debugging

### Check Vercel Logs
```bash
vercel logs your-deployment-url
```

### Common Issues

**1. SSR Function Error: "Cannot find module"**
- Solution: Make sure `npm run build` runs successfully before deployment
- Check that `dist/server/entry-server.js` exists

**2. Static Assets Not Loading**
- Solution: Verify `dist/client/assets/` contains built files
- Check network tab for 404s

**3. Redux Error on SSR Routes**
- Solution: Ensure `entry-server.tsx` creates a fresh store instance
- Check that `Provider` wrapper is in both entry files

**4. Route Not Working**
- Solution: Check `vercel.json` rewrites configuration
- Ensure route patterns match your needs

## 🛠️ Development Workflow

1. **Local Development**:
   ```bash
   npm run dev:server
   # Visit http://localhost:5173
   ```

2. **Test Production Build Locally**:
   ```bash
   npm run build
   npm run serve
   # Visit http://localhost:5173
   ```

3. **Deploy to Vercel Preview**:
   ```bash
   vercel
   ```

4. **Deploy to Vercel Production**:
   ```bash
   vercel --prod
   ```

## 📊 Performance Optimization

The setup includes:
- ✅ Gzip compression for assets
- ✅ Cache headers for static files (1 year)
- ✅ Cache headers for SSR responses (1 hour)
- ✅ Template caching in serverless function
- ✅ Code splitting with Vite
- ✅ CSS code splitting

## 🔄 Continuous Deployment

Connect your GitHub repository to Vercel for automatic deployments:

1. Every push to `main` → Production deployment
2. Every pull request → Preview deployment
3. Automatic rollbacks if deployment fails

## 📝 Environment Variables

If you need environment variables:

1. **Local Development**:
   Create `.env.local`:
   ```bash
   VITE_API_URL=https://api.example.com
   ```

2. **Vercel Production**:
   ```bash
   vercel env add VITE_API_URL production
   # Enter value when prompted
   ```

## 🎉 You're Ready!

Your SSR/CSR setup is configured and ready to deploy to Vercel!

Run:
```bash
vercel --prod
```

And watch your app go live! 🚀
