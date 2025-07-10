import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function PUT(request, { params }) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'MONGODB_URI is not defined' }, { status: 500 });
  }
  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ error: 'JWT_SECRET is not defined' }, { status: 500 });
  }

  await dbConnect();

  try {
    const bearer = request.headers.get('authorization')?.split(' ')[1];
    if (!bearer) {
      return NextResponse.json({ error: 'Missing or invalid authorization token' }, { status: 401 });
    }

    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { status, location, description } = await request.json();

    if (!status || !location || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const shipment = await Shipment.findByIdAndUpdate(
      id,
      {
        $set: { status },
        $push: {
          history: {
            status,
            location,
            description,
            date: new Date(),
          }
        }
      },
      { new: true }
    );

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, shipment });

  } catch (error) {
    console.error('Shipment Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}