# 🌐 Multi-Device Video Conference Setup

## ✅ **Current Server Status**
- **Server Running**: ✅ Port 3000
- **Network Binding**: ✅ All interfaces (0.0.0.0)
- **IP Address**: 192.168.1.199
- **Status**: Ready for multi-device testing

## 🔗 **Working URLs for Other Devices**

### **Primary URLs (Recommended)**
```
Landing Page:
http://192.168.1.199:3000

Host Meeting:
http://192.168.1.199:3000/meeting/TEST123?userName=Host&isHost=true

Join Meeting:
http://192.168.1.199:3000/meeting/TEST123?userName=Participant&isHost=false
```

## 📱 **Device-Specific Instructions**

### **iPhone/Android**
1. Open Safari or Chrome browser
2. Type the URL directly: `http://192.168.1.199:3000`
3. Allow camera/microphone permissions when prompted
4. Test the video conference interface

### **Laptop/Desktop**
1. Open any modern browser (Chrome, Firefox, Safari, Edge)
2. Navigate to: `http://192.168.1.199:3000`
3. Allow camera/microphone permissions when prompted
4. Test all functionality

## 🔧 **Troubleshooting Steps**

### **If "Site Can't Be Reached" Error:**

1. **Check WiFi Network**
   - Ensure both devices are on the same WiFi network
   - Check WiFi name matches exactly

2. **Check IP Address**
   - Verify the server IP is still 192.168.1.199
   - Run: `ifconfig | grep "inet " | grep -v 127.0.0.1`

3. **Test Server Connectivity**
   - From the server computer: `curl -I http://192.168.1.199:3000`
   - Should return HTTP 200 OK

4. **Check Firewall Settings**
   ```bash
   # Allow Node.js through firewall
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
   ```

5. **Try Different Ports**
   ```bash
   # Stop current server (Ctrl+C)
   # Then try different port
   cd /Users/mog/VideoConference/client-nextjs
   PORT=8080 HOST=0.0.0.0 npm run dev
   ```

### **If Camera/Microphone Not Working:**

1. **Use HTTPS** (required for camera access)
   ```bash
   # Generate SSL certificates
   mkdir -p ssl
   openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   
   # Start HTTPS server
   cd /Users/mog/VideoConference/client-nextjs
   npm run dev:https
   ```

2. **Use HTTPS URLs**
   ```
   https://192.168.1.199:3000
   https://192.168.1.199:3000/meeting/TEST123?userName=Host&isHost=true
   ```

## 🧪 **Testing Checklist**

### **Basic Connectivity**
- [ ] Server accessible from other device
- [ ] Landing page loads correctly
- [ ] Meeting page loads correctly

### **Video Conference Features**
- [ ] Camera permission granted
- [ ] Video feed displays
- [ ] Audio controls work (mute/unmute)
- [ ] Video controls work (on/off)
- [ ] Chat panel opens/closes
- [ ] Participants panel opens/closes
- [ ] Screen sharing works
- [ ] Leave meeting returns to landing page

### **Multi-Device Testing**
- [ ] Two devices can access same meeting
- [ ] Both devices show video interface
- [ ] Controls work on both devices

## 🚨 **Common Issues & Solutions**

### **"ERR_ADDRESS_UNREACHABLE"**
- **Cause**: Network connectivity issue
- **Solution**: Check WiFi network, try different port, check firewall

### **"ERR_CONNECTION_REFUSED"**
- **Cause**: Server not running or wrong port
- **Solution**: Restart server, check port number

### **"Camera/Microphone Access Denied"**
- **Cause**: HTTP instead of HTTPS
- **Solution**: Use HTTPS URLs or enable camera permissions

### **"Site Can't Be Reached"**
- **Cause**: Wrong IP address or network issue
- **Solution**: Verify IP address, check network settings

## 📞 **Quick Test Commands**

```bash
# Check server status
curl -I http://192.168.1.199:3000

# Check what's running on port 3000
lsof -i :3000

# Check network interfaces
ifconfig | grep "inet " | grep -v 127.0.0.1

# Restart server
pkill -f "next dev"
cd /Users/mog/VideoConference/client-nextjs
HOST=0.0.0.0 npm run dev
```

## 🎯 **Expected Results**

When working correctly:
- ✅ Other devices can access the URLs
- ✅ Video conference interface loads
- ✅ Camera/microphone permissions work
- ✅ All controls function properly
- ✅ Multiple devices can join the same meeting

**The application should work perfectly for multi-device testing!** 🚀
