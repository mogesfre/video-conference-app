# 🚀 Video Conference App - Cloud Deployment Guide

## 🎯 **Quick Start - Recommended Deployment**

**👉 For Railway deployment, see [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md) - Complete step-by-step guide**

**👉 For Render (free tier), see [`RENDER-DEPLOYMENT.md`](./RENDER-DEPLOYMENT.md) - Step-by-step guide**

**👉 For Firebase Hosting (frontend only), see [`FIREBASE-DEPLOYMENT.md`](./FIREBASE-DEPLOYMENT.md)**

---

## 🌐 **Best Cloud Services for WebSocket Support**

### **1. Railway ⭐⭐⭐ (RECOMMENDED)**
- **WebSocket Support**: ✅ Full support
- **Pricing**: $5 credit/month free, then $5/month
- **Deployment**: Very easy with GitHub integration
- **Best for**: Full-stack applications with real-time features
- **📖 Full Guide**: See [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md)

### **2. Render ⭐⭐**
- **WebSocket Support**: ✅ Full support
- **Pricing**: Free tier available, then $7/month
- **Deployment**: Easy with GitHub integration
- **Best for**: Node.js applications with WebSockets
- **📖 Full Guide**: See [`RENDER-DEPLOYMENT.md`](./RENDER-DEPLOYMENT.md)

### **3. Heroku**
- **WebSocket Support**: ✅ Full support
- **Pricing**: $7/month (no free tier anymore)
- **Deployment**: Well-established platform
- **Best for**: Production applications

### **4. DigitalOcean App Platform**
- **WebSocket Support**: ✅ Full support
- **Pricing**: $5/month
- **Deployment**: Good for containerized apps
- **Best for**: Scalable applications

### **5. Fly.io**
- **WebSocket Support**: ✅ Full support
- **Pricing**: Free tier available, then pay-as-you-go
- **Deployment**: Docker-based
- **Best for**: Global deployment

---

## 🚀 **Railway Deployment**

**👉 See the complete guide: [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md)**

### Quick Overview:
1. Push code to GitHub
2. Create Railway project and deploy backend service
3. Deploy frontend service in same project
4. Configure environment variables
5. Generate public domains
6. Test your deployment

**For detailed instructions, see [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md)**

---

## 🌐 **Render Deployment**

### **Step 1: Create render.yaml**
```yaml
services:
  - type: web
    name: video-conference-frontend
    env: node
    buildCommand: cd client-nextjs && npm install && npm run build
    startCommand: cd client-nextjs && npm start
    envVars:
      - key: NODE_ENV
        value: production

  - type: web
    name: video-conference-backend
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && node index.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5001
```

### **Step 2: Deploy to Render**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select the render.yaml file
6. Deploy

---

## 🐳 **Fly.io Deployment (Docker)**

### **Step 1: Install Fly CLI**
```bash
# macOS
brew install flyctl

# Or download from https://fly.io/docs/hands-on/install-flyctl/
```

### **Step 2: Create fly.toml**
```toml
app = "video-conference-app"
primary_region = "ord"

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[services]]
  internal_port = 5001
  protocol = "tcp"
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

### **Step 3: Deploy**
```bash
# Login to Fly.io
fly auth login

# Deploy
fly deploy
```

---

## 🧪 **Testing Your Deployment**

### **Test URLs**
Once deployed, test with these URLs:

#### **Create Meeting:**
```
https://your-app.railway.app/meeting/TEST123?userName=Host&isHost=true
```

#### **Join Meeting:**
```
https://your-app.railway.app/meeting/TEST123?userName=Participant&isHost=false
```

### **Multi-Device Testing**
1. **Open create meeting URL on Computer 1**
2. **Open join meeting URL on Computer 2** (different network!)
3. **Test real-time features:**
   - Video/audio streaming
   - Chat messages
   - Participant list updates
   - Mute/unmute controls

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **WebSocket Connection Failed**
   - Check if your cloud provider supports WebSockets
   - Verify CORS settings in your server
   - Check firewall settings

2. **Camera/Microphone Not Working**
   - Ensure you're using HTTPS (required for media access)
   - Check browser permissions
   - Test on different browsers

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### **Debug Commands:**
```bash
# Check logs
railway logs

# Check status
railway status

# Restart service
railway restart
```

---

## 📊 **Performance Monitoring**

### **Railway Dashboard**
- Monitor CPU/Memory usage
- View logs in real-time
- Check deployment status

### **Key Metrics to Watch:**
- Response time
- WebSocket connections
- Memory usage
- Error rates

---

## 🚀 **Next Steps**

1. **Deploy to your chosen platform**
2. **Test with multiple devices**
3. **Monitor performance**
4. **Set up custom domain** (optional)
5. **Configure SSL certificates** (usually automatic)

---

## 💡 **Pro Tips**

- **Start with Railway** - easiest to set up
- **Use environment variables** for configuration
- **Monitor logs** during testing
- **Test on mobile devices** for real-world usage
- **Set up monitoring** for production use
