import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { getProducts } from '../utils/productUtils';

const products = getProducts().slice(0, 3); // Solo mostrar 3 en best sellers

export default function BestSellers() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const sizes = ['1 Lb', '2 Lbs', '5 Lbs', '10 Lbs'];

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize(product.sizes ? product.sizes[0] : 'Única');
    setSelectedFlavor(product.flavors ? product.flavors[0] : 'Sin Sabor');
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const normalizedSizes = selectedProduct ? (selectedProduct.sizes || ['Única']).map(s => 
    typeof s === 'string' ? { name: s, price: selectedProduct.price } : s
  ) : [];
  const activeSizeObj = normalizedSizes.find(s => s.name === selectedSize) || normalizedSizes[0];
  const displayPrice = activeSizeObj?.price || selectedProduct?.price || 0;

  const modalContent = selectedProduct && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-zinc-900/80 backdrop-blur-sm transition-opacity" style={{ position: 'fixed' }}>
      
      <div 
        className="bg-white w-full max-w-5xl rounded-md overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-modal"
        style={{ height: '90vh', maxHeight: '700px' }}
      >
        
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-zinc-500 hover:text-zinc-900 z-20 transition-all p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full shadow-sm"
        >
          <X size={20} strokeWidth={2} />
        </button>
        
        {/* Image - Shown on Mobile (35% height) and Desktop (100% height) */}
        <div className="w-full h-[35%] md:h-full md:w-1/2 bg-zinc-100 min-h-0 shrink-0">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Section - Scales to fill remaining height on mobile */}
        <div className="w-full h-[65%] md:h-full md:w-1/2 flex flex-col overflow-y-auto p-5 md:p-8 lg:p-10 bg-white min-h-0">
          <div className="pb-3 md:pb-4 shrink-0">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-1 md:mb-2 block">{selectedProduct.brand}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black mb-1 md:mb-2 text-zinc-900 uppercase leading-none">{selectedProduct.name}</h2>
            <p className="text-lg md:text-2xl font-bold mb-3 md:mb-5 text-zinc-700">${typeof displayPrice === 'number' ? displayPrice.toLocaleString('es-CO') : displayPrice}</p>
            
            <div className="w-10 h-[2px] md:h-[3px] bg-zinc-200 mb-3 md:mb-5"></div>
            
            <p className="text-[11px] md:text-sm leading-relaxed text-zinc-600 mb-4 md:mb-6 font-medium">{selectedProduct.description}</p>
          </div>
          
          <div className="mb-4 md:mb-5 shrink-0">
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] text-zinc-900 uppercase block mb-2">Sabor</span>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {selectedProduct.flavors.map(flavor => (
                <button 
                  key={flavor}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-2 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs font-bold transition-all duration-300 uppercase ${
                    selectedFlavor === flavor 
                      ? 'bg-zinc-900 text-white shadow-md' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 md:mb-8 shrink-0">
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] text-zinc-900 uppercase block mb-2">Presentación / Peso</span>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2">
              { normalizedSizes.map(sizeObj => (
                <button 
                  key={sizeObj.name}
                  onClick={() => setSelectedSize(sizeObj.name)}
                  className={`h-8 md:h-10 flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-300 uppercase ${
                    selectedSize === sizeObj.name 
                      ? 'border-2 border-brand-accent text-brand-accent bg-red-50 shadow-sm' 
                      : 'border-2 border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {sizeObj.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-auto pt-3 md:pt-4 border-t border-zinc-100 shrink-0">
            <div className="flex items-center justify-between border-2 border-zinc-200 bg-white w-full sm:w-1/3 h-10 md:h-12 rounded-sm">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                -
              </button>
              <span className="text-xs md:text-sm font-bold text-zinc-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => {
                addToCart({ ...selectedProduct, price: displayPrice }, quantity, selectedSize, selectedFlavor);
                closeModal();
              }}
              className="flex-1 bg-brand-accent hover:bg-red-700 text-white h-10 md:h-12 font-bold tracking-[0.2em] text-[10px] md:text-[11px] transition-all duration-300 uppercase flex items-center justify-center rounded-sm shadow-md"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-12 max-w-[1400px] mx-auto bg-brand-bg">
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center animate-fade-in">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] text-brand-accent uppercase mb-3 md:mb-4">Más Llevados</span>
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-6 md:mb-8 text-zinc-900 tracking-tight uppercase">Los Más Vendidos</h2>
          <div className="h-[3px] w-16 md:w-20 bg-brand-accent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-16">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col items-center group cursor-pointer w-full max-w-sm mx-auto sm:max-w-none" 
              onClick={() => openModal(product)}
            >
              <div className="w-full aspect-square overflow-hidden mb-4 md:mb-6 bg-zinc-100 relative rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500 border border-zinc-200/50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 mix-blend-multiply"
                />
                
                {/* Brand Badge */}
                <div className="absolute top-4 left-4 bg-zinc-900 text-white text-[9px] font-bold tracking-widest px-3 py-1 uppercase shadow-md">
                  {product.brand}
                </div>
                
                {/* Top Seller Badge */}
                <div className="absolute top-4 right-4 bg-brand-accent text-white text-[9px] font-bold tracking-widest px-3 py-1 uppercase shadow-md flex items-center gap-1">
                  🔥 TOP
                </div>
              </div>
              
              <div className="text-center w-full px-2 md:px-4 flex flex-col items-center">
                <h3 className="font-bold font-serif text-lg md:text-xl uppercase text-zinc-900 mb-1 md:mb-2 transition-colors">{product.name}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-4 md:mb-6 font-semibold">${typeof product.price === 'number' ? product.price.toLocaleString('es-CO') : product.price}</p>
                
                <button className="w-full bg-white border-2 border-zinc-200 py-3 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RENDER MODAL WITH PORTAL */}
      {selectedProduct && createPortal(modalContent, document.body)}
    </>
  );
}
