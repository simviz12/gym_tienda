import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'Transferencia Bancaria'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    let message = `*NUEVO PEDIDO - TITAN NUTRITION* 🏋️‍♂️\n\n`;
    message += `*Datos del Cliente:*\n`;
    message += `👤 Nombre: ${formData.fullName}\n`;
    message += `📞 Teléfono: ${formData.phone}\n`;
    message += `📍 Dirección: ${formData.address}\n`;
    message += `💳 Método de Pago: ${formData.paymentMethod}\n\n`;
    
    message += `*Resumen del Pedido:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.flavor} | ${item.size}) - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    
    message += `\n*TOTAL A PAGAR:* $${cartTotal.toLocaleString('es-CO')}\n\n`;
    message += `¡Quedo a la espera de la confirmación de mi pedido!`;

    // Encode and open WhatsApp
    const whatsappNumber = '573217214397'; 
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10010] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/90 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white w-full max-w-lg rounded-md overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50 shrink-0">
          <div>
            <h2 className="font-serif font-black text-xl md:text-2xl uppercase tracking-tighter text-zinc-900">Finalizar Compra</h2>
            <p className="text-xs text-zinc-500 font-medium mt-1">Completa tus datos para enviar el pedido</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded-full transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        
        {/* Form Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">Nombre Completo</label>
              <input 
                type="text" 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full border border-zinc-300 rounded-sm p-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">Número de Teléfono</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej. 300 123 4567"
                className="w-full border border-zinc-300 rounded-sm p-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">Dirección de Envío</label>
              <input 
                type="text" 
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej. Calle 123 #45-67, Apto 101"
                className="w-full border border-zinc-300 rounded-sm p-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">Método de Pago</label>
              <select 
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-zinc-300 rounded-sm p-3 text-sm focus:outline-none focus:border-brand-accent cursor-pointer"
              >
                <option value="Transferencia Bancaria">Transferencia Bancaria / Nequi / Daviplata</option>
                <option value="Pago Contra Entrega">Pago Contra Entrega (Efectivo)</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito / Link de Pago</option>
              </select>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="p-5 md:p-6 border-t border-zinc-200 bg-zinc-50 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-zinc-500 text-sm">Total a pagar:</span>
            <span className="font-black text-xl text-zinc-900">${cartTotal.toLocaleString('es-CO')}</span>
          </div>
          
          <button 
            type="submit" 
            form="checkout-form"
            className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold uppercase tracking-[0.15em] py-3.5 text-xs rounded-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Enviar Pedido por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
