import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BasicPage from './pages/BasicPage'

// Render the basic page directly without any routing or context providers
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasicPage />
  </StrictMode>,
)
