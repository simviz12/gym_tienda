import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 md:py-20 font-sans border-t-4 border-brand-accent">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="inline-block mb-6">
            <h2 className="text-3xl font-serif font-black tracking-widest uppercase text-white">
              TITAN<span className="text-brand-accent">.</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed mb-6 font-medium">
            Tu tienda oficial de suplementación deportiva premium. Potencia tus entrenamientos, rompe tus límites y alcanza tu mejor versión.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all duration-300 font-bold text-lg leading-none">
              <span className="mb-1">𝕏</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-zinc-800 pb-4">Navegación</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-brand-accent transition-colors">Inicio</Link></li>
            <li><Link to="/catalog.html" className="hover:text-brand-accent transition-colors">Catálogo de Productos</Link></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Sobre Nosotros</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Políticas de Envío</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-zinc-800 pb-4">Categorías</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li><Link to="/catalog.html" className="hover:text-brand-accent transition-colors">Proteínas</Link></li>
            <li><Link to="/catalog.html" className="hover:text-brand-accent transition-colors">Creatinas</Link></li>
            <li><Link to="/catalog.html" className="hover:text-brand-accent transition-colors">Pre-Entrenos</Link></li>
            <li><Link to="/catalog.html" className="hover:text-brand-accent transition-colors">Aminoácidos (BCAAs)</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-zinc-800 pb-4">Contacto</h3>
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-accent shrink-0 mt-0.5" />
              <span>Calle Falsa 123, Local 4<br/>Ciudad, Colombia</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-accent shrink-0" />
              <span>+57 300 000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-accent shrink-0" />
              <span>contacto@titannutrition.com</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs tracking-widest font-bold uppercase text-zinc-600">
          © {new Date().getFullYear()} TITAN NUTRITION. TODOS LOS DERECHOS RESERVADOS.
        </p>
        <div className="flex gap-4">
          <span className="text-xl opacity-50 grayscale hover:grayscale-0 transition-all">💳</span>
          <span className="text-xl opacity-50 grayscale hover:grayscale-0 transition-all">🏦</span>
        </div>
      </div>
    </footer>
  );
}
