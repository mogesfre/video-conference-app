# 🔥 Firebase Deployment Guide

## ⚠️ Important Note

**Firebase is NOT recommended for this video conferencing app** because:
- Firebase Functions/Cloud Run don't support persistent WebSocket connections (needed for Socket.io)
- Your app requires a real-time signaling server that stays connected
- Firebase Hosting is great for the frontend, but you'll need a separate backend

## ✅ Recommended: Use Render Instead

See `DEPLOYMENT-GUIDE.md` for the **Render deployment guide** (fully free, supports WebSockets).

---

## 🔥 Firebase Hosting (Frontend Only)

If you still want to use Firebase Hosting for the frontend, here's how:

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase
```bash
cd client-nextjs
firebase init hosting
```

Select:
- Use an existing project or create a new one
- Public directory: `out` (for static export)
- Configure as single-page app: Yes
- Set up automatic builds: No (for now)

### Step 4: Configure Next.js for Static Export

Update `client-nextjs/next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Set your backend server URL
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://your-backend.onrender.com'
  }
}
```

**Note:** Static export means you'll lose some Next.js features like API routes.

### Step 5: Build and Deploy
```bash
cd client-nextjs
npm run build
firebase deploy --only hosting
```

### Step 6: Configure Environment Variables

In Firebase Console:
1. Go to your project settings
2. Add environment variable for your backend URL
3. Update `next.config.js` to use it

---

## 🚀 Alternative: Firebase + Separate Backend

You can use Firebase Hosting for frontend + Render/Railway for backend:

1. **Backend**: Deploy to Render (free, WebSocket support)
2. **Frontend**: Deploy to Firebase Hosting (free, fast CDN)
3. **Configure**: Set `NEXT_PUBLIC_SERVER_URL` to your Render backend URL

---

## 📊 Comparison

| Feature | Firebase | Render (Recommended) |
|---------|----------|----------------------|
| Frontend Hosting | ✅ Excellent | ✅ Good |
| WebSocket Support | ❌ Limited | ✅ Full Support |
| Backend Hosting | ❌ Not suitable | ✅ Perfect |
| Free Tier | ✅ Yes | ✅ Yes |
| Setup Difficulty | Medium | Easy |

---

## 💡 Recommendation

**Use Render** for both frontend and backend:
- Single platform
- WebSocket support out of the box
- Free tier available
- Easy deployment via GitHub
- See `DEPLOYMENT-GUIDE.md` for full instructions

