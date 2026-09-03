import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SavedJobsProvider } from './context/SavedJobsContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <SavedJobsProvider>
        <App />
      </SavedJobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
