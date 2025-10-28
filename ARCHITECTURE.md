# 🏗️ Architecture Overview

This document provides a detailed overview of the VideoConference application architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   React Application                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │   Landing   │  │   Meeting   │  │  VideoGrid  │       │  │
│  │  │  Component  │→ │  Component  │→ │  Component  │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  │         │                │                 │               │  │
│  │         ├────────────────┴─────────────────┤               │  │
│  │         ↓                                   ↓               │  │
│  │  ┌─────────────┐                    ┌─────────────┐       │  │
│  │  │   Socket    │                    │   WebRTC    │       │  │
│  │  │   Service   │                    │   Utilities │       │  │
│  │  └─────────────┘                    └─────────────┘       │  │
│  └───────┼───────────────────────────────────┼───────────────┘  │
│          │                                   │                   │
└──────────┼───────────────────────────────────┼───────────────────┘
           │ WebSocket                         │ WebRTC (P2P)
           │ (Signaling)                       │ (Media Streams)
           ↓                                   ↓
┌──────────┴───────────────────────────────────┴───────────────────┐
│                    SIGNALING SERVER                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Node.js + Express + Socket.IO                 │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │   Meeting   │  │ Participant │  │   Socket    │       │  │
│  │  │  Management │  │  Tracking   │  │   Events    │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
           ↑                                   ↑
           │                                   │
           │ WebSocket                         │ WebRTC (P2P)
           │                                   │
┌──────────┴───────────────────────────────────┴───────────────────┐
│                   CLIENT 2...N (Browsers)                         │
└───────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (Router)
├── Landing
│   ├── Create Meeting Form
│   └── Join Meeting Form
│
└── Meeting
    ├── VideoGrid
    │   ├── LocalVideo (Self)
    │   ├── RemoteVideo (Participant 1)
    │   ├── RemoteVideo (Participant 2)
    │   └── ScreenShare (Optional)
    │
    ├── Controls
    │   ├── Mute Button
    │   ├── Video Toggle Button
    │   ├── Screen Share Button
    │   ├── Leave Button
    │   ├── Chat Button
    │   └── Participants Button
    │
    ├── Chat (Conditional)
    │   ├── Message List
    │   └── Message Input
    │
    └── ParticipantsList (Conditional)
        ├── Host Controls (Mute All)
        └── Participant Items
```

## Data Flow

### 1. Meeting Creation Flow

```
User Input (Name)
    ↓
Landing Component
    ↓
POST /api/meetings
    ↓
Server generates Meeting ID
    ↓
Client navigates to /meeting/:id
    ↓
Meeting Component mounts
    ↓
Request camera/microphone access
    ↓
Connect to Socket.IO
    ↓
Emit 'join-meeting' event
    ↓
Server adds to meeting room
    ↓
Meeting ready for participants
```

### 2. Participant Join Flow

```
New User enters Meeting ID
    ↓
Navigate to /meeting/:id
    ↓
Request media permissions
    ↓
Connect to Socket.IO
    ↓
Emit 'join-meeting' event
    ↓
Server broadcasts 'participant-joined'
    ↓
Existing participants receive notification
    ↓
WebRTC peer connections established
    ↓
Offer/Answer exchange via signaling server
    ↓
ICE candidates exchanged
    ↓
Direct P2P media streams flow
```

### 3. WebRTC Connection Flow

```
Participant A                Signaling Server              Participant B
     │                              │                           │
     ├─── join-meeting ────────────→│                           │
     │                              ├──── participant-joined ──→│
     │                              │                           │
     │←── offer ─────────────────────┼─────── createOffer ──────┤
     │                              │                           │
     ├─── answer ───────────────────→│                           │
     │                              ├──── answer ───────────────→│
     │                              │                           │
     ├─── ice-candidate ────────────→│                           │
     │                              ├──── ice-candidate ────────→│
     │                              │                           │
     │◄════════ P2P Media Stream ═══════════════════════════════►│
```

### 4. Media Control Flow

```
User clicks Mute Button
    ↓
Toggle local audio track
    ↓
