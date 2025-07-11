import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
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

    const shipment = await Shipment.findById(params.id);
    if (!shipment) {
      console.error(`Shipment not found: ${params.id}`);
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    console.log('Shipment fetched:', params.id);
    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error('Error fetching shipment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
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

    const data = await request.json();
    const shipment = await Shipment.findByIdAndUpdate(params.id, data, { new: true });
    if (!shipment) {
      console.error(`Shipment not found: ${params.id}`);
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    console.log('Shipment updated:', params.id);
    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    console.error('Error updating shipment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}