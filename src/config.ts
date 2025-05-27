// Environment-specific configuration
const isDevelopment = import.meta.env.DEV;

// API configuration
const apiConfig = {
  baseUrl: isDevelopment 
    ? import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    : '/api',
};

// Application configuration
const appConfig = {
  name: 'Zenthy Investment Platform',
  description: 'A modern investment platform for growing your wealth',
  version: '1.0.0',
};

// Authentication configuration
const authConfig = {
  tokenKey: 'token',
  tokenExpiry: '7d',
};

// Export configuration
export default {
  api: apiConfig,
  app: appConfig,
  auth: authConfig,
  isDevelopment,
};
