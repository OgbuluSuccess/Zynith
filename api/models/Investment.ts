import mongoose, { Document, Schema } from 'mongoose';

export interface IInvestment extends Document {
  user: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number;
  returnRate: number;
  duration: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled';
  profit: number;
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'InvestmentPlan',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    returnRate: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    profit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate end date based on duration before saving
InvestmentSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('startDate') || this.isModified('duration')) {
    const startDate = new Date(this.startDate);
    this.endDate = new Date(startDate.setDate(startDate.getDate() + this.duration));
  }
  next();
});

export const Investment = mongoose.models.Investment || mongoose.model<IInvestment>('Investment', InvestmentSchema);
