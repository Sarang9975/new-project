import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User"; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/qdra", {
      // Ensure useCreateIndex is set to true for index management
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectDB();
app.get('/test', (req, res) => {
  res.send('API is working');
});

app.post("/api/updateCoins", async (req, res) => {
  try {
    const { coins, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({ auth0Id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.points += coins;
    await user.save();

    res.json({ updatedPoints: user.points });
  } catch (error) {
    console.error("Error updating coins:", error);
    res.status(500).json({ message: "Server error" });
  }
});
const PORT = process.env.PORT || 3000; // Ensure this matches the port your frontend expects
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
