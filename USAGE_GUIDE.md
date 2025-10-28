# 📖 Usage Guide

A visual, step-by-step guide to using the VideoConference application.

## 🚀 Getting Started

### Step 1: Start the Application

Open your terminal and run:

```bash
cd VideoConference
npm run dev
```

Wait for both servers to start:
- ✅ Backend server: http://localhost:5000
- ✅ Frontend app: http://localhost:3000

Your browser will automatically open to the landing page.

---

## 🎬 Using the Application

### Landing Page

When you first open the app, you'll see:

```
┌─────────────────────────────────────────┐
│         🎥 VideoConference              │
│     Connect with anyone, anywhere        │
├─────────────────────────────────────────┤
│                                          │
│  Your Name:  [________________]          │
│                                          │
│  [     Create New Meeting      ]         │
│                                          │
│            ─── or ───                    │
│                                          │
│  Meeting ID: [________________]          │
│                                          │
│  [       Join Meeting          ]         │
│                                          │
└─────────────────────────────────────────┘
```

### Creating a Meeting (Host)

1. **Enter your name**
   - Type your name in the "Your Name" field
   - Example: "John Doe"

2. **Click "Create New Meeting"**
   - A unique Meeting ID will be generated
   - Example: "A3X7K9"

3. **Grant Permissions**
   - Allow camera access
   - Allow microphone access

4. **You're in!**
   - Your video appears
   - Meeting ID is displayed at the bottom
   - You can now share the Meeting ID with others

---

### Joining a Meeting (Participant)

1. **Enter your name**
   - Type your name in the "Your Name" field
   - Example: "Jane Smith"

2. **Enter the Meeting ID**
   - Get the Meeting ID from the host
   - Type it in the "Meeting ID" field
   - Example: "A3X7K9"

3. **Click "Join Meeting"**
   - Grant camera/microphone permissions
   - Wait for connection

4. **You're in!**
   - You'll see the host's video
   - They'll see your video
   - You're now in the meeting

---

## 🎮 Meeting Interface

### Main Meeting View

```
┌─────────────────────────────────────────────────────────────┐
│  Video Grid (Participant Videos)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   [Video]   │  │   [Video]   │  │   [Video]   │        │
│  │  John (You) │  │  Jane Smith │  │  Bob Jones  │        │
│  │     🔇       │  │             │  │     🔇       │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │   [Video]   │  │   [Video]   │                          │
│  │  Alice Lee  │  │  Chris Kim  │                          │
│  └─────────────┘  └─────────────┘                          │
├─────────────────────────────────────────────────────────────┤
│  Meeting ID: A3X7K9 [📋]  [🎤][📹][🖥️][📞]  [👥][💬]     │
└─────────────────────────────────────────────────────────────┘
```

### Controls Bar (Bottom)

```
┌──────────────────────────────────────────────────────────────┐
│ Left Side         │    Center Controls    │   Right Side     │
│                   │                       │                   │
│ Meeting ID: ABC123│   [🎤] [📹] [🖥️]     │   [👥]  [💬]     │
│ [📋 Copy]         │      [📞 Leave]       │                   │
└──────────────────────────────────────────────────────────────┘
```

**Button Guide:**
- 🎤 **Microphone**: Mute/Unmute audio
- 📹 **Camera**: Turn video on/off
- 🖥️ **Screen Share**: Share your screen
- 📞 **Leave**: Exit the meeting
- 👥 **Participants**: View participant list
- 💬 **Chat**: Open chat panel
- 📋 **Copy**: Copy Meeting ID

---

## 🎯 Feature Walkthroughs

### Using Audio Controls

**To Mute Yourself:**
1. Click the microphone button (🎤)
2. Button turns red
3. Your name badge shows mute icon (🔇)
4. Others see you as muted

**To Unmute:**
1. Click the microphone button again
2. Button returns to normal color
3. Mute icon disappears
4. You can speak again

### Using Video Controls

**To Turn Camera Off:**
1. Click the camera button (📹)
2. Button turns red
3. Your video is replaced with your initial avatar
4. Others see your avatar

**To Turn Camera On:**
1. Click the camera button again
2. Button returns to normal color
3. Your video feed appears
4. Others see your video

### Sharing Your Screen

**To Start Screen Sharing:**
1. Click the screen share button (🖥️)
2. Select what to share:
   - **Entire Screen**: Share everything
   - **Window**: Share a specific app
   - **Tab**: Share a browser tab
3. Click "Share"
4. Your screen appears in the main view
5. Participant videos move to thumbnails below