Update local state (isMuted)
    ↓
Emit 'toggle-mute' to server
    ↓
Server broadcasts to other participants
    ↓
Other participants update UI
    ↓
Mute badge appears on video tile
```

### 5. Screen Share Flow

```
User clicks Screen Share
    ↓
getDisplayMedia() API call
    ↓
User selects screen/window
    ↓
Screen stream obtained
    ↓
Emit 'start-screen-share' event
    ↓
Server notifies all participants
    ↓
UI switches to screen share layout
    ↓
Screen displayed in main view
    ↓
Participant videos in thumbnails
```

### 6. Chat Message Flow

```
User types message
    ↓
User clicks Send
    ↓
Add message to local state
    ↓
Emit 'send-message' to server
    ↓
Server broadcasts to other participants
    ↓
Other participants receive 'message-received'
    ↓
Messages appended to chat list
    ↓
Auto-scroll to bottom
```

## Technology Stack Details

### Frontend Stack

```
┌─────────────────────────────────────┐
│          React 18.2.0               │
│          TypeScript 4.9.5            │
├─────────────────────────────────────┤
│     UI Framework: Tailwind CSS      │
│     Routing: React Router 6         │
│     WebSocket: Socket.IO Client     │
│     RTC: Native WebRTC APIs         │
└─────────────────────────────────────┘
```

### Backend Stack

```
┌─────────────────────────────────────┐
│          Node.js (v16+)             │
│          Express 4.18.2              │
├─────────────────────────────────────┤
│     WebSocket: Socket.IO 4.7.4      │
│     CORS: cors 2.8.5                 │
│     UUID: uuid 9.0.1                 │
└─────────────────────────────────────┘
```

## State Management

### Meeting Component State

```typescript
{
  socket: Socket | null,
  localStream: MediaStream | null,
  screenShareStream: MediaStream | null,
  participants: Map<string, Participant>,
  messages: Message[],
  isMuted: boolean,
  isVideoOn: boolean,
  isScreenSharing: boolean,
  isChatOpen: boolean,
  isParticipantsOpen: boolean,
  screenShareParticipantId: string | null
}
```

### Participant State

```typescript
{
  id: string,
  userName: string,
  isMuted: boolean,
  isVideoOn: boolean,
  isHost: boolean,
  stream?: MediaStream
}
```

### Server State

```typescript
meetings: Map<meetingId, {
  id: string,
  participants: Set<socketId>,
  host: string,
  createdAt: Date
}>

