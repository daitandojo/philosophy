import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Access gate middleware — only active when ACCESS_GATE_ENABLED=true
// In production (Vercel), the site is fully public.
// For local testing, enable with: ACCESS_GATE_ENABLED=true npm run dev

const GATE_ENABLED = process.env.ACCESS_GATE_ENABLED === 'true'
const ACCESS_CODE = process.env.ACCESS_CODE || '8433'
const ACCESS_COOKIE_NAME = 'hikmatia_access'
const ACCESS_COOKIE_MAX_AGE = 24 * 60 * 60

function isValidAccessToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [code, timestamp] = decoded.split(':')
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    return code === ACCESS_CODE && tokenAge < ACCESS_COOKIE_MAX_AGE * 1000
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  // If gate is disabled, allow all requests
  if (!GATE_ENABLED) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (pathname === '/access' || pathname.startsWith('/api/access')) {
    return NextResponse.next()
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const accessCookie = request.cookies.get(ACCESS_COOKIE_NAME)

  if (accessCookie && isValidAccessToken(accessCookie.value)) {
    return NextResponse.next()
  }

  const accessUrl = new URL('/access', request.url)

  if (pathname !== '/') {
    accessUrl.searchParams.set('redirect', pathname)
  }

  return NextResponse.redirect(accessUrl)
}

export const config = {
  matcher: ['/(.*)'],
}