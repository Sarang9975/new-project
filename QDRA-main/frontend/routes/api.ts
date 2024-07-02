// routes/api.ts
import express, { Request, Response } from 'express';
import User from '../src/models/User';
import checkJwt from '../src/middleware/auth';

const router = express.Router();

router.post('/api/updateCoins', checkJwt, async (req: Request & { auth?: any }, res: Response) => {
  const { coins } = req.body;
  const userId = req.auth?.sub; // Auth0 user ID from token

  try {
    const user = await User.findOne({ auth0Id: userId });
    if (user) {
      user.coins += coins;
      await user.save();
      res.json({ updatedPoints: user.coins });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating coins' });
  }
});

export default router;