**Your View (When Sharing):**
```
┌─────────────────────────────────────────────┐
│     🖥️ YOUR SHARED SCREEN (Main View)      │
│                                              │
│  [Large view of your shared screen here]    │
│                                              │
└─────────────────────────────────────────────┘
├─────────────────────────────────────────────┤
│ Participant Thumbnails                       │
│ [You] [Jane] [Bob] [Alice] [Chris]          │
└─────────────────────────────────────────────┘
```

**To Stop Sharing:**
1. Click the screen share button again
2. Screen sharing stops
3. View returns to normal grid

### Using the Chat

**To Open Chat:**
1. Click the chat button (💬)
2. Chat panel slides in from the right

**Chat Panel View:**
```
┌─────────────────────────────┐
│ 💬 Chat              [✕]    │
├─────────────────────────────┤
│                             │
│ John Doe          10:30 AM  │
│ Hello everyone!             │
│                             │
│ Jane Smith        10:31 AM  │
│ Hi John! Good to see you.   │
│                             │
│ You               10:32 AM  │
│ Let's get started!          │
│                             │
├─────────────────────────────┤
│ [Type a message...] [Send]  │
└─────────────────────────────┘
```

**To Send a Message:**
1. Type your message in the input field
2. Click "Send" or press Enter
3. Message appears in the chat
4. Everyone receives it instantly

**To Close Chat:**
1. Click the X button at the top
2. Chat panel closes
3. Messages are saved (reopen to see them)

### Viewing Participants

**To Open Participants List:**
1. Click the participants button (👥)
2. Participants panel slides in from the right

**Participants Panel View:**
```
┌─────────────────────────────┐
│ 👥 Participants (5)   [✕]   │
├─────────────────────────────┤
│ [Mute All]  ← (Host only)   │
├─────────────────────────────┤
│                             │
│ 👤 John Doe (You)           │
│    Host          [🎤] [📹] │
│                             │
│ 👤 Jane Smith               │
│                  [🎤] [📹] │
│                             │
│ 👤 Bob Jones                │
│                  [🔇] [📹] │
│                             │
│ 👤 Alice Lee                │
│                  [🎤] [📹] │
│                             │
│ 👤 Chris Kim                │
│                  [🎤] [❌] │
│                             │
└─────────────────────────────┘
```

**Status Icons:**
- 🎤 = Microphone on
- 🔇 = Microphone muted
- 📹 = Camera on
- ❌ = Camera off

**Host Features:**
- **Mute All Button**: Mutes all participants at once
- **Host Badge**: Shows who created the meeting

### Leaving a Meeting

**To Leave:**
1. Click the "Leave" button (red)
2. You're immediately redirected to landing page
3. Your camera and microphone turn off
4. Other participants see you leave
5. Your video disappears from their screen

---

## 💡 Tips & Best Practices

### For Hosts

1. **Share Meeting ID Early**
   - Click the copy button next to Meeting ID
   - Share via email, chat, or text
   - Meeting ID is case-insensitive

2. **Use Mute All When Needed**
   - Great for presentations
   - Reduces background noise
   - Participants can unmute themselves

3. **Monitor Participants**
   - Keep participants panel open
   - Check who has camera/mic on
   - Ensure everyone can participate

### For Participants

1. **Test Before Joining**
   - Check camera works
   - Check microphone works
   - Close unnecessary apps

2. **Mute When Not Speaking**
   - Reduces background noise
   - Improves audio quality for everyone
   - Unmute when you want to speak

3. **Use Chat for Questions**
   - Less disruptive than interrupting
   - Everyone can see the question
   - Host can address when appropriate

### For Everyone

1. **Good Lighting**
   - Face a light source
   - Avoid backlighting
   - Helps others see you clearly

2. **Stable Internet**
   - Use wired connection if possible
   - Close bandwidth-heavy apps
   - Test your speed beforehand

3. **Quiet Environment**
   - Find a quiet room
   - Use headphones if possible
   - Mute when not speaking

4. **Professional Background**
   - Clean, uncluttered space
   - Professional setting
   - Or use a simple background

---

## 🎨 Grid Layout Guide

The video grid automatically adjusts based on participant count:

### 1 Participant (You Alone)
```
┌─────────────────────┐
│                     │
│                     │
│     [Your Video]    │
│                     │
│                     │
└─────────────────────┘
```

### 2 Participants
```
┌──────────┐  ┌──────────┐
│          │  │          │
│  [You]   │  │ [Other]  │
│          │  │          │
└──────────┘  └──────────┘
```

