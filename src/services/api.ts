import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

// Types for API responses
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  profileImage?: string;
  wallet?: {
    balance: number;
    totalInvested: number;
    totalProfit: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface InvestmentPlan {
  _id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  duration: string;
  expectedReturns: string;
  risk: string;
  category: string;
  cryptoAsset?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Investment {
  _id: string;
  userId: string;
  planId: string | InvestmentPlan;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  expectedReturn: number;
  currentValue: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  reference?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MarketData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  category: string;
}

// Create an instance of axios with custom config
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service with methods for each endpoint
const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string): Promise<AxiosResponse<{ token: string; user: User }>> => {
      return apiClient.post('/auth/login', { email, password });
    },
    register: (userData: { name: string; email: string; password: string }): Promise<AxiosResponse<{ token: string; user: User }>> => {
      return apiClient.post('/auth/register', userData);
    },
    getCurrentUser: (): Promise<AxiosResponse<User>> => {
      return apiClient.get('/auth/me');
    },
  },
  
  // User endpoints
  users: {
    updateProfile: (userData: Partial<User>): Promise<AxiosResponse<User>> => {
      return apiClient.put('/users/profile', userData);
    },
    updatePassword: (passwordData: { currentPassword: string; newPassword: string }): Promise<AxiosResponse<{ message: string }>> => {
      return apiClient.put('/users/password', passwordData);
    },
    updateNotificationSettings: (settings: any): Promise<AxiosResponse<{ message: string }>> => {
      return apiClient.put('/users/notification-settings', settings);
    },
    updateSecuritySettings: (settings: any): Promise<AxiosResponse<{ message: string }>> => {
      return apiClient.put('/users/security-settings', settings);
    },
    getWallet: (): Promise<AxiosResponse<{ balance: number; totalInvested: number; totalProfit: number }>> => {
      return apiClient.get('/users/wallet');
    },
  },
  
  // Investment plan endpoints
  investmentPlans: {
    getAll: (category?: string): Promise<AxiosResponse<InvestmentPlan[]>> => {
      const query = category ? `?category=${category}` : '';
      return apiClient.get(`/investment-plans${query}`);
    },
    getById: (id: string): Promise<AxiosResponse<InvestmentPlan>> => {
      return apiClient.get(`/investment-plans/${id}`);
    },
  },
  
  // Investment endpoints
  investments: {
    create: (investmentData: { planId: string; amount: number }): Promise<AxiosResponse<Investment>> => {
      return apiClient.post('/investments', investmentData);
    },
    getUserInvestments: (): Promise<AxiosResponse<Investment[]>> => {
      return apiClient.get('/investments/user');
    },
    getById: (id: string): Promise<AxiosResponse<Investment>> => {
      return apiClient.get(`/investments/${id}`);
    },
  },
  
  // Transaction endpoints
  transactions: {
    getAll: (): Promise<AxiosResponse<Transaction[]>> => {
      return apiClient.get('/transactions');
    },
    create: (transactionData: { type: string; amount: number; description: string }): Promise<AxiosResponse<Transaction>> => {
      return apiClient.post('/transactions', transactionData);
    },
  },
  
  // Market data endpoints
  market: {
    getData: (): Promise<AxiosResponse<MarketData[]>> => {
      return apiClient.get('/market-data');
    },
  },
  
  // Contact form
  contact: {
    send: (formData: { name: string; email: string; subject: string; message: string }): Promise<AxiosResponse<{ message: string }>> => {
      return apiClient.post('/contact', formData);
    },
  },
};

export { apiClient };
export default api;
