// Chat & Video Configuration
// For Daily.co integration

export const chatConfig = {
  // Daily.co configuration
  daily: {
    // Add your Daily.co API key here
    // Get one at: https://dashboard.daily.co/
    apiKey: import.meta.env.PUBLIC_DAILY_API_KEY || '',

    // Daily.co domain (e.g., 'your-domain.daily.co')
    domain: import.meta.env.PUBLIC_DAILY_DOMAIN || '',
  },

  // Chat settings
  settings: {
    welcomeMessage: 'Hello! How can we help you today?',
    agentName: 'British Council Support',
    autoShowNotification: true,
    enableVideoCall: true,
    enableScreenShare: true,
  },

  // Agent availability (you can connect this to a real backend)
  agent: {
    available: true,
    averageResponseTime: '2 minutes',
  }
};

// Room creation function (server-side only)
// You'll need to implement this on your backend
export async function createDailyRoom(apiKey: string): Promise<{ url: string; name: string } | null> {
  if (!apiKey) {
    console.warn('Daily.co API key not configured');
    return null;
  }

  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        properties: {
          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
          enable_screenshare: true,
          enable_chat: true,
          enable_knocking: true,
          start_video_off: false,
          start_audio_off: false,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    const room = await response.json();
    return {
      url: room.url,
      name: room.name
    };
  } catch (error) {
    console.error('Error creating Daily.co room:', error);
    return null;
  }
}
