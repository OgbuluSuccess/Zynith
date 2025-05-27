import mongoose from 'mongoose';

let cachedDb: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zenthy';

  try {
    const db = await mongoose.connect(MONGODB_URI);
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
