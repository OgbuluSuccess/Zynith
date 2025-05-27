import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Check window size to determine if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Routes are now protected through the ProtectedRoute component

  // Check if current route is the home page
  const isHomePage = (): boolean => {
    return location.pathname === '/' || location.pathname === '/home';
  };

  // Check if current route is an admin route
  const isAdminRoute = (): boolean => {
    return location.pathname.startsWith('/admin');
  };

  return (
    <div className="min-h-screen">
      {user ? (
        isHomePage() ? (
          // Home Page Layout (no sidebar even when logged in)
          <>
            <Header />
            <main className="bg-gray-50" style={{ overflowX: 'hidden' }}>
              {children}
            </main>
            <Footer />
          </>
        ) : isAdminRoute() ? (
          // Admin Layout
          <>
            <Sidebar 
              isCollapsed={isSidebarCollapsed} 
              setIsCollapsed={setIsSidebarCollapsed}
              isMobile={isMobile}
            />
            <main 
              className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} bg-gray-50 min-h-screen transition-all duration-300`}
              style={{ overflowX: 'hidden' }}
            >
              {children}
            </main>
          </>
        ) : (
          // User Authenticated Layout (for non-home pages)
          <>
            <Sidebar 
              isCollapsed={isSidebarCollapsed} 
              setIsCollapsed={setIsSidebarCollapsed}
              isMobile={isMobile}
            />
            <div className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
              {/* Header removed from user dashboard as requested */}
              <main className="min-h-screen pt-4 px-6 bg-gray-50" style={{ overflowX: 'hidden' }}>
                {children}
              </main>
              {/* <Footer /> You can add a footer here if needed for authenticated user pages */}
            </div>
          </>
        )
      ) : (
        // Public Layout (for non-logged-in users)
        <>
          <Header />
          <main className="bg-gray-50" style={{ overflowX: 'hidden' }}>
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppLayout;
