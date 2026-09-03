import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage if desired
  useEffect(() => {
    const saved = localStorage.getItem('titan-cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('titan-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size, flavor) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.flavor === flavor);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, size, flavor, cartItemId: Date.now() }];
    });
    setIsCartOpen(true); // Open the cart sidebar automatically when an item is added
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQ = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQ };
      }
      return item;
    }));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      isCartOpen, setIsCartOpen, cartTotal, itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
