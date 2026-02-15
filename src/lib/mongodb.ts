import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rumi';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export async function checkMongoDBHealth(): Promise<{ healthy: boolean; message: string; latency?: number }> {
  try {
    const start = Date.now();
    await mongoose.connection.db?.admin().ping();
    const latency = Date.now() - start;
    return { healthy: true, message: 'MongoDB connected', latency };
  } catch (error) {
    return { healthy: false, message: `MongoDB error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

export default connectDB;
