import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, referralCode?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken: any = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        } else {
          // Valid token
          setToken(storedToken);
          // Fetch user data
          fetchUserData(storedToken);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken: string) => {
    try {
      console.log(`Fetching user data from: ${API_BASE_URL}/api/users/me`);
      const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      console.log('User data response:', response.data);
      
      // Handle different response structures
      if (response.data) {
        if (response.data.success && response.data.data) {
          // Standard format with success and data fields
          setUser(response.data.data);
        } else if (response.data.user) {
          // User object directly in response data
          setUser(response.data.user);
        } else if (typeof response.data === 'object' && response.data.id) {
          // User object is the response data itself
          setUser(response.data);
        } else {
          console.error('Unexpected user data format:', response.data);
          throw new Error('Invalid user data format');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log(`Attempting to login at: ${API_BASE_URL}/api/auth/login`);
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      
      // Log the full response to see its structure
      console.log('Login response:', response.data);
      
      // Check if response.data contains token directly or in a nested structure
      if (response.data) {
        let authToken;
        let userData;
        
        // Handle different response structures
        if (response.data.token) {
          // Token is directly in response.data
          authToken = response.data.token;
          userData = response.data.user || { 
            email, 
            name: email.split('@')[0],
            id: 'temp-id'
          };
        } else if (response.data.data && response.data.data.token) {
          // Token is in response.data.data
          authToken = response.data.data.token;
          userData = response.data.data.user;
        } else {
          throw new Error('Invalid response format: token not found');
        }
        
        // Store user data and token regardless of subsequent API calls
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
        
        // No need to fetch investment plans here, they'll be fetched in the useEffect
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, referralCode?: string) => {
    try {
      console.log(`Attempting to register at: ${API_BASE_URL}/api/auth/register`);
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { 
        name, 
        email, 
        password,
        referralCode
      });
      
      // Log the full response to see its structure
      console.log('Register response:', response.data);
      
      // Check if response.data contains token directly or in a nested structure
      if (response.data) {
        let authToken;
        let userData;
        
        // Handle different response structures
        if (response.data.token) {
          // Token is directly in response.data
          authToken = response.data.token;
          userData = response.data.user || { 
            email, 
            name,
            id: 'temp-id'
          };
        } else if (response.data.data && response.data.data.token) {
          // Token is in response.data.data
          authToken = response.data.data.token;
          userData = response.data.data.user;
        } else {
          throw new Error('Invalid response format: token not found');
        }
        
        localStorage.setItem('token', authToken);
        setToken(authToken);
        setUser(userData);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
