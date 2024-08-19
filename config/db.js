import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected');
      break;
    } catch (err) {
      retries += 1;
      console.error(`Error connecting to MongoDB (Attempt ${retries}/${maxRetries}):`, err);
      if (retries >= maxRetries) {
        console.error('Max retries reached. Exiting process.');
        process.exit(1);
      }
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

export default connectDB;
