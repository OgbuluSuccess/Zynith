import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Investment } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Using Investment interface from api.ts

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalCurrentValue: 0,
    totalProfit: 0,
    averageReturn: 0
  });

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await api.investments.getUserInvestments();
        setInvestments(response.data);
        
        // Calculate portfolio stats
        const totalInvested = response.data.reduce((sum: number, inv: Investment) => sum + inv.amount, 0);
        const totalCurrentValue = response.data.reduce((sum: number, inv: Investment) => sum + inv.currentValue, 0);
        const totalProfit = totalCurrentValue - totalInvested;
        const averageReturn = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
        
        setStats({
          totalInvested,
          totalCurrentValue,
          totalProfit,
          averageReturn
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching investments:', err);
        setError('Failed to load your portfolio. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchInvestments();
    }
  }, [user]);

  // Function to determine status color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Investment Portfolio</h1>
      
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Invested</h3>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalInvested)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Current Value</h3>
          <p className="text-2xl font-bold">{formatCurrency(stats.totalCurrentValue)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Profit/Loss</h3>
          <p className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(stats.totalProfit)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Return</h3>
          <p className={`text-2xl font-bold ${stats.averageReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.averageReturn.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Investments List */}
      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your investments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <i className="fa fa-exclamation-triangle text-3xl mb-3"></i>
          <p>{error}</p>
        </div>
      ) : investments.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <i className="fa fa-folder-open text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-xl font-semibold mb-2">No Investments Yet</h3>
          <p className="mb-4">You haven't made any investments yet. Explore our investment options to get started.</p>
          <a href="/investments" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
            Explore Investments
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit/Loss
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((investment) => {
                  const profit = investment.currentValue - investment.amount;
                  const profitPercentage = (profit / investment.amount) * 100;
                  
                  return (
                    <tr key={investment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 mb-1">{typeof investment.planId === 'string' ? 'Investment Plan' : investment.planId.name}</div>
                        <div className="text-xs text-gray-500">{typeof investment.planId === 'string' ? '' : investment.planId.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(investment.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(investment.currentValue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(profit)} ({profitPercentage.toFixed(2)}%)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(investment.startDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(investment.status)}`}>
                          {investment.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
