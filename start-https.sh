#!/bin/bash

echo "🔒 Starting Video Conference with HTTPS"
echo "======================================"

# Check if SSL certificates exist
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo "❌ SSL certificates not found. Creating them..."
    mkdir -p ssl
    cd ssl
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=192.168.1.199"
    cd ..
    echo "✅ SSL certificates created"
fi

# Start the HTTPS server in the background
echo "🚀 Starting HTTPS server on port 5001..."
cd server
PORT=5001 node index.js &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 3

# Check if server is running
if curl -k -s https://localhost:5001/api/meetings -X POST > /dev/null; then
    echo "✅ HTTPS server is running on port 5001"
else
    echo "❌ HTTPS server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Start the HTTPS client
echo "🚀 Starting HTTPS Next.js client on port 3000..."
cd client-nextjs
npm run dev:https &
CLIENT_PID=$!
cd ..

# Wait a moment for client to start
sleep 5

# Check if client is running
if curl -k -s https://localhost:3000 > /dev/null; then
    echo "✅ HTTPS client is running on port 3000"
else
    echo "❌ HTTPS client failed to start"
    kill $SERVER_PID $CLIENT_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 HTTPS Video Conference is running!"
echo "====================================="
echo ""
echo "📱 Access URLs:"
echo "==============="
echo "• Laptop: https://localhost:3000"
echo "• iPhone: https://192.168.1.199:3000"
echo ""
echo "⚠️  Important Notes:"
echo "==================="
echo "• You'll see a security warning about self-signed certificates"
echo "• Click 'Advanced' → 'Proceed to localhost (unsafe)' on laptop"
echo "• On iPhone: Settings → General → About → Certificate Trust Settings"
echo "• Trust the certificate for 192.168.1.199"
echo ""
echo "🎥 Camera/Microphone should now work on all devices!"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo '🛑 Stopping servers...'; kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT
wait