participants: Map<socketId, {
  id: string,
  userName: string,
  meetingId: string,
  isHost: boolean,
  isMuted: boolean,
  isVideoOn: boolean
}>
```

## Socket.IO Events

### Client → Server

| Event | Parameters | Description |
|-------|-----------|-------------|
| `join-meeting` | meetingId, userName, isHost | Join a meeting room |
| `offer` | meetingId, offer, targetId | Send WebRTC offer |
| `answer` | meetingId, answer, targetId | Send WebRTC answer |
| `ice-candidate` | meetingId, candidate, targetId | Send ICE candidate |
| `toggle-mute` | meetingId, isMuted | Toggle mute status |
| `toggle-video` | meetingId, isVideoOn | Toggle video status |
| `send-message` | meetingId, message, userName | Send chat message |
| `start-screen-share` | meetingId | Start screen sharing |
| `stop-screen-share` | meetingId | Stop screen sharing |
| `mute-all` | meetingId | Mute all participants |
| `disconnect` | - | User disconnected |

### Server → Client

| Event | Parameters | Description |
|-------|-----------|-------------|
| `meeting-joined` | meetingId, participants | Confirm meeting join |
| `participant-joined` | participantId, userName, isHost | New participant |
| `participant-left` | participantId, userName | Participant left |
| `offer` | offer, from | Receive WebRTC offer |
| `answer` | answer, from | Receive WebRTC answer |
| `ice-candidate` | candidate, from | Receive ICE candidate |
| `participant-mute-changed` | participantId, isMuted | Mute status changed |
| `participant-video-changed` | participantId, isVideoOn | Video status changed |
| `message-received` | message, userName, timestamp | New chat message |
| `screen-share-started` | participantId, userName | Screen share started |
| `screen-share-stopped` | participantId | Screen share stopped |
| `mute-all-requested` | - | Host muted everyone |

## WebRTC Configuration

### ICE Servers

```typescript
{
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
}
```

### Media Constraints

**Video:**
```typescript
{
  width: { ideal: 1280 },
  height: { ideal: 720 }
}
```

**Audio:**
```typescript
{
  echoCancellation: true,
  noiseSuppression: true
}
```

**Screen Share:**
```typescript
{
  video: { cursor: 'always' },
  audio: false
}
```

## File Structure

```
VideoConference/
│
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/              # React Components
│   │   │   ├── Landing.tsx          # Landing page
│   │   │   ├── Meeting.tsx          # Main meeting component
│   │   │   ├── VideoGrid.tsx        # Video layout
│   │   │   ├── Controls.tsx         # Control bar
│   │   │   ├── Chat.tsx             # Chat panel
│   │   │   └── ParticipantsList.tsx # Participants panel
│   │   │
│   │   ├── types/                   # TypeScript Types
│   │   │   └── index.ts             # Type definitions
│   │   │
│   │   ├── utils/                   # Utility Functions
│   │   │   ├── socket.ts            # Socket.IO service
│   │   │   └── webrtc.ts            # WebRTC utilities
│   │   │
│   │   ├── App.tsx                  # Root component
│   │   ├── index.tsx                # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript config
│   └── tailwind.config.js           # Tailwind config
│
├── server/                          # Node.js Backend
│   ├── index.js                     # Server entry point
│   └── package.json                 # Backend dependencies
│
├── package.json                     # Root package.json
├── README.md                        # Main documentation
├── QUICK_START.md                   # Quick start guide
├── FEATURES.md                      # Features list
├── ARCHITECTURE.md                  # This file
├── LICENSE                          # MIT License
└── .gitignore                       # Git ignore rules
```

## Network Topology

### Mesh Topology (Current Implementation)

```
    Participant A
         │
    ┌────┼────┐
    │    │    │
    ↓    ↓    ↓
    B    C    D
    │    │    │
    └────┼────┘
         │
    Participant E
```

Each participant maintains a direct P2P connection with every other participant. This works well for small meetings (2-8 participants) but doesn't scale to large meetings.

### For Large Meetings (Future Enhancement)

Consider implementing SFU (Selective Forwarding Unit) topology:

```
Participants → SFU Server → Participants
```

## Performance Considerations

### Client-Side
- **Video Resolution**: 720p default (configurable)
- **Audio Codec**: Opus (WebRTC default)
- **Video Codec**: VP8/H.264 (browser dependent)
- **Frame Rate**: 30fps default

### Server-Side
- **In-Memory Storage**: Fast but not persistent
- **Single Process**: Works for small scale
- **No Database**: Stateless design

### Scalability
- **Current**: Supports ~4-8 participants per meeting
- **Bottleneck**: Client bandwidth (mesh topology)
- **Solution**: Implement SFU/MCU for larger meetings

## Security Model

### Current Implementation
- ✅ CORS protection
- ✅ Random Meeting IDs
- ✅ No data persistence
- ✅ Peer-to-peer encryption (WebRTC default)

### Production Recommendations
- 🔒 Add HTTPS (required for production)
- 🔒 Implement authentication
- 🔒 Add meeting passwords
- 🔒 Rate limiting
- 🔒 Input sanitization
- 🔒 TURN server with authentication
- 🔒 Logging and monitoring

## Deployment Architecture

### Development
```
localhost:3000 (React Dev Server)
      ↓
localhost:5000 (Node.js Server)
```

### Production
```
CDN (Static Files)
      ↓
Load Balancer
      ↓
Multiple Server Instances
      ↓
TURN/STUN Servers
```

---

**This architecture supports the current feature set and is designed for easy enhancement and scalability.**

