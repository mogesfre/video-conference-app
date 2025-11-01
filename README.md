# VideoConference - Real-Time Video Conferencing Application

A full-stack, real-time video conferencing application built with React, TypeScript, Node.js, Express, Socket.IO, and WebRTC. This application mimics the core functionality of Zoom, providing professional-grade video conferencing capabilities.

## 🎥 Features

### Core Functionality
- **Real-Time Video & Audio**: High-quality WebRTC-powered video and audio streaming with low latency
- **Signaling Server**: WebSocket-based signaling for seamless peer-to-peer connections
- **Dynamic Participant Display**: Responsive grid layout that adapts as participants join/leave
- **Meeting Management**: Create or join meetings using unique Meeting IDs

### Key Features
- **Screen Sharing**: Share your screen, specific application, or browser tab
- **In-Meeting Chat**: Real-time text chat with all participants
- **Media Controls**: Toggle microphone and camera on/off
- **Participant List**: View all participants with their current status (muted/video on)
- **Host Controls**: Mute all participants (host-only feature)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode UI**: Modern, professional interface with Tailwind CSS

## 🏗️ Technical Stack

### Frontend
- **React** (TypeScript)
- **Tailwind CSS** for styling
- **Socket.IO Client** for WebSocket communication
- **WebRTC API** for peer-to-peer connections
- **React Router** for navigation

### Backend
- **Node.js** with **Express**
- **Socket.IO** for real-time signaling
- **UUID** for meeting ID generation
- **CORS** for cross-origin support

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- A modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- Camera and microphone permissions

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VideoConference
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install-all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Configuration

The application uses default ports:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

To customize, you can set environment variables:

**Server (.env in server folder - optional):**
```
PORT=5000
CLIENT_URL=http://localhost:3000
```

**Client (.env in client folder - optional):**
```
REACT_APP_SERVER_URL=http://localhost:5000
```

## 🎬 Running the Application

### Option 1: Run Both Frontend and Backend Simultaneously

From the root directory:

```bash
npm run dev
```

### Option 2: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will open automatically in your browser at `http://localhost:3000`

## 📖 How to Use

### Creating a Meeting

1. Open the application in your browser
2. Enter your name
3. Click **"Create New Meeting"**
4. Share the generated Meeting ID with participants
5. Your camera and microphone will be activated

### Joining a Meeting

1. Open the application in your browser
2. Enter your name
3. Enter the Meeting ID
4. Click **"Join Meeting"**
5. Grant camera and microphone permissions when prompted

### During a Meeting

#### Media Controls
- **Microphone**: Toggle mute/unmute
- **Camera**: Toggle video on/off
- **Screen Share**: Share your screen (click again to stop)
- **Leave**: Exit the meeting

#### Additional Features
- **Chat**: Click the chat icon to open the chat panel
- **Participants**: Click the participants icon to view all attendees
- **Copy Meeting ID**: Click the copy icon next to the Meeting ID
- **Mute All** (Host only): Available in the Participants panel

### Participant View

The video grid automatically adjusts based on the number of participants:
- 1 participant: Full screen
- 2 participants: Split view
- 3-4 participants: 2x2 grid
- 5-9 participants: 3x3 grid
- 10+ participants: 4x4 grid

When screen sharing is active, the shared screen takes the main view with participant thumbnails below.

## 🏛️ Architecture

### WebRTC Flow

1. **Signaling**: Socket.IO manages the handshake between peers
2. **Offer/Answer**: SDP (Session Description Protocol) exchange
3. **ICE Candidates**: Network path discovery using STUN servers
4. **Media Streams**: Direct peer-to-peer audio/video transmission

### Socket Events

**Client → Server:**
- `join-meeting`: Join a meeting room
- `offer`: Send WebRTC offer
- `answer`: Send WebRTC answer
- `ice-candidate`: Send ICE candidate
- `toggle-mute`: Update mute status
- `toggle-video`: Update video status
- `send-message`: Send chat message
- `start-screen-share`: Start screen sharing
- `stop-screen-share`: Stop screen sharing
- `mute-all`: Mute all participants (host only)

**Server → Client:**
- `meeting-joined`: Confirm meeting join
- `participant-joined`: New participant joined
- `participant-left`: Participant left
- `offer`: Receive WebRTC offer
- `answer`: Receive WebRTC answer
- `ice-candidate`: Receive ICE candidate
- `participant-mute-changed`: Participant mute status changed
- `participant-video-changed`: Participant video status changed
- `message-received`: New chat message
- `screen-share-started`: Screen sharing started
- `screen-share-stopped`: Screen sharing stopped
- `mute-all-requested`: Host requested mute all

## 🔧 Troubleshooting

### Camera/Microphone Not Working

- Ensure browser permissions are granted
- Check if another application is using the camera/microphone
- Try refreshing the page
- Use HTTPS in production (required for getUserMedia)

### Connection Issues

- Check if both frontend and backend are running
- Verify firewall settings
- Ensure ports 3000 and 5000 are not blocked
- Check browser console for errors

### Poor Video Quality

- Check internet connection speed
- Reduce number of participants
- Turn off video to reduce bandwidth
- Close other bandwidth-intensive applications

### Screen Sharing Not Working

- Ensure browser supports screen sharing (Chrome, Firefox, Edge)
- Grant screen sharing permissions when prompted
- Try reloading the page

## 🌐 Browser Support

- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari (macOS/iOS)
- ❌ Internet Explorer (not supported)

## 📱 Mobile Support

The application is responsive and works on mobile devices:
- Touch-optimized controls
- Adaptive video grid
- Mobile-friendly chat and participant panels

## 🔒 Security Considerations

**For Production Deployment:**

1. **HTTPS Required**: WebRTC requires HTTPS in production
2. **TURN Server**: Add a TURN server for NAT traversal
3. **Authentication**: Implement user authentication
4. **Meeting Passwords**: Add password protection for meetings
5. **Rate Limiting**: Implement rate limiting on the server
6. **Input Validation**: Validate all user inputs
7. **CORS**: Configure CORS properly for your domain

## 🚀 Production Deployment

### Backend Deployment

Deploy to services like Heroku, DigitalOcean, AWS, or Railway:

```bash
cd server
# Build and deploy
```

Update environment variables:
- `CLIENT_URL`: Your frontend URL
- `PORT`: Server port

### Frontend Deployment

Deploy to Vercel, Netlify, or similar:

```bash
cd client
npm run build
# Deploy the build folder
```

Update environment variables:
- `REACT_APP_SERVER_URL`: Your backend URL

### TURN Server Configuration

For production, add TURN servers to `client/src/utils/webrtc.ts`:

```typescript
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:your-turn-server.com:3478',
      username: 'username',
      credential: 'password'
    }
  ]
};
```

## 📝 Project Structure

```
VideoConference/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Landing.tsx
│   │   │   ├── Meeting.tsx
│   │   │   ├── VideoGrid.tsx
│   │   │   ├── Controls.tsx
│   │   │   ├── Chat.tsx
│   │   │   └── ParticipantsList.tsx
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   │   ├── socket.ts
│   │   │   └── webrtc.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   └── package.json
├── package.json          # Root package.json
└── README.md            # This file
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- WebRTC for real-time communication
- Socket.IO for signaling
- React and TypeScript for the frontend
- Tailwind CSS for styling

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console errors
3. Ensure all dependencies are installed
4. Verify ports are available

---

**Built with ❤️ using React, TypeScript, Node.js, and WebRTC**


