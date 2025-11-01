# 🧪 Testing Guide

A comprehensive guide to testing the VideoConference application.

## Quick Test Setup

### Prerequisites
1. ✅ Application installed and running (`npm run dev`)
2. ✅ Two or more browser windows/tabs open
3. ✅ Camera and microphone permissions granted

## 🎯 Feature Testing Checklist

### 1. Landing Page Testing

#### Create Meeting
- [ ] Enter your name
- [ ] Click "Create New Meeting"
- [ ] Verify you're redirected to a meeting page
- [ ] Verify a Meeting ID is displayed
- [ ] Verify your video feed appears

#### Join Meeting
- [ ] Enter your name
- [ ] Enter an invalid Meeting ID
- [ ] Verify error handling (if any)
- [ ] Enter a valid Meeting ID from another window
- [ ] Click "Join Meeting"
- [ ] Verify you join the meeting successfully

### 2. Media Testing

#### Camera Testing
- [ ] Verify your video is visible when joining
- [ ] Click the camera toggle button
- [ ] Verify your video turns off
- [ ] Verify an avatar with your initial appears
- [ ] Click the camera toggle again
- [ ] Verify your video turns back on
- [ ] Verify other participants see your video status change

#### Microphone Testing
- [ ] Verify you can speak and be heard
- [ ] Click the mute button
- [ ] Verify the mute icon appears
- [ ] Verify you're muted (audio track disabled)
- [ ] Click the mute button again
- [ ] Verify you're unmuted
- [ ] Verify other participants see your mute status change

### 3. Multi-Participant Testing

#### Two Participants
- [ ] Open two browser windows
- [ ] Create a meeting in Window 1
- [ ] Copy the Meeting ID
- [ ] Join the meeting from Window 2
- [ ] Verify both video feeds are visible
- [ ] Verify both participants see each other
- [ ] Verify 2-column grid layout

#### Three to Four Participants
- [ ] Open 3-4 browser windows/tabs
- [ ] Join the same meeting from all windows
- [ ] Verify 2x2 grid layout
- [ ] Verify all video feeds are visible
- [ ] Test mute/video on different participants
- [ ] Verify status updates appear on all screens

#### Five to Nine Participants
- [ ] Open 5-9 browser windows/tabs
- [ ] Join the same meeting
- [ ] Verify 3x3 grid layout
- [ ] Test with different devices if available
- [ ] Verify performance is acceptable

### 4. Screen Sharing Testing

#### Start Screen Share
- [ ] Click the screen share button
- [ ] Select "Entire Screen" option
- [ ] Verify screen share permission prompt appears
- [ ] Grant permission
- [ ] Verify your screen appears in the main view
- [ ] Verify participant videos appear as thumbnails below
- [ ] Verify other participants see your screen

#### Window/Tab Share
- [ ] Click screen share button
- [ ] Select "Window" or "Browser Tab"
- [ ] Verify only selected content is shared
- [ ] Verify layout switches to screen share mode

#### Stop Screen Share
- [ ] Click the screen share button again (while sharing)
- [ ] Verify screen sharing stops
- [ ] Verify layout returns to normal grid
- [ ] Verify other participants see the change

### 5. Chat Testing

#### Open Chat
- [ ] Click the chat button in controls
- [ ] Verify chat panel opens on the right
- [ ] Verify empty state message if no messages

#### Send Messages
- [ ] Type a message in the input field
- [ ] Click the send button (or press Enter)
- [ ] Verify your message appears in the chat
- [ ] Verify message shows your name
- [ ] Verify message has a timestamp
- [ ] Send multiple messages
- [ ] Verify auto-scroll to latest message

#### Receive Messages
- [ ] From another window, send a message
- [ ] Verify the message appears in your chat
- [ ] Verify sender's name is displayed
- [ ] Verify messages appear in chronological order

#### Close Chat
- [ ] Click the X button to close chat
- [ ] Verify chat panel closes
- [ ] Click chat button again
- [ ] Verify messages are still there (persistent)

### 6. Participants List Testing

#### Open Participants List
- [ ] Click the participants button
- [ ] Verify participants panel opens
- [ ] Verify you see yourself at the top
- [ ] Verify "(You)" label appears next to your name
- [ ] Verify participant count is correct

#### View Participant Status
- [ ] Verify each participant shows their name
- [ ] Verify mute status icons are accurate
- [ ] Verify video status icons are accurate
- [ ] Verify host badge appears on host
- [ ] From another window, toggle mute
- [ ] Verify icon updates in participants list

#### Mute All (Host Only)
- [ ] As the meeting host, click "Mute All"
- [ ] Verify all other participants are muted
- [ ] Verify other participants see mute notification
- [ ] Verify mute status updates in participant list
- [ ] As a non-host, verify "Mute All" button doesn't appear

### 7. Meeting Controls Testing

#### Meeting ID Copy
- [ ] Locate the Meeting ID in the controls
- [ ] Click the copy button
- [ ] Verify success feedback (icon change)
- [ ] Paste in a text editor
- [ ] Verify correct Meeting ID is copied

#### Leave Meeting
- [ ] Click the "Leave" button
- [ ] Verify you're redirected to the landing page
- [ ] Verify your media streams are stopped
- [ ] From other windows, verify you disappear from the meeting
- [ ] Verify participant count decreases

### 8. Responsive Design Testing

#### Desktop (1920x1080)
- [ ] Verify all elements are properly sized
- [ ] Verify video grid uses full space
- [ ] Verify controls are easily accessible
- [ ] Verify chat and participants panels don't overlap

