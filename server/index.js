const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

// Create HTTPS server if certificates exist, otherwise HTTP
let server;
try {
  const options = {
    key: fs.readFileSync('../ssl/key.pem'),
    cert: fs.readFileSync('../ssl/cert.pem')
  };
  server = https.createServer(options, app);
  console.log('🔒 HTTPS server created');
} catch (error) {
  console.log('⚠️  SSL certificates not found, using HTTP server');
  server = http.createServer(app);
}
// CORS configuration - use CLIENT_URL from environment
// For Railway: Set CLIENT_URL to your frontend URL (e.g., https://your-frontend.railway.app)
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";

// Also allow localhost for local development
const corsOrigins = process.env.CLIENT_URL 
  ? [process.env.CLIENT_URL, "http://localhost:3000", "https://localhost:3000"]
  : ["http://localhost:3000", "https://localhost:3000"];

// Add additional origins if specified (comma-separated)
if (process.env.CLIENT_URLS) {
  corsOrigins.push(...process.env.CLIENT_URLS.split(','));
}

const io = socketIo(server, {
  cors: {
    origin: corsOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware - use primary allowed origin
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(express.json());

// Store active meetings and participants
const meetings = new Map();
const participants = new Map();

// Generate unique meeting ID
const generateMeetingId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join meeting
  socket.on('join-meeting', ({ meetingId, userName, isHost = false }) => {
    if (!meetings.has(meetingId)) {
      meetings.set(meetingId, {
        id: meetingId,
        participants: new Set(),
        host: isHost ? socket.id : null,
        createdAt: new Date()
      });
    }

    const meeting = meetings.get(meetingId);
    
    // Send existing participants with their details (before adding current socket)
    const existingParticipants = Array.from(meeting.participants)
      .filter(id => id !== socket.id) // Exclude current socket
      .map(id => {
        const participant = participants.get(id);
        return participant ? {
          id: participant.id,
          userName: participant.userName,
          isHost: participant.isHost,
          isMuted: participant.isMuted,
          isVideoOn: participant.isVideoOn
        } : null;
      })
      .filter(p => p !== null);
    
    console.log(`🔍 User ${userName} (${socket.id}) joining meeting ${meetingId}`);
    console.log(`🔍 Existing participants before adding current user:`, existingParticipants);
    console.log(`🔍 Meeting participants set:`, Array.from(meeting.participants));
    
    // Now add current socket to meeting
    meeting.participants.add(socket.id);
    
    participants.set(socket.id, {
      id: socket.id,
      userName,
      meetingId,
      isHost,
      isMuted: false,
      isVideoOn: true
    });

    socket.join(meetingId);
    
    console.log(`🔍 Sending meeting-joined to ${userName} with participants:`, existingParticipants);
    socket.emit('meeting-joined', { meetingId, participants: existingParticipants });
    
    // Notify other participants
    console.log(`🔍 Notifying other participants about ${userName} joining`);
    socket.to(meetingId).emit('participant-joined', {
      participantId: socket.id,
      userName,
      isHost
    });

    console.log(`User ${userName} joined meeting ${meetingId}`);
  });

  // WebRTC signaling
  socket.on('offer', ({ meetingId, offer, targetId }) => {
    socket.to(targetId).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ meetingId, answer, targetId }) => {
    socket.to(targetId).emit('answer', { answer, from: socket.id });
  });

  socket.on('ice-candidate', ({ meetingId, candidate, targetId }) => {
    socket.to(targetId).emit('ice-candidate', { candidate, from: socket.id });
  });

  // Media controls
  socket.on('toggle-mute', ({ meetingId, isMuted }) => {
    const participant = participants.get(socket.id);
    if (participant) {
      participant.isMuted = isMuted;
      socket.to(meetingId).emit('participant-mute-changed', {
        participantId: socket.id,
        isMuted
      });
    }
  });

  socket.on('toggle-video', ({ meetingId, isVideoOn }) => {
    const participant = participants.get(socket.id);
    if (participant) {
      participant.isVideoOn = isVideoOn;
      socket.to(meetingId).emit('participant-video-changed', {
        participantId: socket.id,
        isVideoOn
      });
    }
  });

  // Screen sharing
  socket.on('start-screen-share', ({ meetingId }) => {
    socket.to(meetingId).emit('screen-share-started', {
      participantId: socket.id,
      userName: participants.get(socket.id)?.userName
    });
  });

  socket.on('stop-screen-share', ({ meetingId }) => {
    socket.to(meetingId).emit('screen-share-stopped', {
      participantId: socket.id
    });
  });

  // Chat
  socket.on('send-message', ({ meetingId, message, userName }) => {
    socket.to(meetingId).emit('message-received', {
      message,
      userName,
      timestamp: new Date(),
      participantId: socket.id
    });
  });

  // Mute all (host only)
  socket.on('mute-all', ({ meetingId }) => {
    const participant = participants.get(socket.id);
    const meeting = meetings.get(meetingId);
    
    if (participant && meeting && participant.isHost) {
      socket.to(meetingId).emit('mute-all-requested');
    }
  });

  // Get participants list
  socket.on('get-participants', ({ meetingId }) => {
    const meeting = meetings.get(meetingId);
    if (meeting) {
      const participantList = Array.from(meeting.participants).map(id => {
        const participant = participants.get(id);
        return participant ? {
          id: participant.id,
          userName: participant.userName,
          isMuted: participant.isMuted,
          isVideoOn: participant.isVideoOn,
          isHost: participant.isHost
        } : null;
      }).filter(Boolean);
      
      socket.emit('participants-list', participantList);
    }
  });

  // Disconnect handling
  socket.on('disconnect', () => {
    const participant = participants.get(socket.id);
    if (participant) {
      const meeting = meetings.get(participant.meetingId);
      if (meeting) {
        meeting.participants.delete(socket.id);
        socket.to(participant.meetingId).emit('participant-left', {
          participantId: socket.id,
          userName: participant.userName
        });

        // Clean up empty meetings
        if (meeting.participants.size === 0) {
          meetings.delete(participant.meetingId);
        }
      }
      participants.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

// API Routes
app.get('/api/meetings', (req, res) => {
  const meetingList = Array.from(meetings.values()).map(meeting => ({
    id: meeting.id,
    participantCount: meeting.participants.size,
    createdAt: meeting.createdAt
  }));
  res.json(meetingList);
});

app.post('/api/meetings', (req, res) => {
  const meetingId = generateMeetingId();
  res.json({ meetingId });
});

// Railway automatically provides PORT environment variable
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
