import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Transaction } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Using Transaction interface from api.ts

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await api.transactions.getAll();
        setTransactions(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load your transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  // Filter transactions by type
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(transaction => transaction.type.toLowerCase() === filter.toLowerCase());

  // Function to determine status color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to determine transaction type icon and color
  const getTransactionTypeInfo = (type: string): { icon: string; color: string } => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return { icon: 'fa-arrow-down', color: 'text-green-600' };
      case 'withdrawal':
        return { icon: 'fa-arrow-up', color: 'text-red-600' };
      case 'investment':
        return { icon: 'fa-chart-line', color: 'text-blue-600' };
      case 'profit':
        return { icon: 'fa-coins', color: 'text-yellow-600' };
      case 'referral':
        return { icon: 'fa-user-friends', color: 'text-purple-600' };
      default:
        return { icon: 'fa-exchange-alt', color: 'text-gray-600' };
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setFilter('deposit')}
          className={`px-4 py-2 rounded-full ${
            filter === 'deposit'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Deposits
        </button>
        <button
          onClick={() => setFilter('withdrawal')}
          className={`px-4 py-2 rounded-full ${
            filter === 'withdrawal'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Withdrawals
        </button>
        <button
          onClick={() => setFilter('investment')}
          className={`px-4 py-2 rounded-full ${
            filter === 'investment'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Investments
        </button>
        <button
          onClick={() => setFilter('profit')}
          className={`px-4 py-2 rounded-full ${
            filter === 'profit'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Profits
        </button>
      </div>

      {/* Transactions List */}
      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your transactions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <i className="fa fa-exclamation-triangle text-3xl mb-3"></i>
          <p>{error}</p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <i className="fa fa-receipt text-4xl text-gray-400 mb-3"></i>
          <h3 className="text-xl font-semibold mb-2">No Transactions Found</h3>
          <p>You don't have any {filter !== 'all' ? filter.toLowerCase() : ''} transactions yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => {
                  const typeInfo = getTransactionTypeInfo(transaction.type);
                  
                  return (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`mr-2 ${typeInfo.color}`}>
                            <i className={`fa ${typeInfo.icon}`}></i>
                          </div>
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {transaction.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          transaction.type.toLowerCase() === 'deposit' || transaction.type.toLowerCase() === 'profit'
                            ? 'text-green-600'
                            : transaction.type.toLowerCase() === 'withdrawal'
                            ? 'text-red-600'
                            : 'text-gray-900'
                        }`}>
                          {transaction.type.toLowerCase() === 'deposit' || transaction.type.toLowerCase() === 'profit'
                            ? '+'
                            : transaction.type.toLowerCase() === 'withdrawal'
                            ? '-'
                            : ''}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(transaction.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{transaction.reference || '-'}</div>
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

export default Transactions;
