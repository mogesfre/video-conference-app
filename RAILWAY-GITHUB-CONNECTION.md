# 🔗 Connecting Railway to GitHub (Different Email)

## Overview

You can connect Railway to GitHub repositories even if you're signed in to Railway with a **different email** than your GitHub account. Railway connects via GitHub authorization, not email matching.

## ✅ Step-by-Step Guide

### 1. Connect GitHub Account in Railway

1. **Sign in to Railway** with your Railway account
2. Go to **Account Settings** (click your profile icon → Settings)
3. Navigate to **Connections** or **GitHub** section
4. Click **"Connect GitHub"** or **"Authorize GitHub"**
5. You'll be redirected to GitHub
6. **Sign in to GitHub** with your `mogesfre` GitHub account (if not already signed in)
7. Authorize Railway to access your repositories
8. Select the repositories you want to grant access to, or grant access to all repositories

### 2. Create Railway Project

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. You should now see `mogesfre/video-conference-app` in the repository list
4. Select it to create the project

### 3. If Repository Doesn't Appear

If you don't see your repository:

**Option A: Check GitHub Permissions**
1. Go to GitHub → **Settings** → **Applications** → **Authorized OAuth Apps**
2. Find **Railway** in the list
3. Check if it has access to your repositories
4. If needed, revoke and reconnect with proper permissions

**Option B: Reconnect GitHub**
1. In Railway → **Settings** → **Connections**
2. Disconnect GitHub
3. Reconnect and authorize with `mogesfre` account
4. Make sure to grant access to repositories

**Option C: Grant Repository Access**
1. Go to your repository: https://github.com/mogesfre/video-conference-app
2. Go to **Settings** → **Collaborators** (if it's a private repo)
3. Or ensure Railway has access in GitHub OAuth settings

### 4. Verify Connection

After connecting, you should:
- ✅ See the repository in Railway's repository list
- ✅ Be able to create services from the repository
- ✅ Have automatic deployments on git push

## 🚀 Next Steps

Once connected, follow the deployment guide:
- **Quick Start**: [`RAILWAY-QUICK-START.md`](./RAILWAY-QUICK-START.md)
- **Full Guide**: [`RAILWAY-DEPLOYMENT.md`](./RAILWAY-DEPLOYMENT.md)

## 🔐 Important Notes

- **Email doesn't matter**: Railway connects via GitHub OAuth, not email
- **Account matters**: You need to authorize Railway with the GitHub account that owns the repository (`mogesfre`)
- **Permissions**: Railway needs "repo" scope to deploy from private repositories
- **Public repos**: Public repositories are automatically accessible if Railway is connected

## ❓ Troubleshooting

### "Repository not found"
- Check that Railway is authorized with the correct GitHub account
- Verify the repository exists and is accessible
- Check GitHub permissions in Railway settings

### "Permission denied"
- Re-authorize Railway in GitHub settings
- Ensure Railway has "repo" scope permissions
- Check if the repository is private and Railway has access

### "Can't see repository"
- Try refreshing the Railway dashboard
- Disconnect and reconnect GitHub
- Clear browser cache and cookies

## 📞 Support

If you continue having issues:
1. Check Railway logs in the dashboard
2. Review GitHub authorization settings
3. Contact Railway support or check their documentation

---

**Remember**: Railway connects to GitHub via OAuth, so as long as you authorize Railway with the GitHub account that owns `mogesfre/video-conference-app`, it will work regardless of your Railway account email!

