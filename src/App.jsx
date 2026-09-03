import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog.html" element={<Catalog />} />
        </Routes>
        <CartSidebar />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
