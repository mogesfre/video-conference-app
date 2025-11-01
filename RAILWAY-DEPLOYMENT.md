# 🚂 Railway Deployment Guide

Railway is an excellent choice for deploying your video conferencing app with full WebSocket support and a generous free tier.

## ✅ Why Railway?

- ✅ **Free tier available** ($5 credit/month, then $5/month)
- ✅ **Full WebSocket support** (perfect for Socket.io)
- ✅ **Automatic deployments** from GitHub
- ✅ **Automatic SSL certificates**
- ✅ **Simple dashboard interface**
- ✅ **Both frontend & backend** in one project

## 📋 Prerequisites

1. GitHub account
2. Your code pushed to GitHub
3. Railway account (sign up at [railway.app](https://railway.app))

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
git commit -m "Ready for Railway deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/video-conference-app.git
git branch -M main
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository
6. Railway will create a new project

### Step 3: Deploy Backend Server

1. In your Railway project, click **"New"** → **"Service"**
2. Select **"GitHub Repo"** → Choose your repository again
3. Railway will detect it's a Node.js app
4. **Configure the backend service**:
   - Railway should auto-detect, but you may need to set:
   - **Root Directory**: Leave empty (or set to `server` if needed)
   - **Build Command**: (Railway auto-detects, but you can set `cd server && npm install`)
   - **Start Command**: `cd server && npm start`

5. **Add Environment Variables** (Settings → Variables):
   ```
   NODE_ENV=production
   PORT=${{PORT}}
   CLIENT_URL=https://your-frontend.railway.app
   ```
   *(Update CLIENT_URL after deploying frontend)*

6. **Generate Public Domain**:
   - Go to Settings → Networking
   - Click "Generate Domain" or add a custom domain
   - Copy the backend URL (e.g., `https://video-conference-backend.railway.app`)

### Step 4: Deploy Frontend

1. In the same Railway project, click **"New"** → **"Service"** again
2. Select **"GitHub Repo"** → Choose your repository
3. **Configure the frontend service**:
   - **Root Directory**: `client-nextjs`
   - **Build Command**: (auto-detected, should be `npm install && npm run build`)
   - **Start Command**: `npm start`

4. **Add Environment Variables** (Settings → Variables):
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
   ```
   *(Use the backend URL from Step 3)*

5. **Generate Public Domain**:
   - Go to Settings → Networking
   - Click "Generate Domain"
   - Copy the frontend URL (e.g., `https://video-conference-frontend.railway.app`)

### Step 5: Update Backend CORS

1. Go back to your **backend service**
2. Update the `CLIENT_URL` environment variable with your frontend URL
3. Railway will automatically redeploy

---

## 🔧 Alternative: Using Railway CLI

You can also deploy using the Railway CLI:

### Install Railway CLI
```bash
npm install -g @railway/cli
```

### Login
```bash
railway login
```

### Create Project and Deploy
```bash
# Initialize Railway in your project
railway init

# Link to existing project or create new
railway link

# Deploy
railway up
```

### Set Environment Variables
```bash
# For backend service
railway variables set NODE_ENV=production
railway variables set PORT=${{PORT}}
railway variables set CLIENT_URL=https://your-frontend.railway.app

# For frontend service (switch to frontend service first)
railway service
railway variables set NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
```

---

## 📁 Project Structure

Your Railway project should have **two services**:

```
Railway Project: video-conference-app
├── Service 1: video-conference-backend
│   ├── Root: server/
│   ├── Build: cd server && npm install
│   └── Start: cd server && npm start
│
└── Service 2: video-conference-frontend
    ├── Root: client-nextjs/
    ├── Build: npm install && npm run build
    └── Start: npm start
```

---

## 🧪 Testing Your Deployment

Once deployed, test your app:

### Create a Meeting:
```
https://your-frontend.railway.app/meeting/TEST123?userName=Host&isHost=true
```

### Join Meeting:
```
https://your-frontend.railway.app/meeting/TEST123?userName=Participant&isHost=false
```

### Test Multi-Device:
1. Open the create meeting URL on your computer
2. Open the join meeting URL on your phone (different network)
3. Test video/audio, chat, and controls

---

## 🔍 Environment Variables Reference

### Backend Service:
```bash
NODE_ENV=production
PORT=${{PORT}}  # Railway automatically sets this
CLIENT_URL=https://your-frontend.railway.app
```

### Frontend Service:
```bash
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://your-backend.railway.app
```

**Note**: Railway automatically provides the `PORT` variable. Use `${{PORT}}` in environment variables if needed.

---

## ⚙️ Configuration Files

### railway.json (Frontend)
Railway can use this file for configuration (already in your project):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd client-nextjs && npm run build && npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

### For Backend
You can create `server/railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node index.js",
    "healthcheckPath": "/api/meetings"
  }
}
```

---

## 💰 Pricing & Free Tier

### Free Tier:
- **$5 credit per month**
- Perfect for testing and small apps
- Automatic SSL
- Unlimited deploys

### Paid Plans:
- **Hobby**: $5/month after free credit
- **Pro**: $20/month (for teams)
- Pay only for what you use

**Note**: The free tier is very generous for development and testing!

---

## 🔧 Troubleshooting

### Build Failures
1. **Check logs** in Railway dashboard
2. **Verify Node.js version** - Railway auto-detects, but you can specify in `package.json`:
   ```json
   "engines": {
     "node": "18.x"
   }
   ```
3. **Check build commands** are correct
4. **Verify dependencies** are in `package.json`

### WebSocket Connection Issues
1. **Verify CORS settings** - Check `CLIENT_URL` is set correctly in backend
2. **Check frontend URL** - Ensure `NEXT_PUBLIC_SERVER_URL` points to backend
3. **Check Railway logs** for connection errors
4. **Verify both services are running** (green status in dashboard)

### Service Not Starting
1. **Check startup logs** - Railway shows detailed logs
2. **Verify start command** is correct
3. **Check PORT variable** - Railway sets this automatically
4. **Verify health check path** if configured

### Domain Issues
1. **Regenerate domain** if needed
2. **Wait for DNS propagation** (usually instant)
3. **Check SSL certificate** status

---

## 📊 Monitoring

### Railway Dashboard Features:
- ✅ **Real-time logs** - View logs from both services
- ✅ **Metrics** - CPU, Memory, Network usage
- ✅ **Deployment history** - See all deployments
- ✅ **Service health** - Monitor service status
- ✅ **Environment variables** - Manage all variables

### View Logs:
- Click on any service → "Deployments" → Select deployment → "View Logs"
- Or use Railway CLI: `railway logs`

---

## 🚀 Advanced Configuration

### Custom Domains
1. Go to Service → Settings → Networking
2. Click "Add Domain"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment-Specific Variables
Railway supports different environments:
- **Production**: Default for deployed services
- **Preview**: For pull request deployments (Pro plan)

### Automatic Deployments
Railway automatically deploys on:
- Push to main branch
- Manual trigger from dashboard
- Pull request (with Pro plan)

---

## 🎯 Next Steps

1. ✅ Deploy both services to Railway
2. ✅ Test with multiple devices
3. ✅ Monitor logs and metrics
4. 🔄 Set up custom domain (optional)
5. 🔄 Configure monitoring alerts (optional)
6. 🔄 Set up CI/CD workflows (optional)

---

## 💡 Pro Tips

- **Use Railway's built-in monitoring** to track usage
- **Set up email notifications** for deployment status
- **Use service templates** for quick setup
- **Monitor your usage** to stay within free tier
- **Use Railway's CLI** for quick deployments
- **Test locally** with Railway CLI: `railway run npm start`

---

## 🔗 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway Pricing](https://railway.app/pricing)
- [Railway CLI Docs](https://docs.railway.app/develop/cli)
- [Railway Community](https://discord.gg/railway)

---

## 📝 Quick Reference Commands

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open

# Set variables
railway variables set KEY=value

# Switch services
railway service
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables configured
- [ ] Public domains generated
- [ ] CORS settings updated
- [ ] Tested on multiple devices
- [ ] Monitoring set up

---

**🎉 You're all set! Your video conferencing app should now be live on Railway!**

