// src/routes/auth.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route


export default router;
