import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await request.json();
    
    // Generate tracking number
    const trackingNumber = generateTrackingNumber();
    
    // Create shipment
    const shipment = await Shipment.create({
      ...data,
      trackingNumber,
      userId: decoded.userId,
      status: 'pending',
      history: [{
        status: 'pending',
        location: data.sender.address,
        description: 'Package received',
        date: new Date()
      }]
    });
    
    return NextResponse.json({ 
      success: true,
      shipment,
      trackingNumber
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateTrackingNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}