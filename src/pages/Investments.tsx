import React, { useState, useEffect } from 'react';
import InvestmentCard from '../components/InvestmentCard';
import api from '../services/api';
import type { InvestmentPlan } from '../services/api';

// Using InvestmentPlan interface from api.ts

const Investments: React.FC = () => {
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchInvestmentPlans = async () => {
      try {
        setLoading(true);
        const response = await api.investmentPlans.getAll();
        setInvestmentPlans(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching investment plans:', err);
        setError('Failed to load investment plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentPlans();
  }, []);

  // Filter plans by category
  const filteredPlans = selectedCategory === 'all' 
    ? investmentPlans 
    : investmentPlans.filter(plan => plan.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...new Set(investmentPlans.map(plan => plan.category.toLowerCase()))];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Investment Opportunities</h1>
        <p className="text-lg">Discover our range of investment options tailored to your financial goals</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading investment plans...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <i className="fa fa-exclamation-triangle text-3xl mb-3"></i>
          <p>{error}</p>
        </div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-center py-10">
          <p>No investment plans found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <InvestmentCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Investments;
