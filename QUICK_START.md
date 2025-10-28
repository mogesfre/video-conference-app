# 🚀 Quick Start Guide

Get your video conferencing app up and running in 3 simple steps!

## Step 1: Install Dependencies

From the VideoConference directory, run:

```bash
npm run install-all
```

This will install all dependencies for the root, backend, and frontend.

## Step 2: Start the Application

From the VideoConference directory, run:

```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend app (port 3000) simultaneously.

## Step 3: Start Video Conferencing!

1. Open your browser to **http://localhost:3000**
2. Enter your name
3. Click **"Create New Meeting"** to host
   - OR -
4. Enter a Meeting ID and click **"Join Meeting"** to join an existing meeting

## 🎉 That's It!

You now have a fully functional video conferencing application running locally.

### Tips:
- Open multiple browser tabs/windows to test with multiple participants
- Use different browsers or devices on the same network
- Grant camera and microphone permissions when prompted
- Click the Meeting ID copy button to easily share with others

### Having Issues?

Check the main README.md for detailed troubleshooting steps.

### Next Steps:

1. **Test Features:**
   - Turn camera/mic on and off
   - Share your screen
   - Send chat messages
   - View the participants list

2. **Customize:**
   - Edit colors in `client/tailwind.config.js`
   - Modify video quality in `client/src/utils/webrtc.ts`
   - Add authentication or database features

3. **Deploy:**
   - Follow the production deployment guide in README.md
   - Add a TURN server for better connectivity
   - Enable HTTPS for production use

---

**Enjoy your new video conferencing platform! 🎥**

