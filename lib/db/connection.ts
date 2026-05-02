// Import DNS setup FIRST before anything else
import '../dns-setup';

import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  if (!cached.promise) {
    // Add DNS resolution options to help with SRV lookups
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      family: 4, // Force IPv4
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    if (process.env.NODE_ENV === 'development') {
      console.log("✅ MongoDB connected successfully");
    }
  } catch (error: any) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", error.message);
    
    // If SRV lookup fails, provide helpful message
    if (error.code === 'ECONNREFUSED' && error.syscall === 'querySrv') {
      console.error("💡 Tip: SRV DNS lookup failed. This might be a DNS/network issue.");
      console.error("   Try: 1) Flush DNS cache, 2) Change DNS to 8.8.8.8, 3) Check Atlas IP whitelist");
    }
    
    throw error;
  }

  return cached.conn;
}
