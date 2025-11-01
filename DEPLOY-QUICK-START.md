# 🚀 Quick Deployment Guide

## 🎯 Recommended: Railway or Render

### Railway ⭐⭐⭐ (Easiest)
- **Free**: $5 credit/month, then $5/month
- **Best for**: Quick deployment, great UX
- **📖 Guide**: [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md)

### Render ⭐⭐ (Most Free Hours)

**Render is the best free option** for your video conferencing app because:
- ✅ Full WebSocket support (required for Socket.io)
- ✅ Free tier available
- ✅ Automatic SSL certificates
- ✅ Easy GitHub deployment

### ⚡ Quick Steps:

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy Backend**:
   - Go to [render.com](https://render.com) → Sign up
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Settings:
     - **Build**: `cd server && npm install`
     - **Start**: `cd server && node index.js`
     - **Plan**: Free
     - **Env Vars**:
       - `NODE_ENV` = `production`
       - `PORT` = `10000`
       - `CLIENT_URL` = (set after frontend deploys)

3. **Deploy Frontend**:
   - Click "New +" → "Web Service" again
   - Same repo
   - Settings:
     - **Build**: `cd client-nextjs && npm install && npm run build`
     - **Start**: `cd client-nextjs && npm start`
     - **Plan**: Free
     - **Env Vars**:
       - `NEXT_PUBLIC_SERVER_URL` = `https://your-backend.onrender.com`

4. **Update Backend**:
   - Add frontend URL to backend's `CLIENT_URL` env var

**📖 Full detailed guide**: See [`RENDER-DEPLOYMENT.md`](./RENDER-DEPLOYMENT.md)

---

## 🔥 Firebase Alternative (Frontend Only)

Firebase Hosting is great for static sites, but **not recommended** for this app because:
- ❌ Doesn't support WebSocket servers (needed for Socket.io)
- ✅ Good for frontend hosting only
- ⚠️ You'll need a separate backend (like Render)

**📖 Firebase guide**: See [`FIREBASE-DEPLOYMENT.md`](./FIREBASE-DEPLOYMENT.md)

---

## 📊 Comparison

| Platform | Free Tier | WebSocket | Frontend | Backend | Ease |
|----------|-----------|-----------|----------|---------|------|
| **Railway** | ✅ $5/month | ✅ Full | ✅ Yes | ✅ Yes | ⭐⭐⭐ |
| **Render** | ✅ 750hrs/mo | ✅ Full | ✅ Yes | ✅ Yes | ⭐⭐⭐ |
| Firebase | ✅ Yes | ❌ No | ✅ Yes | ❌ No | ⭐⭐ |
| Vercel | ✅ Yes | ❌ No | ✅ Yes | ❌ Limited | ⭐⭐ |

**Winner: Railway** (easiest) or **Render** (most free hours) 🏆

---

## 🎯 Next Steps

1. Choose Render (recommended) or Firebase
2. Follow the detailed guide
3. Test with multiple devices
4. Share your deployed URL!

---

## 💡 Tips

- **Use render.yaml**: Automatic deployment configuration included
- **First request delay**: Free tier spins down after 15 min (30 sec cold start)
- **Test on mobile**: Ensure WebRTC works across devices
- **Monitor logs**: Check Render dashboard for any issues

---

## ❓ Need Help?

- **Railway guide**: [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md) ⭐ Recommended
- Full Render guide: [`RENDER-DEPLOYMENT.md`](./RENDER-DEPLOYMENT.md)
- Firebase guide: [`FIREBASE-DEPLOYMENT.md`](./FIREBASE-DEPLOYMENT.md)
- General deployment: [`DEPLOYMENT-GUIDE.md`](./DEPLOYMENT-GUIDE.md)

