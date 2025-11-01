# 🚀 Render Deployment Guide (RECOMMENDED - FREE)

Render is the **best free option** for your video conferencing app because it fully supports WebSockets and has a generous free tier.

## ✅ Why Render?

- ✅ **Free tier available** (with limitations)
- ✅ **Full WebSocket support** (perfect for Socket.io)
- ✅ **Easy GitHub deployment**
- ✅ **Automatic SSL certificates**
- ✅ **Both frontend & backend supported**

## 📋 Prerequisites

1. GitHub account
2. Your code pushed to GitHub
3. Render account (sign up at [render.com](https://render.com))

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

If you haven't already:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for Render deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/video-conference-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend Server

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the backend:
   - **Name**: `video-conference-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node index.js`
   - **Plan**: `Free`
   
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses this port)
   - `CLIENT_URL` = `https://your-frontend-url.onrender.com` (you'll update this after deploying frontend)

6. Click **"Create Web Service"**

7. Copy the backend URL (e.g., `https://video-conference-backend.onrender.com`)

### Step 3: Deploy Frontend

1. Click **"New +"** → **"Web Service"** again
2. Select the same GitHub repository
3. Configure the frontend:
   - **Name**: `video-conference-frontend`
   - **Environment**: `Node`
   - **Build Command**: `cd client-nextjs && npm install && npm run build`
   - **Start Command**: `cd client-nextjs && npm start`
   - **Plan**: `Free`

4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_SERVER_URL` = `https://your-backend-url.onrender.com` (from Step 2)

5. Click **"Create Web Service"**

### Step 4: Update Backend CORS Settings

After getting your frontend URL, update the backend environment variable:
1. Go to your backend service
2. Environment tab
3. Update `CLIENT_URL` to your frontend URL

Also update `server/index.js` to include your Render URLs in CORS:

```javascript
const io = socketIo(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "https://localhost:3000",
      "https://your-frontend.onrender.com", // Add this
      // ... other origins
    ],
    methods: ["GET", "POST"]
  }
});
```

### Step 5: Wait for Deployment

Both services will build and deploy. This takes about 5-10 minutes.

---

## 🎯 Using render.yaml (Automatic Deployment)

Alternatively, you can use the `render.yaml` file for automatic deployment:

1. Push `render.yaml` to your repository
2. In Render dashboard, click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create both services

**Note:** You'll need to update the `CLIENT_URL` environment variable in the backend service after both services are created.

---

## 🔧 Configuration Files

### render.yaml
```yaml
services:
  - type: web
    name: video-conference-backend
    env: node
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && node index.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: CLIENT_URL
        value: https://video-conference-frontend.onrender.com

  - type: web
    name: video-conference-frontend
    env: node
    plan: free
    buildCommand: cd client-nextjs && npm install && npm run build
    startCommand: cd client-nextjs && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_SERVER_URL
        fromService:
          type: web
          name: video-conference-backend
          property: host
```

---

## 🧪 Testing Your Deployment

Once deployed, test your app:

### Create a Meeting:
```
https://your-frontend.onrender.com/meeting/TEST123?userName=Host&isHost=true
```

### Join Meeting:
```
https://your-frontend.onrender.com/meeting/TEST123?userName=Participant&isHost=false
```

### Test Multi-Device:
1. Open the create meeting URL on your computer
2. Open the join meeting URL on your phone (different network)
3. Test video/audio, chat, and controls

---

## ⚠️ Free Tier Limitations

Render's free tier has some limitations:
- **Spins down after 15 minutes** of inactivity
- **First request after spin-down** takes ~30 seconds (cold start)
- **750 hours/month** free usage

### Tips:
- Your app will work fine, just expect a delay on first connection after inactivity
- For production, consider upgrading to paid plan ($7/month) for always-on
- The cold start doesn't affect WebSocket connections once established

---

## 🔍 Troubleshooting

### WebSocket Connection Issues
1. Check that backend CORS includes your frontend URL
2. Verify `NEXT_PUBLIC_SERVER_URL` is set correctly
3. Check Render logs for errors

### Build Failures
1. Check Node.js version compatibility
2. Review build logs in Render dashboard
3. Ensure all dependencies are in `package.json`

### Connection Timeout
- First connection after spin-down may take 30 seconds
- This is normal for free tier
- Subsequent connections are instant

---

## 📊 Monitoring

View logs in Render dashboard:
- Real-time logs
- Deployment history
- Service health
- Resource usage

---

## 🚀 Next Steps

1. ✅ Deploy to Render
2. ✅ Test with multiple devices
3. ✅ Monitor logs and performance
4. 🔄 Set up custom domain (optional)
5. 🔄 Configure automatic deployments (GitHub webhooks)

---

## 💡 Pro Tips

- **Use render.yaml** for automatic service creation
- **Monitor logs** during testing
- **Test on mobile** devices for real-world usage
- **Set up email notifications** for deployment status
- **Use Render's health checks** for automatic restarts

---

## 🔗 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render WebSocket Support](https://render.com/docs/web-services#websockets)
- [Render Free Tier Info](https://render.com/pricing)

