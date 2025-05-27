import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/mongodb';
import { generateToken } from '../lib/auth';
import { User } from '../models/User';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    const { name, email, password, referralCode } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const userData: any = {
      name,
      email,
      password,
      wallet: {
        balance: 0,
        currency: 'USD'
      },
      totalInvested: 0,
      totalProfit: 0
    };

    // Handle referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        userData.referredBy = referrer._id;
      }
    }

    const user = await User.create(userData);

    // Generate JWT token
    const token = generateToken(user._id.toString(), user.email);

    // Return user data and token
    return res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          referralCode: user.referralCode,
          isAdmin: user.isAdmin
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Error during registration' });
  }
}
