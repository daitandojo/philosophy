import { NextResponse } from 'next/server'

export function middleware() {
  return new NextResponse('Under construction - Please check back later', { status: 403 })
}
