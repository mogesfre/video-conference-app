const io = require('socket.io-client');

console.log('🧪 Testing meeting connection...');

// Connect to server
const socket = io('http://localhost:5001', {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
  
  // Join as host
  console.log('👑 Joining as Host...');
  socket.emit('join-meeting', {
    meetingId: 'TEST123',
    userName: 'Host',
    isHost: true
  });
});

socket.on('meeting-joined', (data) => {
  console.log('🏠 Meeting joined:', data);
});

socket.on('participant-joined', (data) => {
  console.log('👤 Participant joined:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error);
});

// Keep the script running
setTimeout(() => {
  console.log('⏰ Test completed');
  process.exit(0);
}, 10000);
