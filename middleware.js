import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const tokenHeader = req.headers.get('authorization');
  const token = tokenHeader?.split(' ')[1];

  let decoded = null;

  // Try decoding token if available
  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      decoded = null;
    }
  }

  // Allow public auth routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Protect all API routes
  if (pathname.startsWith('/api')) {
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (pathname.startsWith('/api/admin') && decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.next();
  }

  // Redirect pages like /account or /admin if not logged in
  if (!decoded && (pathname.startsWith('/account') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
