import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: 'JWT_SECRET is not defined' }, { status: 500 });
    }

    await dbConnect();
    const bearer = request.headers.get('authorization')?.split(' ')[1];
    if (!bearer) {
      console.error('Missing authorization token');
      return NextResponse.json({ error: 'Missing or invalid authorization token' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(bearer, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded);
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      console.error(`User not found for ID: ${decoded.userId}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Auth Me Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}