import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog.html" element={<Catalog />} />
          <Route path="/admin/super-secreto-inventario-titan-x9a8f7b6c5d4e3f2" element={<AdminPanel />} />
        </Routes>
        <CartSidebar />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
