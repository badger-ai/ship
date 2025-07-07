// lib/dbConnect.js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the .env file')
}

if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error('MONGODB_URI must start with "mongodb://" or "mongodb+srv://"')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log('Connecting to MongoDB with URI:', MONGODB_URI)
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected')
      return mongoose
    }).catch((error) => {
      console.error('MongoDB connection error:', error)
      throw error
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect