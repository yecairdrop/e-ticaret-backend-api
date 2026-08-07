import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx'; // Context'i import ettik

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bütün uygulamayı CartProvider ile sarmalıyoruz */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);