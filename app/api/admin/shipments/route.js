import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();
  
  try {
    const token = await getToken({ req: request });
    if (!token || token.role !== 'admin') {
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