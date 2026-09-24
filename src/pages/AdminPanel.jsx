import React, { useState, useEffect } from 'react';
import { addProduct, getProducts, deleteProduct } from '../utils/productUtils';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Proteínas',
    image: '',
    description: '',
    flavors: '',
    sizes: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
    setMessage('Producto eliminado con éxito.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma separated strings to arrays
    const product = {
      ...formData,
      price: parseInt(formData.price),
      flavors: formData.flavors.split(',').map(s => s.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim())
    };

    addProduct(product);
    setProducts(getProducts());
    setMessage(`¡Producto "${product.name}" agregado con éxito!`);
    
    setFormData({
      name: '',
      brand: '',
      price: '',
      category: 'Proteínas',
      image: '',
      description: '',
      flavors: '',
      sizes: ''
    });
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-zinc-900 px-6 py-8 border-b border-zinc-200 text-center">
          <h2 className="text-3xl font-serif font-black text-white uppercase tracking-wider">Panel de Administración Secreto</h2>
          <p className="mt-2 text-sm text-zinc-400 font-medium">Añade nuevos productos al catálogo</p>
        </div>
        
        <div className="px-6 py-8">
          {message && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md font-bold text-sm text-center">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Nombre del Producto</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="Ej. 100% Whey Gold" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Marca</label>
                <input required type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="Ej. Optimum Nutrition" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Precio (COP)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="Ej. 350000" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent">
                  <option value="Proteínas">Proteínas</option>
                  <option value="Creatinas">Creatinas</option>
                  <option value="Pre-Entrenos">Pre-Entrenos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">URL de la Imagen</label>
              <input required type="url" name="image" value={formData.image} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="https://ejemplo.com/imagen.jpg" />
              <p className="mt-1 text-[10px] text-zinc-500">Usa URLs de imágenes. Recomendado: Imágenes cuadradas sin fondo o fondo blanco.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Descripción</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="Descripción detallada..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Sabores (Separados por coma)</label>
                <input required type="text" name="flavors" value={formData.flavors} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="Chocolate, Vainilla, Fresa" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Presentaciones (Separados por coma)</label>
                <input required type="text" name="sizes" value={formData.sizes} onChange={handleChange} className="w-full border border-zinc-300 p-3 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent" placeholder="2 Lbs, 5 Lbs" />
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="submit" className="flex-1 bg-brand-accent hover:bg-red-700 text-white font-bold py-4 rounded-md uppercase tracking-widest transition-colors shadow-lg">
                Agregar Producto
              </button>
              <button type="button" onClick={() => navigate('/catalog.html')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold py-4 rounded-md uppercase tracking-widest transition-colors">
                Ir al Catálogo
              </button>
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-zinc-50 px-6 py-8 border-t border-zinc-200">
          <h3 className="text-xl font-serif font-black text-zinc-900 uppercase tracking-wider mb-6">Productos Existentes ({products.length})</h3>
          
          {products.length === 0 ? (
            <p className="text-zinc-500 text-sm">No hay productos en el inventario.</p>
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-zinc-200">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md bg-zinc-100 mix-blend-multiply" />
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-brand-accent uppercase">{product.brand}</p>
                      <p className="font-bold text-zinc-900 uppercase">{product.name}</p>
                      <p className="text-sm font-semibold text-zinc-500">${typeof product.price === 'number' ? product.price.toLocaleString('es-CO') : product.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs uppercase tracking-widest rounded-md transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
