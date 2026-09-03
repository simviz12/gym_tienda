import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const bgImages = [
  "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop", // Current one
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop", // Heavy weights
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"  // Intense action
];

export default function Hero() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef(null);

  const goToCatalog = () => {
    navigate('/catalog.html');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % bgImages.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] bg-zinc-900 overflow-hidden font-sans">
      
      {/* Crossfading Background Images */}
      {bgImages.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out ${
            activeIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url('${img}')`,
            filter: "brightness(0.4)" 
          }}
        ></div>
      ))}

      <Navbar variant="transparent" />

      {/* Static Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20 animate-fade-in">
        <h2 className="text-6xl sm:text-7xl md:text-[8rem] leading-none font-serif font-black text-white mb-4 md:mb-6 tracking-tight uppercase drop-shadow-2xl">
          Supera tus <br/><span className="text-brand-accent">Límites</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium text-white/80 mb-8 md:mb-12 max-w-2xl drop-shadow-md px-4 uppercase tracking-widest">
          Nutrición deportiva de élite para resultados reales.
        </p>
        <button 
          onClick={goToCatalog}
          className="group relative overflow-hidden bg-white text-zinc-900 px-10 md:px-12 py-4 md:py-5 uppercase text-xs md:text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:bg-zinc-200 hover:-translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-2">Explorar Productos</span>
        </button>
      </div>
    </div>
  );
}
