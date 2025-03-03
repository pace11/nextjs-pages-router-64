import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/blog/')) {
    const newUrl = req.nextUrl.pathname.replace('/blog/', '/articles/')
    return NextResponse.rewrite(new URL(newUrl, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/blog/:path*',
}
