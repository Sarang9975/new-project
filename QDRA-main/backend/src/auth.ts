// src/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
 // Import the AuthRequest interface

// Ensure JwtPayload is imported from jsonwebtoken

interface AuthRequest extends Request {
  auth?: JwtPayload; // Define the type of 'auth' property based on your JWT payload structure
}
export const checkJwt = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token is used

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    req.auth = decoded; // Assign the decoded JWT payload to 'auth'

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};
