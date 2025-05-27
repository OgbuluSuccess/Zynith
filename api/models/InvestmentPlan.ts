import mongoose, { Document, Schema } from 'mongoose';

export interface IInvestmentPlan extends Document {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  returnRate: number;
  duration: number;
  riskLevel: 'low' | 'medium' | 'high';
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentPlanSchema = new Schema<IInvestmentPlan>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a plan name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a plan description'],
    },
    minAmount: {
      type: Number,
      required: [true, 'Please provide a minimum investment amount'],
      min: 0,
    },
    maxAmount: {
      type: Number,
      required: [true, 'Please provide a maximum investment amount'],
      min: 0,
    },
    returnRate: {
      type: Number,
      required: [true, 'Please provide a return rate'],
      min: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Please provide a duration in days'],
      min: 1,
    },
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Please provide a risk level'],
    },
    features: [{
      type: String,
      trim: true,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const InvestmentPlan = mongoose.models.InvestmentPlan || 
  mongoose.model<IInvestmentPlan>('InvestmentPlan', InvestmentPlanSchema);
