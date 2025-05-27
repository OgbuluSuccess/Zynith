import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiDollarSign, FiTrendingUp, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface InvestmentFormProps {
  planId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Plan {
  _id: string;
  name: string;
  description: string;
  minimumInvestment: number;
  expectedReturns: string | number;
  duration: number;
  riskLevel: string;
}

interface Wallet {
  balance: number;
  currency: string;
}

interface Returns {
  monthly: number;
  total: number;
  percentage: number;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ planId, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [userWallet, setUserWallet] = useState<Wallet | null>(null);

  // Fetch plan details and user wallet
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use Promise.all to fetch data in parallel
        const [planResponse, userResponse] = await Promise.all([
          api.get(`/investments/${planId}`),
          api.get('/users/wallet')
        ]);
        
        // Log the response for debugging
        console.log('Plan ID:', planId);
        console.log('Plan Response:', planResponse);
        
        // Check the structure of the response and handle accordingly
        setPlan(planResponse.data.data || planResponse.data);
        setUserWallet(userResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load investment plan details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchData();
    } else {
      setLoading(false); // Set loading to false if no planId is provided
    }
  }, [planId]);

  // Calculate potential returns based on investment amount, duration, and expected returns
  const calculatePotentialReturns = (amount: number): Returns => {
    if (!plan || !amount) return { monthly: 0, total: 0, percentage: 0 };
    
    // Extract the percentage from the expected returns string
    const expectedReturnsStr = plan.expectedReturns.toString();
    let expectedReturnsPercent = 0;
    
    // Try to parse the expected returns
    if (expectedReturnsStr) {
      // Extract numbers from the string (e.g., '5-10% annually' -> [5, 10])
      const numbers = expectedReturnsStr.match(/\d+(\.\d+)?/g);
      if (numbers && numbers.length > 0) {
        // If there's a range, take the average
        if (numbers.length > 1) {
          expectedReturnsPercent = (parseFloat(numbers[0]) + parseFloat(numbers[1])) / 2;
        } else {
          expectedReturnsPercent = parseFloat(numbers[0]);
        }
      }
    }
    
    // Calculate returns based on duration (convert annual rate to the investment period)
    const durationInYears = plan.duration / 365;
    const totalReturn = (amount * expectedReturnsPercent * durationInYears) / 100;
    const monthlyReturn = totalReturn / (plan.duration / 30); // Approximate monthly return
    
    return {
      monthly: monthlyReturn,
      total: totalReturn,
      percentage: expectedReturnsPercent * durationInYears
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Please enter a valid investment amount');
      // Show toast message (will implement toast context later)
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Create investment
      const response = await api.post('/investments', {
        planId,
        amount: parseFloat(amount)
      });
      
      setSuccess(true);
      
      // Show success message
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to investments page after a delay
      setTimeout(() => {
        navigate('/investments');
      }, 2000);
    } catch (err: any) {
      console.error('Investment error:', err);
      setError(err.response?.data?.message || 'Failed to process your investment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded-md shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700 font-medium">{error}</p>
            <button 
              onClick={onCancel} 
              className="mt-3 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-md shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiCheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700 font-medium">
              Your investment has been successfully processed! You will be redirected to your investments page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-md shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 font-medium">
              Investment plan not found. Please select a different plan.
            </p>
            <button 
              onClick={onCancel} 
              className="mt-3 text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Your Wallet Balance:</span>
            <span className="text-lg font-bold text-blue-900">
              ${userWallet?.balance.toLocaleString() || '0.00'}
            </span>
          </div>
          <div className="text-xs text-blue-700">
            Make sure you have sufficient funds to invest.
          </div>
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="0.00"
              aria-describedby="amount-currency"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={plan.minimumInvestment}
              step="0.01"
              required
            />
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <FiAlertCircle className="text-blue-500 mr-2 h-4 w-4" />
            <span>Minimum investment: <span className="font-semibold">${plan.minimumInvestment}</span></span>
          </div>
        </div>
        
        {parseFloat(amount) > 0 && (
          <div className="mb-8 p-5 bg-green-50 border border-green-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-green-100 pb-2 flex items-center">
              <FiTrendingUp className="text-green-500 mr-2 h-5 w-5" />
              Potential Returns
            </h3>
            <div className="bg-white p-4 rounded-md shadow-sm mb-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-lg">Investment Amount:</span>
                <span className="text-xl font-bold text-gray-800">${parseFloat(amount).toFixed(2)}</span>
              </div>
              
              {/* Calculate returns based on duration */}
              {(() => {
                const returns = calculatePotentialReturns(parseFloat(amount));
                return (
                  <>
                    <div className="mt-2 border-t border-gray-100 pt-2 flex justify-between items-center">
                      <span className="text-gray-700 text-lg">Investment Period:</span>
                      <span className="text-xl font-bold text-purple-600">{plan.duration} days</span>
                    </div>
                    <div className="mt-2 border-t border-gray-100 pt-2 flex justify-between items-center">
                      <span className="text-gray-700 text-lg">Estimated Monthly Return:</span>
                      <span className="text-xl font-bold text-blue-600">${returns.monthly.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 border-t border-gray-100 pt-2 flex justify-between items-center">
                      <span className="text-gray-700 text-lg">Total Estimated Return:</span>
                      <span className="text-xl font-bold text-green-600">${returns.total.toFixed(2)} ({returns.percentage.toFixed(2)}%)</span>
                    </div>
                  </>
                );
              })()}
            </div>
            <div className="text-sm text-gray-500 flex items-start">
              <FiAlertCircle className="text-blue-500 mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Returns are estimates and not guaranteed. Actual returns may vary based on market conditions.</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-300 w-full md:w-auto"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 w-full md:w-auto"
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Invest Now'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;
