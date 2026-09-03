import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ variant = 'transparent' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = variant === 'light' || isScrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-12 py-5 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md text-zinc-900 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] py-4' 
          : variant === 'light' 
            ? 'bg-transparent text-zinc-900 border-b border-zinc-200/50' 
            : 'bg-transparent text-white/95'
      }`}
    >
      <div className="w-1/3">
        <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
          <h1 className={`text-3xl font-serif font-bold tracking-widest uppercase ${isLight ? 'text-zinc-900' : 'text-white'}`}>
            TITAN
            <span className={isLight ? 'text-brand-accent' : 'text-red-500'}>.</span>
          </h1>
        </Link>
      </div>
      
      <div className="w-1/3 flex justify-center hidden md:flex">
        <div className="relative w-full max-w-md group">
          <input 
            type="text" 
            placeholder="Buscar proteínas, creatinas..."
            className={`w-full py-2.5 px-6 rounded-sm text-sm font-medium focus:outline-none transition-all duration-300 ${
              isLight 
                ? 'bg-zinc-100 border border-transparent text-zinc-800 focus:border-zinc-300 focus:bg-white' 
                : 'bg-white/10 text-white placeholder-white/60 border border-white/20 focus:bg-white/20'
            }`}
          />
        </div>
      </div>
      
      <div className="w-1/3 flex justify-end">
        <div 
          onClick={() => setIsCartOpen(true)}
          className={`relative cursor-pointer transition-transform hover:scale-110 duration-300 ${isLight ? 'text-zinc-800' : 'text-white'}`}
        >
          <ShoppingBag strokeWidth={1.5} size={26} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-accent text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md animate-fade-in">
              {itemCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
