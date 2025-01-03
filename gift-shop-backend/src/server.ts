import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth'; // Importing auth routes
import profileRoutes from './routes/profile'; // Importing profile routes

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI: string = 'mongodb+srv://mekhareju:user123@cluster0.gakd5.mongodb.net/giftShopDB?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Server setup
const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
