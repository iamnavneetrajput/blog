import express from 'express';
import connectDB from '../config/db.js'; // Import the database connection module
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import categoryRoutes from'./routes/categoryRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config(); // Ensure .env is in the root directory

console.log("MONGO_URI:", process.env.MONGO_URI); // Verify MONGO_URI

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(helmet()); // Security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);


// Connect to MongoDB
connectDB();

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await mongoose.disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
