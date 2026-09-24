import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { X, LayoutGrid, List, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import onLogo from '../assets/on-logo.png';

import { getProducts } from '../utils/productUtils';

const allProducts = getProducts();

const brands = [
  { id: 'all', label: 'VER TODO', name: 'ALL', className: '' },
  { id: 'on', isImage: true, image: onLogo, name: 'Optimum Nutrition', className: 'h-16 md:h-20 lg:h-24 object-contain transition-all cursor-pointer brightness-0' },
  { id: 'muscletech', label: 'MuscleTech', name: 'MuscleTech', className: 'font-serif italic font-black text-2xl md:text-3xl tracking-tighter hover:text-zinc-900 transition-colors cursor-pointer' },
  { id: 'cellucor', label: 'Cellucor', name: 'Cellucor', className: 'font-sans font-bold hover:text-zinc-900 transition-colors cursor-pointer' },
  { id: 'bsn', label: 'BSN', name: 'BSN', className: 'text-sm md:text-base border border-zinc-300 px-3 py-1 hover:border-zinc-900 hover:text-zinc-900 transition-colors cursor-pointer font-black tracking-widest' },
  { id: 'dymatize', label: 'Dymatize', name: 'Dymatize', className: 'font-serif hover:text-zinc-900 transition-colors cursor-pointer' },
  { id: 'nutrex', label: 'Nutrex', name: 'Nutrex', className: 'tracking-tighter font-black text-xl hover:text-zinc-900 transition-colors cursor-pointer' }
];

export default function Catalog() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const sizes = ['1 Lb', '2 Lbs', '5 Lbs', '10 Lbs'];

  // Reset to page 1 whenever a filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, selectedPriceRange, sortOrder]);

  let filteredProducts = [...allProducts];
  
  if (selectedCategory !== 'ALL') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  
  if (selectedBrand !== 'ALL') {
    filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
  }

  if (selectedPriceRange !== 'all') {
    filteredProducts = filteredProducts.filter(p => {
      if (selectedPriceRange === 'low') return p.price < 100000;
      if (selectedPriceRange === 'mid') return p.price >= 100000 && p.price <= 200000;
      if (selectedPriceRange === 'high') return p.price > 200000;
      return true;
    });
  }

  // Sorting
  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination Logic
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const formatPrice = (price) => {
    return '$' + price.toLocaleString('es-CO');
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize(sizes[1]);
    setSelectedFlavor(product.flavors[0]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

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
        
        {/* Responsive Image - shown on both mobile and desktop */}
        <div className="w-full h-[35%] md:h-full md:w-1/2 bg-zinc-100 min-h-0 shrink-0">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content Section - Scales properly on mobile */}
        <div className="w-full h-[65%] md:h-full md:w-1/2 flex flex-col overflow-y-auto p-5 md:p-8 lg:p-10 bg-white min-h-0">
          <div className="pb-3 md:pb-4 shrink-0">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-1 md:mb-2 block">{selectedProduct.brand}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black mb-1 md:mb-2 text-zinc-900 uppercase leading-none">{selectedProduct.name}</h2>
            <p className="text-lg md:text-2xl font-bold mb-3 md:mb-5 text-zinc-700">{formatPrice(selectedProduct.price)}</p>
            
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
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-8 md:h-10 flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-300 uppercase ${
                    selectedSize === size 
                      ? 'border-2 border-brand-accent text-brand-accent bg-red-50 shadow-sm' 
                      : 'border-2 border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {size}
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
                addToCart(selectedProduct, quantity, selectedSize, selectedFlavor);
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
    <div className="min-h-screen bg-brand-bg text-zinc-900 animate-fade-in font-sans">
      <Navbar variant="light" />

      <section className="pt-32 md:pt-40 pb-12 px-6 max-w-7xl mx-auto text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase mb-4 block">Catálogo Oficial</span>
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 text-zinc-900 uppercase">Productos</h2>
        
        <div className="flex justify-start md:justify-center gap-6 md:gap-12 mb-8 border-b border-zinc-200 mx-auto overflow-x-auto w-full px-4 no-scrollbar">
          {['ALL', 'Proteínas', 'Creatinas', 'Pre-Entrenos'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-bold text-[11px] uppercase tracking-[0.2em] pb-4 transition-colors whitespace-nowrap border-b-[3px] ${
                selectedCategory === cat ? 'border-brand-accent text-zinc-900' : 'border-transparent text-zinc-400 hover:text-zinc-900'
              }`}
            >
              {cat === 'ALL' ? 'VER TODO' : cat}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-8 md:pb-12 max-w-6xl mx-auto border-b border-zinc-200/60 mb-8">
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-x-8 md:gap-x-14 gap-y-6 text-zinc-400 font-bold text-xl md:text-2xl uppercase overflow-x-auto no-scrollbar px-6 md:px-8 pb-4 md:pb-0">
          {brands.map((b) => (
            b.isImage ? (
              <img 
                key={b.id}
                src={b.image}
                alt={b.name}
                onClick={() => setSelectedBrand(b.name)}
                className={`${b.className} ${
                  selectedBrand === b.name 
                    ? 'opacity-100 scale-110' 
                    : 'opacity-40 hover:opacity-100 hover:scale-105'
                }`}
              />
            ) : (
              <span 
                key={b.id}
                onClick={() => setSelectedBrand(b.name)}
                className={`transition-all duration-300 cursor-pointer ${b.className || ''} ${
                  selectedBrand === b.name 
                    ? (b.name === 'ALL' ? 'text-zinc-900 border-b-2 border-zinc-900 pb-1' : 'text-zinc-900 scale-110 opacity-100') 
                    : 'hover:text-zinc-900 hover:scale-105 opacity-70 hover:opacity-100'
                } ${b.name === 'ALL' ? 'text-[10px] md:text-[11px] font-bold tracking-[0.2em]' : ''}`}
              >
                {b.label}
              </span>
            )
          ))}
        </div>
      </section>

      {/* FILTER & PAGINATION BAR */}
      <section className="px-4 md:px-12 max-w-[1400px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-200 pb-4 gap-4">
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* View toggles */}
            <div className="flex bg-zinc-100 p-1 rounded-sm border border-zinc-200 shrink-0">
              <button className="bg-brand-accent text-white p-2 shadow-sm rounded-sm transition-colors"><LayoutGrid size={16} /></button>
              <button className="text-zinc-500 hover:text-zinc-900 p-2 transition-colors"><List size={16} /></button>
            </div>
            
            {/* Sort Dropdown */}
            <select 
              className="bg-white border border-zinc-300 text-[11px] md:text-xs font-bold text-zinc-700 py-2.5 px-3 focus:outline-none focus:border-brand-accent shadow-sm uppercase tracking-widest cursor-pointer flex-1 md:flex-none"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Orden predeterminado</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
            
            {/* Filter Dropdown */}
            <select 
              className="bg-white border border-zinc-300 text-[11px] md:text-xs font-bold text-zinc-700 py-2.5 px-3 focus:outline-none focus:border-brand-accent shadow-sm uppercase tracking-widest cursor-pointer hidden sm:block md:flex-none"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="all">Filtro: Todos</option>
              <option value="low">Filtro: &lt; $100K</option>
              <option value="mid">Filtro: $100K - $200K</option>
              <option value="high">Filtro: &gt; $200K</option>
            </select>
          </div>
          
          {/* Results count & Pagination Top */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs md:text-sm text-zinc-500 font-medium whitespace-nowrap">
              Mostrando {totalProducts === 0 ? 0 : indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, totalProducts)} de {totalProducts} resultados
            </span>
            
            {/* Top Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center font-bold text-xs transition-colors rounded-sm ${
                      currentPage === page 
                        ? 'bg-brand-accent text-white' 
                        : 'bg-transparent text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-[500px]">
        {currentProducts.length === 0 ? (
          <div className="text-center text-zinc-500 py-20 text-sm md:text-base font-medium">No hay productos que coincidan con estos filtros.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-16">
              {currentProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col items-center group cursor-pointer animate-fade-in w-full max-w-sm mx-auto sm:max-w-none"
                  onClick={() => openModal(product)}
                >
                  <div className="w-full aspect-square overflow-hidden mb-4 bg-white relative rounded-sm shadow-sm border border-zinc-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-900 text-white text-[9px] font-bold tracking-widest px-3 py-1 uppercase shadow-sm">
                      {product.brand}
                    </div>
                  </div>
                  
                  <div className="text-center w-full px-2 flex flex-col items-center">
                    <h3 className="font-bold font-serif text-lg md:text-xl uppercase text-zinc-900 mb-1 transition-colors">{product.name}</h3>
                    <p className="text-brand-accent text-xs md:text-sm mb-4 font-bold tracking-wider">{formatPrice(product.price)}</p>
                    
                    <button className="w-full bg-white border-2 border-zinc-200 py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20 pt-8 border-t border-zinc-200">
                <div className="flex items-center gap-1 md:gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors border border-transparent hover:border-zinc-200 rounded-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm transition-all duration-300 rounded-sm ${
                        currentPage === page 
                          ? 'bg-brand-accent text-white shadow-md' 
                          : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 transition-colors border border-transparent hover:border-zinc-200 rounded-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* RENDER MODAL USING REACT PORTAL */}
      {selectedProduct && createPortal(modalContent, document.body)}

      <Footer />
    </div>
  );
}
