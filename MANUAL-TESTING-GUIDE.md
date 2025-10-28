# 🧪 Manual Multi-Device Testing Guide

## Quick Start - Test URLs

### Step 1: Create a Meeting (Host)
**On your laptop/computer:**
```
http://localhost:3000/meeting/TEST123?userName=Host&isHost=true&test=true
```

### Step 2: Join the Meeting (Participants)
**On your iPhone or other devices:**
```
http://192.168.1.199:3000/meeting/TEST123?userName=iPhoneUser&isHost=false&test=true
```

**On another device (tablet, second phone, etc.):**
```
http://192.168.1.199:3000/meeting/TEST123?userName=TabletUser&isHost=false&test=true
```

## Alternative: Use Landing Page

### Method 1: Host Creates Meeting
1. Go to: `http://192.168.1.199:3000/`
2. Check "Enable Test Mode (Skip Camera/Microphone)"
3. Enter name: "Host"
4. Click "Create New Meeting"
5. Share the meeting ID with others

### Method 2: Participants Join Meeting
1. Go to: `http://192.168.1.199:3000/`
2. Check "Enable Test Mode (Skip Camera/Microphone)"
3. Enter name: "YourName"
4. Enter meeting ID: "TEST123" (or whatever the host created)
5. Click "Join Meeting"

## Test Scenarios

### Basic Functionality Test
1. **Host joins first** - should see meeting interface
2. **Participants join** - should see each other in video grid
3. **Test controls** - mute/unmute, video on/off
4. **Test chat** - send messages between devices
5. **Test participants panel** - see who's in the meeting

### Multi-Device Test
1. **Device 1 (Laptop)**: Host with name "LaptopUser"
2. **Device 2 (iPhone)**: Participant with name "iPhoneUser"  
3. **Device 3 (Tablet)**: Participant with name "TabletUser"

### Test Different Meeting IDs
- `TEST123` - Easy to remember
- `MEETING456` - Another test meeting
- `DEMO789` - Demo meeting

## Troubleshooting

### If you see camera permission errors:
- Make sure to use `&test=true` in the URL
- Or enable "Test Mode" checkbox on landing page

### If meeting doesn't load:
- Check that both devices are on the same network
- Verify the server is running on port 3000
- Try refreshing the page

### If participants don't see each other:
- This is expected in test mode (no real video streams)
- Focus on testing UI, chat, and controls functionality

## Expected Results

### ✅ What Should Work:
- Meeting interface loads on all devices
- Chat messages appear on all devices
- Participants panel shows all users
- Controls (mute, video, leave) work
- No camera permission errors

### 🧪 Test Mode Limitations:
- No real video streams (expected)
- No real audio (expected)
- Focus on UI and functionality testing

## Quick Test URLs for Copy-Paste

### Host (Laptop):
```
http://localhost:3000/meeting/TEST123?userName=Host&isHost=true&test=true
```

### Participant 1 (iPhone):
```
http://192.168.1.199:3000/meeting/TEST123?userName=iPhoneUser&isHost=false&test=true
```

### Participant 2 (Tablet):
```
http://192.168.1.199:3000/meeting/TEST123?userName=TabletUser&isHost=false&test=true
```

### Participant 3 (Another Device):
```
http://192.168.1.199:3000/meeting/TEST123?userName=GuestUser&isHost=false&test=true
```

## Notes
- All devices must be on the same WiFi network
- Server must be running on port 3000
- Test mode disables real camera/microphone access
- Focus on testing UI functionality and user experience
