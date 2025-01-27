import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContectShare from './contexts/ContectShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContectShare>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ContectShare>
  </StrictMode>,
)
