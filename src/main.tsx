import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { AlertProvider } from '@providers/Alert-system.tsx'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>
)
