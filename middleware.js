import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // Allow auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Protect API routes
  if (pathname.startsWith('/api')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check for admin routes
    if (pathname.startsWith('/api/admin') && token.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token && (pathname.startsWith('/account') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}