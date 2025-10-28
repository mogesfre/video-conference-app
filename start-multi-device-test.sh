#!/bin/bash

echo "🧪 Multi-Device Video Conference Testing"
echo "========================================"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Server not running on port 3000"
    echo "Please start the server first:"
    echo "  cd client-nextjs && npm run dev"
    exit 1
fi

echo "✅ Server is running on port 3000"
echo ""

# Generate a random meeting ID
MEETING_ID=$(openssl rand -hex 3 | tr '[:lower:]' '[:upper:]')
echo "🎯 Generated Meeting ID: $MEETING_ID"
echo ""

echo "📱 Test URLs for Manual Testing:"
echo "================================"
echo ""

echo "1. Host (Laptop/Computer):"
echo "   http://localhost:3000/meeting/$MEETING_ID?userName=Host&isHost=true&test=true"
echo ""

echo "2. Participant 1 (iPhone):"
echo "   http://192.168.1.199:3000/meeting/$MEETING_ID?userName=iPhoneUser&isHost=false&test=true"
echo ""

echo "3. Participant 2 (Tablet/Another Device):"
echo "   http://192.168.1.199:3000/meeting/$MEETING_ID?userName=TabletUser&isHost=false&test=true"
echo ""

echo "4. Participant 3 (Another Device):"
echo "   http://192.168.1.199:3000/meeting/$MEETING_ID?userName=GuestUser&isHost=false&test=true"
echo ""

echo "🌐 Alternative: Use Landing Page"
echo "================================"
echo "1. Go to: http://192.168.1.199:3000/"
echo "2. Check 'Enable Test Mode (Skip Camera/Microphone)'"
echo "3. Enter name and meeting ID: $MEETING_ID"
echo "4. Click 'Join Meeting'"
echo ""

echo "🧪 What to Test:"
echo "==============="
echo "✅ Meeting interface loads on all devices"
echo "✅ Chat messages appear on all devices"
echo "✅ Participants panel shows all users"
echo "✅ Controls (mute, video, leave) work"
echo "✅ No camera permission errors"
echo ""

echo "📋 Instructions:"
echo "==============="
echo "1. Copy the URLs above"
echo "2. Open them on different devices"
echo "3. Test chat, participants, and controls"
echo "4. All devices should see the same meeting"
echo ""

echo "🎉 Ready for testing! Copy the URLs and test on your devices."
