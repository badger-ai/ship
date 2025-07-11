import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(bearer, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        console.error('User is not an admin:', decoded.userId);
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const shipments = await Shipment.find();
    console.log('Shipments fetched:', shipments.length);
    return NextResponse.json({ success: true, shipments });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}