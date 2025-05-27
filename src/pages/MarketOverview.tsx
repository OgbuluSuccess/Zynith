import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { MarketData } from '../services/api';

// Using MarketData interface from api.ts

const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await api.market.getData();
        setMarketData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data. Please try again later.');
        // Use mock data for demonstration
        setMarketData([
          {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: 43250.65,
            change24h: 2.4,
            marketCap: 820500000000,
            volume24h: 28500000000,
            category: 'crypto'
          },
          {
            name: 'Ethereum',
            symbol: 'ETH',
            price: 3150.22,
            change24h: 1.8,
            marketCap: 378000000000,
            volume24h: 15200000000,
            category: 'crypto'
          },
          {
            name: 'Apple Inc.',
            symbol: 'AAPL',
            price: 175.84,
            change24h: -0.3,
            marketCap: 2850000000000,
            volume24h: 8500000000,
            category: 'stocks'
          },
          {
            name: 'Microsoft',
            symbol: 'MSFT',
            price: 325.42,
            change24h: 0.8,
            marketCap: 2420000000000,
            volume24h: 6800000000,
            category: 'stocks'
          },
          {
            name: 'Gold',
            symbol: 'XAU',
            price: 1925.60,
            change24h: 0.2,
            marketCap: 0,
            volume24h: 0,
            category: 'commodities'
          },
          {
            name: 'Silver',
            symbol: 'XAG',
            price: 23.75,
            change24h: 0.5,
            marketCap: 0,
            volume24h: 0,
            category: 'commodities'
          },
          {
            name: 'US 10Y Treasury',
            symbol: 'US10Y',
            price: 4.25,
            change24h: -0.1,
            marketCap: 0,
            volume24h: 0,
            category: 'bonds'
          },
          {
            name: 'US Dollar Index',
            symbol: 'DXY',
            price: 102.35,
            change24h: -0.2,
            marketCap: 0,
            volume24h: 0,
            category: 'forex'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Filter market data by category
  const filteredData = filter === 'all' 
    ? marketData 
    : marketData.filter(item => item.category === filter);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format large numbers (billions, millions)
  const formatLargeNumber = (num: number): string => {
    if (num === 0) return 'N/A';
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return formatCurrency(num);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Market Overview</h1>
        <p className="text-lg">Stay updated with the latest market trends and investment opportunities</p>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Global Market Cap</h3>
          <p className="text-2xl font-bold">$92.4T</p>
          <p className="text-green-600 text-sm">
            <i className="fa fa-arrow-up mr-1"></i>
            <span>1.2% (24h)</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Crypto Market Cap</h3>
          <p className="text-2xl font-bold">$1.8T</p>
          <p className="text-green-600 text-sm">
            <i className="fa fa-arrow-up mr-1"></i>
            <span>2.5% (24h)</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">S&P 500</h3>
          <p className="text-2xl font-bold">4,782.65</p>
          <p className="text-red-600 text-sm">
            <i className="fa fa-arrow-down mr-1"></i>
            <span>0.3% (24h)</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Gold Price</h3>
          <p className="text-2xl font-bold">$1,925.60</p>
          <p className="text-green-600 text-sm">
            <i className="fa fa-arrow-up mr-1"></i>
            <span>0.2% (24h)</span>
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Markets
        </button>
        <button
          onClick={() => setFilter('crypto')}
          className={`px-4 py-2 rounded-full ${
            filter === 'crypto'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cryptocurrencies
        </button>
        <button
          onClick={() => setFilter('stocks')}
          className={`px-4 py-2 rounded-full ${
            filter === 'stocks'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Stocks
        </button>
        <button
          onClick={() => setFilter('commodities')}
          className={`px-4 py-2 rounded-full ${
            filter === 'commodities'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Commodities
        </button>
        <button
          onClick={() => setFilter('bonds')}
          className={`px-4 py-2 rounded-full ${
            filter === 'bonds'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Bonds
        </button>
        <button
          onClick={() => setFilter('forex')}
          className={`px-4 py-2 rounded-full ${
            filter === 'forex'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Forex
        </button>
      </div>

      {/* Market Data Table */}
      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading market data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <i className="fa fa-exclamation-triangle text-3xl mb-3"></i>
          <p>{error}</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-10">
          <p>No market data available for the selected category.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Volume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 ml-2">{item.symbol}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.category === 'bonds' || item.category === 'forex' 
                          ? item.price.toFixed(2) 
                          : formatCurrency(item.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${item.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <i className={`fa fa-arrow-${item.change24h >= 0 ? 'up' : 'down'} mr-1`}></i>
                        <span>{Math.abs(item.change24h).toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatLargeNumber(item.marketCap)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatLargeNumber(item.volume24h)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Market Insights</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium">Global Markets Outlook</h3>
              <p className="text-gray-600">Markets continue to show resilience despite economic uncertainties. Investors are cautiously optimistic about growth prospects in the coming quarters.</p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium">Cryptocurrency Trends</h3>
              <p className="text-gray-600">Bitcoin and other major cryptocurrencies are showing signs of recovery after recent volatility. Institutional adoption continues to drive long-term growth.</p>
            </div>
            <div>
              <h3 className="font-medium">Commodities Update</h3>
              <p className="text-gray-600">Gold remains a safe haven asset amid inflation concerns. Energy prices are stabilizing as supply chain issues are gradually being resolved.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Investment Opportunities</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium">Tech Sector Growth</h3>
              <p className="text-gray-600">Technology companies continue to lead market growth, with AI and cloud services showing particularly strong potential for investors.</p>
            </div>
            <div className="border-b pb-3">
              <h3 className="font-medium">Emerging Markets</h3>
              <p className="text-gray-600">Certain emerging markets are presenting attractive valuations for long-term investors willing to navigate short-term volatility.</p>
            </div>
            <div>
              <h3 className="font-medium">Sustainable Investments</h3>
              <p className="text-gray-600">ESG-focused investments are gaining momentum as more investors prioritize sustainability alongside financial returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