#### Tablet (768x1024)
- [ ] Resize browser window to tablet size
- [ ] Verify responsive layout adjusts
- [ ] Verify controls remain accessible
- [ ] Verify video grid adjusts properly
- [ ] Test touch interactions if on actual tablet

#### Mobile (375x667)
- [ ] Resize browser window to mobile size
- [ ] Verify layout is usable
- [ ] Verify controls are touch-friendly
- [ ] Verify panels are collapsible
- [ ] Test on actual mobile device if available

### 9. Edge Cases & Error Handling

#### Permission Denied
- [ ] Block camera/microphone permissions
- [ ] Try to join a meeting
- [ ] Verify graceful error handling
- [ ] Verify error message is displayed
- [ ] Grant permissions
- [ ] Refresh and verify it works

#### Network Interruption
- [ ] Disconnect network briefly
- [ ] Verify connection state handling
- [ ] Reconnect network
- [ ] Verify auto-reconnection works
- [ ] Verify meeting continues

#### Invalid Meeting ID
- [ ] Try to join with "INVALID"
- [ ] Verify appropriate handling
- [ ] (Note: Currently allows joining any ID)

#### Empty Meeting
- [ ] Create a meeting
- [ ] Have all participants leave
- [ ] Verify meeting is cleaned up on server
- [ ] Try to join the old meeting ID
- [ ] Verify behavior is correct

#### Browser Compatibility
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Note any browser-specific issues

### 10. Performance Testing

#### Video Quality
- [ ] Observe video quality on good connection
- [ ] Verify video is clear and smooth
- [ ] Check for lag or stuttering
- [ ] Test with 2, 4, 6, 8 participants
- [ ] Note when quality degrades

#### Audio Quality
- [ ] Test audio clarity
- [ ] Verify no echo (echo cancellation working)
- [ ] Verify low latency
- [ ] Test with background noise
- [ ] Verify noise suppression works

#### CPU/Memory Usage
- [ ] Open browser developer tools
- [ ] Check CPU usage in Performance tab
- [ ] Check memory usage
- [ ] Test with multiple participants
- [ ] Verify no memory leaks over time

#### Network Usage
- [ ] Open network tab in developer tools
- [ ] Monitor bandwidth usage
- [ ] Test with different video qualities
- [ ] Note WebSocket message frequency
- [ ] Check for excessive data transfer

## 🐛 Bug Reporting Template

When you find a bug, document it:

```markdown
**Bug Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Number of Participants: 3
- Network: WiFi

**Screenshots/Logs:**
Console errors or screenshots

**Severity:**
Critical / High / Medium / Low
```

## ✅ Test Results Template

Document your testing:

```markdown
**Test Date:** 2025-01-XX
**Tested By:** Your Name
**Environment:** Browser, OS, Network

**Test Results:**
- [x] Feature 1 - PASS
- [x] Feature 2 - PASS
- [ ] Feature 3 - FAIL (see Bug #1)

**Notes:**
Additional observations

**Overall Status:** PASS / FAIL
```

## 🎯 Automated Testing (Future Enhancement)

### Suggested Test Framework
- **Frontend**: Jest + React Testing Library
- **Backend**: Mocha + Chai
- **E2E**: Playwright or Cypress

### Test Coverage Goals
- Unit Tests: 80%+
- Integration Tests: 70%+
- E2E Tests: Critical paths

## 🔍 Debugging Tips

### Client-Side Debugging
```javascript
// Check WebRTC connection state
console.log(peerConnection.connectionState);

// Check local stream tracks
localStream.getTracks().forEach(track => {
  console.log(track.kind, track.enabled);
});

// Check socket connection
console.log(socket.connected);
```

### Server-Side Debugging
```javascript
// Check active meetings
console.log('Active meetings:', meetings.size);

// Check participants
console.log('Active participants:', participants.size);

// Socket.IO debugging
// Add to server startup:
// const io = socketIo(server, { debug: true });
```

### Browser DevTools
- **Console**: Check for errors
- **Network**: Monitor WebSocket messages
- **Application**: Check WebRTC internals (chrome://webrtc-internals)
- **Performance**: Monitor CPU/memory

## 📊 Test Metrics

Track these metrics during testing:

| Metric | Target | Actual |
|--------|--------|--------|
| Join Success Rate | >95% | ___ |
| Video Quality | HD (720p) | ___ |
| Audio Quality | Clear | ___ |
| Latency | <500ms | ___ |
| Screen Share Success | >95% | ___ |
| Chat Message Delivery | 100% | ___ |
| Browser Compatibility | 4/4 | ___ |
| Mobile Usability | Good | ___ |

## 🚨 Known Limitations

Document during testing:

1. **Participant Limit**: Works well up to 8 participants
2. **Browser Support**: Requires modern browser with WebRTC
3. **HTTPS**: Production requires HTTPS for camera access
4. **TURN Server**: May need TURN server for some network configs
5. **Bandwidth**: Requires stable internet connection

## ✨ Testing Best Practices

1. **Test Systematically**: Follow the checklist in order
2. **Document Everything**: Note all issues and observations
3. **Test Edge Cases**: Don't just test happy paths
4. **Use Multiple Browsers**: Test cross-browser compatibility
5. **Test on Real Devices**: Use actual phones/tablets
6. **Test with Real Network**: Try on different connections
7. **Test Continuously**: Re-test after changes
8. **Involve Others**: Get feedback from real users

## 🎉 Ready to Test!

Follow this guide to thoroughly test your VideoConference application. Good luck! 🚀

---

**Remember**: Testing is not about finding perfection, it's about ensuring reliability and great user experience.


