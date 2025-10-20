# Live Chat & Video Support Widget - Setup Guide

## Overview

Your British Council website now has a fully functional live chat and video support widget powered by Daily.co. This allows visitors to:

- Start a text chat with support agents
- Escalate to a live video call with one click
- Toggle video/audio during calls
- Seamless integration across all pages

---

## Features

### ✅ Already Implemented

1. **Floating Chat Button** - Appears on all pages with notification badge
2. **Chat Interface** - Clean, modern chat UI with message history
3. **Video Calling** - Integrated Daily.co video calling with:
   - Camera toggle
   - Microphone toggle
   - Screen sharing support
   - Full-screen mode
4. **API Endpoint** - Backend room creation at `/api/create-room`
5. **Responsive Design** - Works on desktop, tablet, and mobile

---

## Setup Instructions

### Step 1: Create a Daily.co Account

1. Visit [https://dashboard.daily.co/](https://dashboard.daily.co/)
2. Sign up for a free account (includes 10,000 minutes/month)
3. Verify your email

### Step 2: Add Payment Method (Required - Still FREE!)

**⚠️ Important:** Daily.co requires a payment method even for the free tier.

1. Log in to [Daily.co Dashboard](https://dashboard.daily.co/)
2. Navigate to **Settings** → **Billing**
3. Click **Add Payment Method**
4. Enter your credit/debit card information
5. **You will NOT be charged** unless you exceed 10,000 minutes/month

**Why is this required?** Daily.co uses it for account verification, similar to AWS, Vercel, etc. The free tier is genuinely free!

### Step 3: Get Your API Key

1. Still in [Daily.co Dashboard](https://dashboard.daily.co/)
2. Navigate to **Developers** in the sidebar
3. Copy your **API Key** (starts with a long string)
4. Keep this secure - you'll need it in the next step

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Daily.co API key:
   ```env
   DAILY_API_KEY=your_actual_api_key_here
   PUBLIC_DAILY_DOMAIN=your-domain.daily.co
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 4: Create a Fallback Room (Optional)

For testing or as a fallback when the API is unavailable:

1. Go to [Daily.co Dashboard](https://dashboard.daily.co/rooms)
2. Click **Create room**
3. Name it `support-room` or similar
4. Set it to **Never expire** (for permanent use)
5. Copy the room URL (e.g., `https://britishcouncil.daily.co/support-room`)
6. Update the fallback URL in `src/components/ChatWidget.astro` line 749

---

## How It Works

### For Customers (Website Visitors)

1. **Chat Button**: Floating blue button in bottom-right corner
2. **Welcome Message**: Opens with greeting and options
3. **Two Options**:
   - **Start Video Call**: Immediately connects to video
   - **Continue with Chat**: Text-based conversation
4. **Easy Switching**: Can switch between chat and video anytime

### For Agents (Support Team)

Agents can join video calls through:

**Option 1: Via Dashboard**
- Log in to [Daily.co Dashboard](https://dashboard.daily.co/)
- View active rooms in **Rooms** section
- Click on room to join

**Option 2: Direct Room Link**
- When a customer starts a video call, the system creates a unique room
- Share this room link with your support agents
- Agents click the link to join the call

**Option 3: Admin Panel (Future Enhancement)**
- Build a custom admin panel to:
  - See incoming chat/video requests
  - Queue management
  - Agent assignment
  - Call history

---

## Testing the Integration

### 1. Test API Endpoint

Visit: `http://localhost:4321/api/create-room`

You should see:
```json
{
  "configured": true,
  "message": "Daily.co API is configured and ready"
}
```

### 2. Test Chat Widget

1. Open your website: `http://localhost:4321`
2. Click the blue chat button in bottom-right
3. Chat window should open with welcome message
4. Type a message and send it

### 3. Test Video Call

1. Click "Start Video Call" button
2. Allow camera/microphone permissions when prompted
3. You should see yourself in the video frame
4. Test camera and microphone toggle buttons
5. Open the same room URL in another browser/device to simulate agent joining

---

## Customization Options

### 1. Change Colors

Edit `src/components/ChatWidget.astro` (around line 267):

```css
/* Change primary color */
background: linear-gradient(135deg, #0066CC 0%, #004C99 100%);

/* Change to your brand color */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #DARKER_SHADE 100%);
```

### 2. Update Welcome Message

Edit `src/components/ChatWidget.astro` (line 57):

```html
<p>Hello! How can we help you today?</p>
<!-- Change to your preferred message -->
```

### 3. Modify Agent Name

Edit `src/components/ChatWidget.astro` (line 29):

```html
<h3>British Council Support</h3>
<!-- Change to your team name -->
```

### 4. Adjust Max Participants

Edit `src/pages/api/create-room.ts` (line 50):

```javascript
max_participants: 2, // Agent + Customer
// Increase for group calls
```

---

## Production Deployment

### Before Going Live:

1. **Update Room Creation Logic**:
   - Remove or update fallback room URL
   - Implement proper error handling
   - Add rate limiting to prevent API abuse

2. **Set Environment Variables** on your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Add `DAILY_API_KEY` and `PUBLIC_DAILY_DOMAIN`

3. **Monitor Usage**:
   - Check Daily.co dashboard for usage metrics
   - Set up alerts for approaching limits
   - Consider upgrading plan if needed

4. **Security Considerations**:
   - Never expose API keys in client-side code
   - Use HTTPS in production
   - Implement authentication for admin features
   - Add CORS protection if needed

---

## Agent Queue System (Future Enhancement)

To add agent availability and queue management:

1. **Backend Database**: Store agent status and queue
2. **WebSocket Connection**: Real-time updates between agents and customers
3. **Admin Dashboard**: Agent interface to manage incoming requests
4. **Notifications**: Alert agents of new chat/video requests

Example structure:
```
/admin/dashboard - Agent login and queue view
/admin/chat/{id} - Respond to specific chat
/admin/video/{roomId} - Join specific video call
```

---

## Troubleshooting

### Error: "account-missing-payment-method"

**This is the most common error!**

**Cause:** Daily.co requires a payment method on file, even for the free tier.

**Solution:**
1. Go to [Daily.co Dashboard](https://dashboard.daily.co/)
2. Click **Settings** → **Billing**
3. Add a credit/debit card
4. Restart your development server
5. Try the video call again

**Demo Mode:** If you see this error, the system automatically switches to demo mode. The chat widget will show a preview screen explaining the setup steps.

### Video call not starting?

- Check that `DAILY_API_KEY` is set in `.env`
- Verify API key is valid at [Daily.co Dashboard](https://dashboard.daily.co/developers)
- **Most important:** Ensure payment method is added to your Daily.co account
- Check browser console for error messages

### Camera/microphone not working?

- Browser must request permissions - click "Allow"
- Check browser settings (Site Settings → Permissions)
- Try a different browser (Chrome, Firefox, Safari supported)
- Ensure HTTPS in production (required for WebRTC)

### Room creation failing?

- Check Daily.co plan limits (10k minutes/month on free tier)
- Verify API key has correct permissions
- Check server logs for detailed error messages
- Test API endpoint: `/api/create-room`

---

## API Endpoints

### `POST /api/create-room`

Creates a new Daily.co room for video calls.

**Response:**
```json
{
  "roomUrl": "https://your-domain.daily.co/room-name",
  "roomName": "room-name",
  "expires": 1234567890,
  "message": "Room created successfully"
}
```

### `GET /api/create-room`

Check if Daily.co API is configured.

**Response:**
```json
{
  "configured": true,
  "message": "Daily.co API is configured and ready"
}
```

---

## Cost Breakdown

### Daily.co Pricing (as of 2024)

- **Free Tier**: 10,000 minutes/month (166 hours)
- **Starter**: $99/month - 100,000 minutes
- **Growth**: $249/month - 250,000 minutes
- **Enterprise**: Custom pricing

**Example Usage**:
- Average call: 15 minutes
- Free tier: ~666 calls/month
- Perfect for small to medium websites

---

## Next Steps

1. ✅ Set up Daily.co account and API key
2. ✅ Test chat and video functionality
3. 📋 Train support team on using the system
4. 📋 Create agent dashboard (optional)
5. 📋 Set up monitoring and analytics
6. 📋 Deploy to production

---

## Support

### Daily.co Resources
- [Documentation](https://docs.daily.co/)
- [API Reference](https://docs.daily.co/reference/rest-api)
- [Support](https://www.daily.co/contact)

### Your Development Team
- For customization or issues, contact your development team
- This implementation is fully open-source and customizable

---

## File Structure

```
src/
├── components/
│   └── ChatWidget.astro          # Main chat widget component
├── config/
│   └── chat.ts                   # Chat configuration
├── layouts/
│   └── Layout.astro             # Updated with chat widget
└── pages/
    └── api/
        └── create-room.ts       # Room creation API

.env                             # Your environment variables (DO NOT COMMIT)
.env.example                     # Example environment file
CHAT_SETUP_GUIDE.md             # This guide
```

---

**Congratulations! 🎉** Your live chat and video support system is ready to go!
