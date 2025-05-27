import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  type: 'deposit' | 'withdrawal' | 'investment' | 'profit' | 'referral';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'investment', 'profit', 'referral'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || 
  mongoose.model<ITransaction>('Transaction', TransactionSchema);
