import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Access code - in production this should be in environment variables
const ACCESS_CODE = '8433'
const ACCESS_COOKIE_NAME = 'hikmatia_access'
const ACCESS_COOKIE_MAX_AGE = 24 * 60 * 60 // 24 hours in seconds

// Helper to validate access token
function isValidAccessToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [code, timestamp] = decoded.split(':')
    
    // Check if code is valid and token is not expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    const maxAgeMs = ACCESS_COOKIE_MAX_AGE * 1000
    
    return code === ACCESS_CODE && tokenAge < maxAgeMs
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access to the access page itself and API routes
  if (pathname === '/access' || pathname.startsWith('/api/access')) {
    return NextResponse.next()
  }
  
  // Allow access to static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check for valid access cookie
  const accessCookie = request.cookies.get(ACCESS_COOKIE_NAME)
  
  if (accessCookie && isValidAccessToken(accessCookie.value)) {
    // Valid access token, allow request
    return NextResponse.next()
  }
  
  // No valid access, redirect to access page
  const accessUrl = new URL('/access', request.url)
  
  // Preserve the original URL for redirect after successful access
  if (pathname !== '/') {
    accessUrl.searchParams.set('redirect', pathname)
  }
  
  return NextResponse.redirect(accessUrl)
}

// Configure which routes the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths
     * We'll handle static file exclusion in the middleware logic
     */
    '/(.*)',
  ],
}