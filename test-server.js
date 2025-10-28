const io = require('socket.io-client');

console.log('Testing server connection...');

const socket = io('http://localhost:5001');

socket.on('connect', () => {
  console.log('✅ Connected to server');
  
  // Join a test meeting
  socket.emit('join-meeting', {
    meetingId: 'TEST123',
    userName: 'TestUser',
    isHost: true
  });
});

socket.on('meeting-joined', (data) => {
  console.log('🏠 Meeting joined:', data);
  console.log('📊 Existing participants count:', data.participants.length);
  console.log('👥 Existing participants:', data.participants);
  
  socket.disconnect();
  process.exit(0);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error);
  process.exit(1);
});

setTimeout(() => {
  console.log('⏰ Timeout waiting for server response');
  process.exit(1);
}, 5000);
