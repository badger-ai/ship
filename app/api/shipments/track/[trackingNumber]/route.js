import dbConnect from '@/lib/dbConnect';
import Shipment from '@/models/Shipment';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const { trackingNumber } = params;
    
    const shipment = await Shipment.findOne({ trackingNumber });
    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      shipment
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}