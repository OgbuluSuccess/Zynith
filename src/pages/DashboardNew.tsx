import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { FiTrendingUp, FiDollarSign, FiUsers, FiPieChart, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import api from '../services/api';
import type { InvestmentPlan, Transaction } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Define types
interface PortfolioData {
  totalInvested: number;
  totalProfit: number;
}

interface ReferralsData {
  count: number;
  earnings: number;
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardNew: React.FC = () => {
  const { user } = useAuth();
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [planError, setPlanError] = useState<string | null>(null);
  
  // State for real-time data
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalInvested: 0,
    totalProfit: 0
  });
  const [referralsData, setReferralsData] = useState<ReferralsData>({
    count: 0,
    earnings: 0
  });
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  
  // App color scheme
  const appColors = {
    primary: '#192a56',
    primaryGradient: 'linear-gradient(to right, #192a56, #1c2e59)',
    secondary: '#21d397',
    secondaryGradient: 'linear-gradient(to right, #21d397 0%, #7450fe 100%)',
    textLight: '#ffffff',
    textDark: '#333333',
    accent: '#f7913a',
    chartColors: {
      bitcoin: '#F7931A',
      ethereum: '#627EEA',
      xrp: '#23292F',
      ltc: '#345D9D',
      zec: '#ECB244'
    }
  };

  // Format number with commas and 2 decimal places
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Get wallet balance from API
  const fetchWalletBalance = async (): Promise<number> => {
    if (!user) return 0;
    
    try {
      const response = await api.users.getWallet();
      return response.data.balance || 0;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      return 0;
    }
  };
  
  // Fetch investment plans
  const fetchInvestmentPlans = async () => {
    try {
      setLoadingPlans(true);
      setPlanError(null);
      
      // Fetch investment plans from API
      const response = await api.investmentPlans.getAll();
      
      if (response.data) {
        setInvestmentPlans(response.data);
      } else {
        setPlanError('No investment plans found');
      }
    } catch (error) {
      console.error('Error fetching investment plans:', error);
      setPlanError('Failed to load investment plans');
    } finally {
      setLoadingPlans(false);
    }
  };
  
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoadingData(true);
      
      // Fetch portfolio data - using investments for now
      const portfolioResponse = await api.investments.getUserInvestments();
      if (portfolioResponse.data) {
        // Calculate portfolio metrics from investments
        const totalInvested = portfolioResponse.data.reduce((sum, inv) => sum + inv.amount, 0);
        const totalProfit = portfolioResponse.data.reduce((sum, inv) => sum + (inv.currentValue || inv.amount * 1.1) - inv.amount, 0);
        
        setPortfolioData({
          totalInvested,
          totalProfit
        });
      }
      
      // Fetch referrals data - mock data for now
      // In a real app, this would be an API call
      setReferralsData({
        count: 5,
        earnings: 250
      });
      
      // Fetch recent transactions
      const transactionsResponse = await api.transactions.getAll();
      if (transactionsResponse.data) {
        // Get the 5 most recent transactions
        const recentTxs = [...transactionsResponse.data]
          .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
          .slice(0, 5);
        
        setRecentTransactions(recentTxs);
      }
      
      // Get wallet balance
      if (user) {
        const balance = await fetchWalletBalance();
        setWalletBalance(balance);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  };
  
  // Chart data for portfolio performance
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [5000, 5200, 5400, 5300, 5600, 6000],
        borderColor: appColors.secondary,
        backgroundColor: 'rgba(33, 211, 151, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchInvestmentPlans();
    fetchDashboardData();
  }, []);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Wallet Balance */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Wallet Balance</h2>
              <div className="bg-blue-50 p-2 rounded-full">
                <FiDollarSign className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${formatNumber(walletBalance)}</p>
                <p className="text-xs text-gray-500 mt-1">Available for investment</p>
              </div>
              <Link to="/deposit" className="text-xs font-medium text-blue-600 hover:text-blue-800">
                Deposit
              </Link>
            </div>
          </div>
          
          {/* Total Invested */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Total Invested</h2>
              <div className="bg-green-50 p-2 rounded-full">
                <FiPieChart className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${formatNumber(portfolioData.totalInvested)}</p>
                <p className="text-xs text-gray-500 mt-1">Active investments</p>
              </div>
              <Link to="/investments" className="text-xs font-medium text-green-600 hover:text-green-800">
                Invest
              </Link>
            </div>
          </div>
          
          {/* Total Profit */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Total Profit</h2>
              <div className="bg-purple-50 p-2 rounded-full">
                <FiTrendingUp className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${formatNumber(portfolioData.totalProfit)}</p>
                <div className="flex items-center mt-1">
                  <FiArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-xs font-medium text-green-500">
                    {portfolioData.totalInvested > 0 
                      ? `${((portfolioData.totalProfit / portfolioData.totalInvested) * 100).toFixed(2)}%` 
                      : '0.00%'}
                  </p>
                </div>
              </div>
              <Link to="/portfolio" className="text-xs font-medium text-purple-600 hover:text-purple-800">
                Details
              </Link>
            </div>
          </div>
          
          {/* Referrals */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">Referrals</h2>
              <div className="bg-orange-50 p-2 rounded-full">
                <FiUsers className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{referralsData.count}</p>
                <p className="text-xs text-gray-500 mt-1">Earnings: ${formatNumber(referralsData.earnings)}</p>
              </div>
              <Link to="/referrals" className="text-xs font-medium text-orange-600 hover:text-orange-800">
                Invite
              </Link>
            </div>
          </div>
        </div>
        
        {/* Portfolio Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Portfolio Performance</h2>
            <div className="flex space-x-2">
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
            </div>
            {loadingData ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-3 text-gray-500">Loading transactions...</p>
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent transactions</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                              transaction.type === 'deposit' ? 'bg-green-100 text-green-800' :
                              transaction.type === 'withdrawal' ? 'bg-red-100 text-red-800' :
                              transaction.type === 'investment' ? 'bg-blue-100 text-blue-800' :
                              transaction.type === 'profit' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            } mr-3`}>
                              {transaction.type === 'deposit' && <FiArrowUp className="h-4 w-4" />}
                              {transaction.type === 'withdrawal' && <FiArrowDown className="h-4 w-4" />}
                              {transaction.type === 'investment' && <FiPieChart className="h-4 w-4" />}
                              {transaction.type === 'profit' && <FiTrendingUp className="h-4 w-4" />}
                            </span>
                            <span className="font-medium text-gray-900">
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            transaction.type === 'deposit' || transaction.type === 'profit' ? 'text-green-600' : 
                            transaction.type === 'withdrawal' ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {transaction.type === 'deposit' || transaction.type === 'profit' ? '+' : 
                             transaction.type === 'withdrawal' ? '-' : ''}
                            ${formatNumber(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.createdAt || '').toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <Link to="/transactions" className="text-sm font-medium text-primary hover:text-primary-dark">
                View all transactions
              </Link>
            </div>
          </div>
          
          {/* Investment Plans */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recommended Plans</h2>
            </div>
            {loadingPlans ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-3 text-gray-500">Loading investment plans...</p>
              </div>
            ) : planError ? (
              <div className="text-center py-8">
                <p className="text-red-500">{planError}</p>
              </div>
            ) : investmentPlans.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No investment plans available</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {investmentPlans.slice(0, 3).map((plan) => (
                  <div key={plan._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-medium text-gray-900">{plan.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        plan.risk === 'low' ? 'bg-green-100 text-green-800' :
                        plan.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        plan.risk === 'high' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800' // Default style
                      }`}>
                        {(plan.risk?.charAt(0).toUpperCase() + plan.risk?.slice(1)) || 'N/A'} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{plan.description}</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Return Rate</span>
                      <span className="font-medium text-gray-900">{plan.expectedReturns ? (String(plan.expectedReturns).endsWith('%') ? plan.expectedReturns : `${plan.expectedReturns}%`) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-900">{plan.duration ? (String(plan.duration).match(/^\d+$/) ? `${plan.duration} days` : plan.duration) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-500">Min Investment</span>
                      <span className="font-medium text-gray-900">${formatNumber(plan.minAmount)}</span>
                    </div>
                    <Link 
                      to={`/investments?plan=${plan._id}`}
                      className="block w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-150 text-sm font-medium"
                    >
                      Invest Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <Link to="/investments" className="text-sm font-medium text-primary hover:text-primary-dark">
                View all investment plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNew;
