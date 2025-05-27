import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { InvestmentPlan } from '../services/api';
import InvestmentCard from '../components/InvestmentCard';

// Using InvestmentPlan interface from api.ts

const CryptoInvestments: React.FC = () => {
  const [cryptoPlans, setCryptoPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string>('all');

  useEffect(() => {
    const fetchCryptoPlans = async () => {
      try {
        setLoading(true);
        const response = await api.investmentPlans.getAll('cryptocurrency');
        setCryptoPlans(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching crypto investment plans:', err);
        setError('Failed to load cryptocurrency investment plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoPlans();
  }, []);

  // Get unique crypto assets
  const cryptoAssets = ['all', ...new Set(cryptoPlans.map(plan => plan.cryptoAsset || 'other'))];

  // Filter plans by crypto asset
  const filteredPlans = selectedAsset === 'all' 
    ? cryptoPlans 
    : cryptoPlans.filter(plan => plan.cryptoAsset === selectedAsset);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Cryptocurrency Investments</h1>
        <p className="text-lg">Explore our cryptocurrency investment options with various risk levels and returns</p>
      </div>

      {/* Crypto Asset Filter */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {cryptoAssets.map((asset) => (
          <button
            key={asset}
            onClick={() => setSelectedAsset(asset)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedAsset === asset
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {asset}
          </button>
        ))}
      </div>

      {/* Crypto Market Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cryptocurrency Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Bitcoin (BTC)</p>
                <p className="text-xl font-bold">$43,250.65</p>
              </div>
              <div className="text-green-600">
                <i className="fa fa-arrow-up mr-1"></i>
                <span>2.4%</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ethereum (ETH)</p>
                <p className="text-xl font-bold">$3,150.22</p>
              </div>
              <div className="text-green-600">
                <i className="fa fa-arrow-up mr-1"></i>
                <span>1.8%</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Binance Coin (BNB)</p>
                <p className="text-xl font-bold">$412.75</p>
              </div>
              <div className="text-red-600">
                <i className="fa fa-arrow-down mr-1"></i>
                <span>0.5%</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cardano (ADA)</p>
                <p className="text-xl font-bold">$1.25</p>
              </div>
              <div className="text-green-600">
                <i className="fa fa-arrow-up mr-1"></i>
                <span>3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Plans */}
      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading cryptocurrency investment plans...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <i className="fa fa-exclamation-triangle text-3xl mb-3"></i>
          <p>{error}</p>
        </div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-center py-10">
          <p>No cryptocurrency investment plans found for {selectedAsset}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <InvestmentCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}

      {/* Educational Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Understanding Cryptocurrency Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Benefits of Crypto Investments</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Potential for high returns</li>
              <li>Portfolio diversification</li>
              <li>24/7 market operations</li>
              <li>Blockchain technology innovation exposure</li>
              <li>Global accessibility</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Risks to Consider</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>High volatility</li>
              <li>Regulatory uncertainties</li>
              <li>Security concerns</li>
              <li>Market manipulation risks</li>
              <li>Technical complexity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInvestments;
