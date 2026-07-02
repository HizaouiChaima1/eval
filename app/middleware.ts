import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { getSessionCookieName } from '@/lib/auth'

const protectedRoutes = ['/tasks']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const token = request.cookies.get(getSessionCookieName())?.value
  const secret = process.env.AUTH_SECRET

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/tasks/:path*'],
}
