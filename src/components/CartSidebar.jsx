import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex justify-end font-sans">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-200">
          <h2 className="font-serif font-black text-xl md:text-2xl uppercase tracking-tighter text-zinc-900">Tu Carrito</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        
        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-zinc-500 mt-20 font-medium text-sm">
              Tu carrito está vacío.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map(item => (
                <div key={item.cartItemId} className="flex gap-4">
                  {/* Item Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-100 shrink-0 border border-zinc-200 rounded-sm overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-xs md:text-sm uppercase leading-tight text-zinc-900">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)} 
                        className="text-zinc-400 hover:text-red-500 transition-colors ml-2 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold tracking-wider mb-2 uppercase">
                      {item.flavor} | {item.size}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-200 h-7 md:h-8 rounded-sm overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, -1)} 
                          className="w-7 md:w-8 h-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 md:w-8 text-center text-xs font-bold text-zinc-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, 1)} 
                          className="w-7 md:w-8 h-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Item Total Price */}
                      <span className="font-bold text-sm text-brand-accent">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 md:p-6 border-t border-zinc-200 bg-zinc-50">
            <div className="flex justify-between items-center mb-5 md:mb-6">
              <span className="font-bold uppercase tracking-wider text-xs md:text-sm text-zinc-500">Total</span>
              <span className="font-black text-xl md:text-2xl text-zinc-900">${cartTotal.toLocaleString('es-CO')}</span>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-brand-accent hover:bg-red-700 text-white font-bold uppercase tracking-[0.2em] py-3.5 md:py-4 text-[10px] md:text-[11px] rounded-sm shadow-md transition-colors"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>,
    document.body
  );
}
