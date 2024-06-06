import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authenContext.jsx'
import jwtInterceptor from '../utils/jwtInterceptor.js'
import { RegisterProvider } from './contexts/registerContext.jsx'

jwtInterceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RegisterProvider>
          <App />
        </RegisterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
