const io = require('socket.io-client');

console.log('🧪 Testing two participants joining...');

// Create two socket connections
const hostSocket = io('http://localhost:5001', {
  transports: ['websocket'],
  reconnection: false
});

const participantSocket = io('http://localhost:5001', {
  transports: ['websocket'],
  reconnection: false
});

let hostConnected = false;
let participantConnected = false;

// Host connection
hostSocket.on('connect', () => {
  console.log('👑 Host connected:', hostSocket.id);
  hostConnected = true;
  
  // Host joins meeting
  console.log('👑 Host joining meeting...');
  hostSocket.emit('join-meeting', {
    meetingId: 'TEST456',
    userName: 'Host',
    isHost: true
  });
});

hostSocket.on('meeting-joined', (data) => {
  console.log('🏠 Host - Meeting joined:', data);
});

hostSocket.on('participant-joined', (data) => {
  console.log('👤 Host - Participant joined:', data);
});

// Participant connection
participantSocket.on('connect', () => {
  console.log('📱 Participant connected:', participantSocket.id);
  participantConnected = true;
  
  // Wait a bit then join as participant
  setTimeout(() => {
    console.log('📱 Participant joining meeting...');
    participantSocket.emit('join-meeting', {
      meetingId: 'TEST456',
      userName: 'iPhoneUser',
      isHost: false
    });
  }, 1000);
});

participantSocket.on('meeting-joined', (data) => {
  console.log('🏠 Participant - Meeting joined:', data);
});

participantSocket.on('participant-joined', (data) => {
  console.log('👤 Participant - Participant joined:', data);
});

// Error handling
hostSocket.on('connect_error', (error) => {
  console.error('❌ Host connection error:', error);
});

participantSocket.on('connect_error', (error) => {
  console.error('❌ Participant connection error:', error);
});

// Keep running for 10 seconds
setTimeout(() => {
  console.log('⏰ Test completed');
  hostSocket.disconnect();
  participantSocket.disconnect();
  process.exit(0);
}, 10000);
