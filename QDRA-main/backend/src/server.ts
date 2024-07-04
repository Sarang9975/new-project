import express from 'express';
import mongoose from 'mongoose';

import User from './models/User';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/qdra', {
 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.post('/api/updateCoins', async (req, res) => {
  try {
    const { coins, userId } = req.body;

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

const PORT = process.env.PORT || 3000; // Ensure this matches the port your frontend expects
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
