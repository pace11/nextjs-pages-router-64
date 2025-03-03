import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('X-API-KEY', 'API_KEY_TEST')
  return res
}

export const config = {
  matcher: '/:path*',
}
