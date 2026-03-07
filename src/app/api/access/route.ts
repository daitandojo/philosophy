import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Access code - in production this should be in environment variables
const ACCESS_CODE = '8433';
const ACCESS_COOKIE_NAME = 'hikmatia_access';
const ACCESS_COOKIE_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

// Helper to create access token (simple hash for demo)
function createAccessToken(): string {
  const timestamp = Date.now();
  return Buffer.from(`${ACCESS_CODE}:${timestamp}`).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    // Validate input
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      );
    }

    // Check access code
    if (code !== ACCESS_CODE) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      );
    }

    // Create access token
    const accessToken = createAccessToken();

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Access granted' },
      { status: 200 }
    );

    // Set access cookie
    response.cookies.set({
      name: ACCESS_COOKIE_NAME,
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ACCESS_COOKIE_MAX_AGE,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Access code validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add a GET endpoint to check if user has access
export async function GET(request: NextRequest) {
  const accessCookie = request.cookies.get(ACCESS_COOKIE_NAME);
  
  if (!accessCookie) {
    return NextResponse.json(
      { hasAccess: false },
      { status: 200 }
    );
  }

  // Validate the token
  try {
    const decoded = Buffer.from(accessCookie.value, 'base64').toString('utf-8');
    const [code, timestamp] = decoded.split(':');
    
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    const maxAgeMs = ACCESS_COOKIE_MAX_AGE * 1000;
    
    const isValid = code === ACCESS_CODE && tokenAge < maxAgeMs;
    
    return NextResponse.json(
      { hasAccess: isValid },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { hasAccess: false },
      { status: 200 }
    );
  }
}