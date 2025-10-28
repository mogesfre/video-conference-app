#!/bin/bash

echo "🎥 Production Video Conference Testing"
echo "======================================"

# Check if Next.js is running
if curl -k -s https://localhost:3000 > /dev/null; then
    echo "✅ Next.js HTTPS client is running on port 3000"
else
    echo "❌ Next.js HTTPS client is not running. Please start it with: ./start-https.sh"
    exit 1
fi

# Check if server is running
if curl -k -s https://localhost:5001/api/meetings -X POST > /dev/null; then
    echo "✅ HTTPS server is running on port 5001"
else
    echo "❌ HTTPS server is not running. Please start it with: ./start-https.sh"
    exit 1
fi

# Generate meeting ID
MEETING_ID=$(curl -k -s https://localhost:5001/api/meetings -X POST | grep -o '"meetingId":"[^"]*"' | cut -d'"' -f4)

echo ""
echo "🎯 Generated Meeting ID: $MEETING_ID"
echo ""
echo "📱 Production URLs for Real Camera/Microphone Testing:"
echo "====================================================="
echo ""
echo "1. Host (Laptop/Computer):"
echo "   https://localhost:3000/meeting/$MEETING_ID?userName=Host&isHost=true"
echo ""
echo "2. Participant 1 (iPhone):"
echo "   https://192.168.1.199:3000/meeting/$MEETING_ID?userName=iPhoneUser&isHost=false"
echo ""
echo "3. Participant 2 (Tablet/Another Device):"
echo "   https://192.168.1.199:3000/meeting/$MEETING_ID?userName=TabletUser&isHost=false"
echo ""
echo "4. Participant 3 (Another Device):"
echo "   https://192.168.1.199:3000/meeting/$MEETING_ID?userName=GuestUser&isHost=false"
echo ""
echo "🌐 Alternative: Use Landing Page"
echo "================================"
echo "1. Go to: https://192.168.1.199:3000/"
echo "2. Click 'Allow Camera/Microphone Access' if prompted"
echo "3. Enter name and meeting ID: $MEETING_ID"
echo "4. Click 'Join Meeting'"
echo ""
echo "🎥 What to Test:"
echo "==============="
echo "✅ Camera and microphone permissions are requested"
echo "✅ Real video/audio streams are shared between participants"
echo "✅ Meeting interface loads on all devices"
echo "✅ Chat messages appear on all devices"
echo "✅ Participants panel shows all users"
echo "✅ Controls (mute, video, leave) work"
echo "✅ Screen sharing works (if supported)"
echo ""
echo "📋 Instructions:"
echo "==============="
echo "1. Copy the URLs above"
echo "2. Open them on different devices"
echo "3. Allow camera/microphone when prompted"
echo "4. Test video, audio, chat, and controls"
echo "5. All devices should see the same meeting with real video/audio"
echo ""
echo "🎉 Ready for production testing! Copy the URLs and test on your devices."
