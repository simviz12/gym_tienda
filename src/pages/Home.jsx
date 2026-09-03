import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import Footer from '../components/Footer';
import { ArrowUp } from 'lucide-react';
import onLogo from '../assets/on-logo.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-zinc-900 font-sans">
      <Hero />

      {/* Second Banner Section with Parallax */}
      <div className="relative w-full h-[40vh] md:h-[75vh] overflow-hidden group">
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed transition-transform duration-[20s] ease-out group-hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/40 transition-colors duration-1000 group-hover:bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-serif font-black text-white uppercase tracking-tight opacity-90 drop-shadow-lg text-center px-4">
            No Pain. No Gain.
          </h2>
        </div>
      </div>

      <BestSellers />

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-4 md:px-12 max-w-7xl mx-auto text-center bg-brand-bg">
        <span className="text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase mb-3 block">Testimonios</span>
        <h2 className="text-4xl md:text-5xl font-serif font-black text-zinc-900 mb-12 uppercase tracking-tight">Atletas Reales</h2>
        
        <div className="bg-white w-full max-w-3xl mx-auto p-8 md:p-16 border-2 border-zinc-100 flex flex-col items-center justify-center relative transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] group rounded-sm">
          
          <div className="text-brand-accent text-lg md:text-xl tracking-widest mb-8 flex gap-1 transition-transform duration-500 group-hover:scale-110">
            ★.★.★.★.★
          </div>
          
          <p className="text-zinc-700 italic text-lg md:text-2xl mb-12 font-bold leading-relaxed relative z-10 px-2 md:px-8">
            "La mejor proteína que he probado. La textura, el sabor y los resultados en ganancia muscular son increíbles. El envío llegó al día siguiente."
          </p>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-8 md:w-16 h-[2px] bg-zinc-200 transition-all duration-500 group-hover:w-4 md:group-hover:w-8 group-hover:bg-brand-accent"></div>
            <span className="text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black text-zinc-900">MARCOS R. - CROSSFITTER</span>
            <div className="w-8 md:w-16 h-[2px] bg-zinc-200 transition-all duration-500 group-hover:w-4 md:group-hover:w-8 group-hover:bg-brand-accent"></div>
          </div>
        </div>
      </section>

      {/* Brands Section (Moved to Bottom) */}
      <section className="py-20 bg-zinc-100 border-y border-zinc-200 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-8 block px-6">Las mejores marcas a nivel mundial</span>
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-x-12 md:gap-x-20 gap-y-10 text-zinc-400 font-black text-2xl md:text-4xl uppercase opacity-60 overflow-x-auto no-scrollbar px-6 pb-4 md:pb-0">
            <img src={onLogo} alt="Optimum Nutrition" className="h-16 md:h-20 lg:h-24 object-contain transition-all duration-300 brightness-0 opacity-40 hover:opacity-100 hover:scale-105" />
            <span className="font-serif italic hover:text-zinc-900 transition-colors duration-300">MuscleTech</span>
            <span className="hover:text-zinc-900 transition-colors duration-300">Cellucor</span>
            <span className="font-sans hover:text-zinc-900 transition-colors duration-300">BSN</span>
            <span className="font-serif hover:text-zinc-900 transition-colors duration-300">Dymatize</span>
            <span className="tracking-tighter hover:text-zinc-900 transition-colors duration-300">Nutrex</span>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href="#" 
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_20px_-10px_rgba(37,211,102,0.8)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp size={24} className="md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />
      </a>
      
      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-[90px] md:bottom-[110px] right-6 md:right-8 bg-zinc-900 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 z-50 group hover:-translate-y-1"
      >
        <ArrowUp size={18} strokeWidth={2} className="md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
