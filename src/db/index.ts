import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Loads environment variables into process.env
dotenv.config();

const environment = process.env.ENVIRONMENT;
const mongoUri =
  environment === 'local' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;

// Connects to mongo database
export const connect = async (): Promise<void> => {
  try {
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the .env file');
    }
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
