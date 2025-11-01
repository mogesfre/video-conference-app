# 🚂 Railway Quick Start

## ⚡ 5-Minute Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Railway"
git push
```

### 2. Deploy Backend
1. Go to [railway.app](https://railway.app) → Sign up
2. **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. **New Service** → **GitHub Repo** (same repo)
5. Settings → **Root Directory**: `server` (or leave empty)
6. Settings → **Variables**:
   ```
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.railway.app
   ```
7. Settings → **Networking** → **Generate Domain**
8. Copy backend URL

### 3. Deploy Frontend
1. Same project → **New Service** → **GitHub Repo**
2. Settings → **Root Directory**: `client-nextjs`
3. Settings → **Variables**:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
   ```
4. Settings → **Networking** → **Generate Domain**
5. Copy frontend URL

### 4. Update Backend CORS
1. Backend service → **Variables**
2. Update `CLIENT_URL` with frontend URL

### 5. Test!
```
https://your-frontend.railway.app/meeting/TEST123?userName=Host&isHost=true
```

---

## 📋 Environment Variables

### Backend:
- `NODE_ENV=production`
- `CLIENT_URL=https://your-frontend.railway.app`

### Frontend:
- `NODE_ENV=production`
- `NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app`

---

## 🔍 Troubleshooting

**Build fails?** Check logs in Railway dashboard
**WebSocket not connecting?** Verify `NEXT_PUBLIC_SERVER_URL` and `CLIENT_URL`
**Service not starting?** Check startup logs

---

## 📖 Full Guide

See [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md) for complete instructions.

