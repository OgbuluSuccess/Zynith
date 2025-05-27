import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected route component that redirects to login if user is not authenticated
const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated, otherwise render the protected component
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
