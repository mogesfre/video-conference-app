# ✅ Railway Pre-Flight Check - Code Verification

## Backend (server/) ✅

### 1. Port Configuration ✅
```javascript
// server/index.js line 255
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
**Status**: ✅ Railway automatically provides `PORT` environment variable. Code is correct.

### 2. CORS Configuration ✅
```javascript
// server/index.js line 27
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

// Line 48-50
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
```
**Status**: ✅ Uses `CLIENT_URL` environment variable. Set this to your frontend URL in Railway.

**Railway Environment Variable**:
```
CLIENT_URL=https://your-frontend.railway.app
```

---

## Frontend (client-nextjs/) ✅

### 1. Backend URL Configuration ✅
```typescript
// client-nextjs/src/utils/socket.ts line 5-6
if (process.env.NEXT_PUBLIC_SERVER_URL) {
  return process.env.NEXT_PUBLIC_SERVER_URL;
}
```

```javascript
// client-nextjs/next.config.js line 5
NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5001',
```

**Status**: ✅ Uses `NEXT_PUBLIC_SERVER_URL` environment variable.

**Railway Environment Variable**:
```
NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
```

### 2. Package.json Scripts ✅
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

**Status**: ✅ Next.js automatically reads `PORT` from `process.env.PORT` (Railway provides this automatically). No need for explicit `-p` flag.

---

## ✅ Verification Summary

| Component | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| Backend PORT | `process.env.PORT` | ✅ | Railway provides automatically |
| Backend CORS | `CLIENT_URL` env | ✅ | Set to frontend URL |
| Frontend API URL | `NEXT_PUBLIC_SERVER_URL` | ✅ | Set to backend URL |
| Frontend start script | `next start` | ✅ | Auto-reads PORT from env |

---

## 🚀 Railway Environment Variables Setup

### Backend Service Variables:
```
NODE_ENV=production
CLIENT_URL=https://your-frontend.railway.app
```
*(PORT is automatically set by Railway)*

### Frontend Service Variables:
```
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
```
*(PORT is automatically set by Railway)*

---

## 📝 Deployment Checklist

- [x] Backend listens on `process.env.PORT`
- [x] Backend uses `CLIENT_URL` for CORS
- [x] Frontend uses `NEXT_PUBLIC_SERVER_URL` for backend connection
- [x] Frontend `package.json` has `build` and `start` scripts
- [x] Next.js automatically handles PORT from environment

---

## 💡 Notes

1. **PORT Variable**: Railway automatically sets `PORT` in the environment. Both Express and Next.js read this automatically, so no explicit configuration needed in the code.

2. **Next.js Start**: The command `next start` automatically uses `process.env.PORT`. The syntax `${PORT:=3000}` you mentioned is bash syntax and doesn't work in package.json scripts, but it's not needed since Next.js handles it automatically.

3. **Environment Variables**: Make sure to set `CLIENT_URL` and `NEXT_PUBLIC_SERVER_URL` in Railway dashboard after deploying both services.

---

**All checks passed! ✅ Your code is ready for Railway deployment.**

