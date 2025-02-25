import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter} from 'react-router'
import { ThemeProvider } from './components/Context/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App></App>
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
  
)
