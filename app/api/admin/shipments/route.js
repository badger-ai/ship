import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();

  try {
    const bearer = request.headers.get('authorization')?.split(' ')[1];
    if (!bearer) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const shipments = await Shipment.find().populate('userId', 'name email');

    return NextResponse.json({
      success: true,
      shipments
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
