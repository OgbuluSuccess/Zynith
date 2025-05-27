import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/mongodb';
import { verifyToken } from '../lib/auth';
import { InvestmentPlan } from '../models/InvestmentPlan';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to the database
  await connectToDatabase();

  // Handle GET request to fetch all active investment plans
  if (req.method === 'GET') {
    try {
      const plans = await InvestmentPlan.find({ isActive: true }).sort({ minAmount: 1 }).lean();
      
      return res.status(200).json({
        success: true,
        data: plans
      });
    } catch (error) {
      console.error('Error fetching investment plans:', error);
      return res.status(500).json({ message: 'Error fetching investment plans' });
    }
  }
  
  // Handle POST request to create a new investment plan (admin only)
  else if (req.method === 'POST') {
    try {
      // Verify authentication
      const decoded = await verifyToken(req);
      if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Check if user is admin (you would need to implement this check)
      // For now, we'll just create the plan
      
      const { name, description, minAmount, maxAmount, returnRate, duration, riskLevel, features } = req.body;
      
      // Validate input
      if (!name || !description || !minAmount || !maxAmount || !returnRate || !duration || !riskLevel) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
      
      // Create new investment plan
      const plan = await InvestmentPlan.create({
        name,
        description,
        minAmount,
        maxAmount,
        returnRate,
        duration,
        riskLevel,
        features: features || []
      });
      
      return res.status(201).json({
        success: true,
        data: plan
      });
    } catch (error) {
      console.error('Error creating investment plan:', error);
      return res.status(500).json({ message: 'Error creating investment plan' });
    }
  }
  
  // Handle other HTTP methods
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
