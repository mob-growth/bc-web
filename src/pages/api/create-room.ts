// API endpoint to create Daily.co room for video calls
import type { APIRoute } from 'astro';

// Disable prerendering for this API route
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get Daily.co API key from environment variables
    const apiKey = import.meta.env.DAILY_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Daily.co API key not configured',
          message: 'Please add DAILY_API_KEY to your .env file'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create a new Daily.co room
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        privacy: 'public',
        properties: {
          // Room expires in 1 hour
          exp: Math.floor(Date.now() / 1000) + 3600,

          // Enable features
          enable_screenshare: true,
          enable_chat: true,

          // Max participants (adjust as needed)
          max_participants: 10
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Daily.co API error:', errorData);

      return new Response(
        JSON.stringify({
          error: 'Failed to create room',
          message: errorData.error || 'Unknown error from Daily.co API'
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const room = await response.json();

    // Return room details
    return new Response(
      JSON.stringify({
        roomUrl: room.url,
        roomName: room.name,
        expires: room.config?.exp,
        message: 'Room created successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );

  } catch (error) {
    console.error('Error in create-room API:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Optional: GET endpoint to check API status
export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.DAILY_API_KEY;

  return new Response(
    JSON.stringify({
      configured: !!apiKey,
      message: apiKey
        ? 'Daily.co API is configured and ready'
        : 'Daily.co API key not found. Please add DAILY_API_KEY to your .env file'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