### 3-4 Participants (2×2 Grid)
```
┌──────────┐  ┌──────────┐
│  [You]   │  │ [Person] │
└──────────┘  └──────────┘

┌──────────┐  ┌──────────┐
│ [Person] │  │ [Person] │
└──────────┘  └──────────┘
```

### 5-9 Participants (3×3 Grid)
```
┌──────┐ ┌──────┐ ┌──────┐
│ [1]  │ │ [2]  │ │ [3]  │
└──────┘ └──────┘ └──────┘

┌──────┐ ┌──────┐ ┌──────┐
│ [4]  │ │ [5]  │ │ [6]  │
└──────┘ └──────┘ └──────┘

┌──────┐ ┌──────┐ ┌──────┐
│ [7]  │ │ [8]  │ │ [9]  │
└──────┘ └──────┘ └──────┘
```

### 10+ Participants (4×4 Grid)
```
┌────┐ ┌────┐ ┌────┐ ┌────┐
│[1] │ │[2] │ │[3] │ │[4] │
└────┘ └────┘ └────┘ └────┘
┌────┐ ┌────┐ ┌────┐ ┌────┐
│[5] │ │[6] │ │[7] │ │[8] │
└────┘ └────┘ └────┘ └────┘
┌────┐ ┌────┐ ┌────┐ ┌────┐
│[9] │ │[10]│ │[11]│ │[12]│
└────┘ └────┘ └────┘ └────┘
┌────┐ ┌────┐ ┌────┐ ┌────┐
│[13]│ │[14]│ │[15]│ │[16]│
└────┘ └────┘ └────┘ └────┘
```

---

## ⚠️ Troubleshooting Quick Reference

### Camera Not Working
- ✅ Check browser permissions
- ✅ Close other apps using camera
- ✅ Refresh the page
- ✅ Try a different browser

### Microphone Not Working
- ✅ Check browser permissions
- ✅ Check system settings
- ✅ Make sure you're not muted
- ✅ Try a different browser

### Can't See Other Participants
- ✅ Check internet connection
- ✅ Ask them to turn camera on
- ✅ Refresh the page
- ✅ Check browser console for errors

### Can't Hear Other Participants
- ✅ Check your volume settings
- ✅ Ask them to unmute
- ✅ Check your browser isn't muted
- ✅ Try headphones

### Screen Share Not Working
- ✅ Grant screen share permission
- ✅ Try sharing a specific window
- ✅ Chrome/Firefox work best
- ✅ Refresh and try again

---

## 🎓 Learning the Interface

### First Time Users

**5-Minute Quick Tour:**
1. ⏱️ 0:00-1:00 - Create a meeting
2. ⏱️ 1:00-2:00 - Test mute/video buttons
3. ⏱️ 2:00-3:00 - Try screen sharing
4. ⏱️ 3:00-4:00 - Open chat and send message
5. ⏱️ 4:00-5:00 - View participants list

### Advanced Users

**Power Tips:**
- 💡 Use keyboard shortcuts (if implemented)
- 💡 Pre-join test meeting to check setup
- 💡 Keep participants panel open to monitor
- 💡 Use chat for links and references
- 💡 Share specific window vs entire screen

---

## 📱 Mobile Usage

### Mobile Browser Support

The app works on mobile browsers!

**Best Experience:**
- Use Chrome on Android
- Use Safari on iOS
- Grant permissions when prompted
- Hold phone horizontally for better view

**Mobile Limitations:**
- Smaller video grid
- Simplified controls
- May use more battery
- Requires good signal

---

## 🌟 Getting the Most Out of VideoConference

### Professional Meetings
1. Start 5 minutes early to test
2. Mute when not speaking
3. Use gallery view (default)
4. Share screen for presentations
5. Use chat for Q&A

### Casual Hangouts
1. Keep cameras on
2. Use chat for reactions
3. Share screens to show content
4. More relaxed about muting
5. Have fun!

### Teaching/Training
1. Host controls the meeting
2. Use Mute All feature
3. Share screen for materials
4. Monitor chat for questions
5. Encourage camera use

---

## 🎉 You're Ready!

You now know how to use all features of VideoConference. Happy conferencing! 🎥

**Need More Help?**
- 📖 Check README.md for setup issues
- 🐛 See TESTING_GUIDE.md for detailed testing
- 🏗️ Read ARCHITECTURE.md for technical details
- ✨ Browse FEATURES.md for full feature list

---

**Pro Tip**: Bookmark this guide for quick reference during meetings! 🔖

