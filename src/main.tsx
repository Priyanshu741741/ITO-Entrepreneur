// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/fonts.css'
import './assets/styles/global.css'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}