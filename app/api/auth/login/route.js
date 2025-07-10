import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

export async function POST(request) {
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
    const { email, password } = await request.json();
    console.log('Login attempt:', { email });

    if (!email || !password) {
      console.error('Missing email or password');
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error(`User not found for email: ${email.toLowerCase()}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.error(`Invalid password for user: ${email.toLowerCase()}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Login successful:', { userId: user._id, email: user.email });
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}