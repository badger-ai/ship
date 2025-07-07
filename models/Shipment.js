import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    name: String,
    address: String,
    email: String,
    phone: String
  },
  receiver: {
    name: String,
    address: String,
    email: String,
    phone: String
  },
  package: {
    description: String,
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    value: Number
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in-transit', 'delivered'],
    default: 'pending'
  },
  history: [{
    status: String,
    location: String,
    date: Date,
    description: String
  }],
  estimatedDelivery: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.models.Shipment || mongoose.model('Shipment', shipmentSchema);