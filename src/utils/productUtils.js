export const defaultProducts = [
  {
    id: 1,
    name: '100% Whey Gold Standard',
    brand: 'Optimum Nutrition',
    price: 350000,
    category: 'Proteínas',
    description: 'La proteína de suero más vendida del mundo. Ideal para recuperación muscular rápida post-entreno con 24g de proteína por servicio.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
    flavors: ['Chocolate', 'Vainilla', 'Fresa'],
    sizes: ['1 Lb', '2 Lbs', '5 Lbs', '10 Lbs']
  },
  {
    id: 2,
    name: 'Platinum Creatine',
    brand: 'MuscleTech',
    price: 120000,
    category: 'Creatinas',
    description: 'Creatina monohidratada micronizada pura. Aumenta la fuerza, potencia y el rendimiento en tus entrenamientos más intensos.',
    image: 'https://images.unsplash.com/photo-1579722821273-0f110b5eb946?q=80&w=600&auto=format&fit=crop',
    flavors: ['Sin Sabor'],
    sizes: ['300g', '400g']
  },
  {
    id: 3,
    name: 'C4 Original Pre-Workout',
    brand: 'Cellucor',
    price: 160000,
    category: 'Pre-Entrenos',
    description: 'Energía explosiva, resistencia muscular y bombeos increíbles. El pre-entreno clásico para llevar tus rutinas al siguiente nivel.',
    image: 'https://images.unsplash.com/photo-1558017487-06bf9f82613a?q=80&w=600&auto=format&fit=crop',
    flavors: ['Fruit Punch', 'Blue Razz', 'Sandía'],
    sizes: ['30 Servicios', '60 Servicios']
  }
];

export const getProducts = () => {
  const saved = localStorage.getItem('titan-products');
  if (saved) return JSON.parse(saved);
  
  localStorage.setItem('titan-products', JSON.stringify(defaultProducts));
  return defaultProducts;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem('titan-products', JSON.stringify(updated));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now()
  };
  products.push(newProduct);
  localStorage.setItem('titan-products', JSON.stringify(products));
};
