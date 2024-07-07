import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth'; // Adjust the path as necessary
import { authenticateToken, AuthRequest } from './middleware/authMiddleware'; // Adjust the path as necessary
import UserModel from './models/User'; // Adjust the path as necessary

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
  
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a route to get user info
app.use('/api/auth', authRoutes); // Example for authentication routes
app.get('/api/user', authenticateToken, (req, res) => {
  // Handle user endpoint with authentication middleware
  res.send('User information');
});

// Routes
app.use('/api/auth', authRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
