import mongoose from 'mongoose';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in the environment.');
  }

  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  console.log(`Connecting to MongoDB: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    if (mongoUri.startsWith('mongodb+srv://')) {
      console.error(
        'Atlas connection failed. Check your username/password, add a database name to MONGODB_URI, and allow your current IP in MongoDB Atlas Network Access.',
      );
    }

    throw error;
  }
}
