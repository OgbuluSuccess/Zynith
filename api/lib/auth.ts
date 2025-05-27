import { VercelRequest } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function generateToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyToken(req: VercelRequest): Promise<JwtPayload | null> {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}
