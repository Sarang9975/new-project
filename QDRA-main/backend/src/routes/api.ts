// src/routes/api.ts

import express, { Request, Response } from 'express';
import { checkJwt } from '../auth'; // Import your authentication middleware
import User from '../models/User'; // Import your Mongoose User model

import { JwtPayload } from 'jsonwebtoken'; // Ensure JwtPayload is imported from jsonwebtoken

interface AuthRequest extends Request {
  auth?: JwtPayload; // Define the type of 'auth' property based on your JWT payload structure
}
const router = express.Router();

// Example protected route that requires JWT authentication
router.post('/updatePoints', checkJwt, async (req: AuthRequest, res: Response) => {
  try {
    const { auth } = req;
    const { pointsToAdd } = req.body;

    // Ensure auth contains necessary data
    if (!auth || !auth.sub) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Find or create user based on auth.sub (assuming it's the user identifier)
    let user = await User.findOne({ auth0Id: auth.sub });

    if (!user) {
      user = new User({ auth0Id: auth.sub, points: pointsToAdd });
    } else {
      user.points += pointsToAdd;
    }

    await user.save();

    res.status(200).json({ updatedPoints: user.points });
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
