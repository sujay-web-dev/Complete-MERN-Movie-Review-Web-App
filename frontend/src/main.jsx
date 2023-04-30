import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeProvider';
import NotificationProvider from './context/NotificationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NotificationProvider>

    </BrowserRouter>
  </React.StrictMode>,
)
