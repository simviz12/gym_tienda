import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Hero() {
  const navigate = useNavigate();

  const goToCatalog = () => {
    navigate('/catalog.html');
  };

  return (
    <div className="relative w-full h-[100vh] bg-zinc-950 overflow-hidden font-sans">
      {/* Background Image - Gym/Supplements */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-transform duration-[30s] ease-out scale-105 hover:scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop')", // gym aesthetic
          filter: "brightness(0.35) contrast(1.1)" 
        }}
      ></div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40"></div>

      <Navbar variant="transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 md:pb-24 animate-fade-in">
        <span className="text-brand-accent text-[9px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 md:mb-6">Potencia tu rendimiento</span>
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] font-serif font-black text-white mb-6 md:mb-8 tracking-tighter uppercase drop-shadow-2xl">
          Supera tus <br/><span className="text-brand-accent italic">Límites</span>
        </h2>
        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-zinc-300 mb-8 md:mb-10 max-w-xl drop-shadow-md px-4 uppercase tracking-[0.2em] leading-relaxed opacity-90">
          Nutrición deportiva de élite para resultados reales. No hay atajos.
        </p>
        
        <button 
          onClick={goToCatalog}
          className="group relative bg-brand-accent text-white px-10 md:px-14 py-4 md:py-5 uppercase text-[10px] md:text-[11px] font-bold tracking-[0.3em] transition-all duration-300 hover:bg-red-700 hover:shadow-[0_0_30px_-5px_rgba(225,29,72,0.5)] overflow-hidden"
        >
          {/* Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="relative z-10 flex items-center gap-2">Explorar Catálogo</span>
        </button>
      </div>

      {/* Infinite Ticker Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-brand-accent text-white py-3 border-t border-red-900/50 overflow-hidden z-20 flex">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
          <span>⚡ ENVÍO GRATIS A TODO EL PAÍS</span>
          <span>•</span>
          <span>🛡️ PRODUCTOS 100% ORIGINALES</span>
          <span>•</span>
          <span>💳 PAGOS CONTRA ENTREGA</span>
          <span>•</span>
          <span>🔥 ASESORÍA PERSONALIZADA</span>
          <span>•</span>
          <span>⚡ ENVÍO GRATIS A TODO EL PAÍS</span>
          <span>•</span>
          <span>🛡️ PRODUCTOS 100% ORIGINALES</span>
          <span>•</span>
          <span>💳 PAGOS CONTRA ENTREGA</span>
          <span>•</span>
          <span>🔥 ASESORÍA PERSONALIZADA</span>
          <span>•</span>
        </div>
      </div>
    </div>
  );
}
