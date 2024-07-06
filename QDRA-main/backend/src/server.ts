import express from 'express';
import mongoose from 'mongoose';
import { expressjwt } from 'express-jwt'; // Adjusted import
import jwksRsa from 'jwks-rsa';
import cors from 'cors';
import User from './models/User';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/qdra', {
 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware to validate JWT
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/.well-known/jwks.json',
  }) as any,
  audience: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/api/v2/',
  issuer: 'https://dev-gxhcmoclz7dkosmc.us.auth0.com/',
  algorithms: ['RS256'],
});

app.post('/api/updateCoins', checkJwt, async (req, res) => {
  try {
    const { coins } = req.body;
    const userId = (req as any).auth?.sub; // Extract user ID from JWT token

    const user = await User.findOne({ auth0Id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points += coins;
    await user.save();

    res.json({ updatedPoints: user.points });
  } catch (error) {
    console.error('Error updating coins:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
