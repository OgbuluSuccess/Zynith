import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AppLayout from './components/AppLayout';
import './App.css';

// Import CSS frameworks
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/tailwind.css';

// Lazy load components for better performance
const DashboardNew = lazy(() => import('./pages/DashboardNew'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// These will be implemented later
const Home = lazy(() => import('./pages/Home'));
const Investments = lazy(() => import('./pages/Investments'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Transactions = lazy(() => import('./pages/Transactions'));
const CryptoInvestments = lazy(() => import('./pages/CryptoInvestments'));
const MarketOverview = lazy(() => import('./pages/MarketOverview'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Settings = lazy(() => import('./pages/Settings'));

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Home Page */}
              <Route path="/" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />
              
              {/* Public Routes with Layout */}
              <Route path="/investments" element={
                <AppLayout>
                  <Investments />
                </AppLayout>
              } />
              <Route path="/crypto-investments" element={
                <AppLayout>
                  <CryptoInvestments />
                </AppLayout>
              } />
              <Route path="/market-overview" element={
                <AppLayout>
                  <MarketOverview />
                </AppLayout>
              } />
              <Route path="/about" element={
                <AppLayout>
                  <About />
                </AppLayout>
              } />
              <Route path="/contact" element={
                <AppLayout>
                  <Contact />
                </AppLayout>
              } />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardNew />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Portfolio />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Transactions />
                  </AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              {/* Fallback for unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App
