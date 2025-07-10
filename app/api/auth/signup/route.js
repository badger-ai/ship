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
    const { name, email, password } = await request.json();
    console.log('Signup attempt:', { email });

    if (!name || !email || !password) {
      console.error('Missing required fields');
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error(`User already exists: ${email.toLowerCase()}`);
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({ name, email: email.toLowerCase(), password, role: 'user' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('User created:', { userId: user._id, email: user.email });
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}