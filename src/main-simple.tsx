import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import BasicPage from './pages/BasicPage'

// Import pages to test one by one
// We'll uncomment these one at a time to test
import Home from './pages/SimplifiedHome' // Using SimplifiedHome first as it's simpler
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Investments from './pages/Investments'

// Simple test harness to switch between pages
const TestHarness = () => {
  // Set which page to test - we'll start with the basic working page
  // 'basic' | 'home' | 'login' | 'register' | 'investments'
  const [currentPage, setCurrentPage] = useState('basic')
  
  // Get the page from URL if specified
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    if (page) {
      setCurrentPage(page)
    }
  }, [])
  
  // Render the selected page
  const renderPage = () => {
    switch(currentPage) {
      case 'basic':
        return <BasicPage />
      // Testing one by one
      case 'home':
        return <Home />
      // case 'login':
      //   return <Login />
      // case 'register':
      //   return <Register />
      // case 'investments':
      //   return <Investments />
      default:
        return <BasicPage />
    }
  }
  
  return (
    <div>
      {renderPage()}
    </div>
  )
}

// Render the test harness
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestHarness />
  </StrictMode>,
)
