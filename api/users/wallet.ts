import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/mongodb';
import { verifyToken } from '../lib/auth';
import { User } from '../models/User';

// Define interface for user document with wallet properties
interface UserDocument {
  _id: string;
  wallet?: {
    balance: number;
    currency?: string;
  };
  totalInvested?: number;
  totalProfit?: number;
  [key: string]: any;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Verify authentication
    const decoded = await verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get user wallet data
    const user = await User.findById(decoded.userId).lean() as UserDocument;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return wallet data with safe property access
    return res.status(200).json({
      success: true,
      data: {
        balance: user.wallet && typeof user.wallet === 'object' ? (user.wallet.balance || 0) : 0,
        totalInvested: typeof user.totalInvested === 'number' ? user.totalInvested : 0,
        totalProfit: typeof user.totalProfit === 'number' ? user.totalProfit : 0
      }
    });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return res.status(500).json({ message: 'Error fetching wallet data' });
  }
}
