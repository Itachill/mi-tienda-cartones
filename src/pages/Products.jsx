import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import QuoteForm from '../components/QuoteForm'; // Asegúrate que la ruta esté bien
import './Products.css';

const products = [
  { id: 1, name: 'Caja Chica', size: '20x20', price: 1000 },
  { id: 2, name: 'Caja Mediana', size: '30x30', price: 1500 },
  { id: 3, name: 'Caja Grande', size: '50x50', price: 2000 },
];

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [cantidades, setCantidades] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (productId, value) => {
    setCantidades(prev => ({
      ...prev,
      [productId]: parseInt(value)
    }));
  };

  const handleAdd = (product) => {
    const cantidad = cantidades[product.id] || 1;
    addToCart(product, cantidad);

    // Mostrar mensaje de éxito
    setMensajeExito(`✅ ${cantidad} ${product.name}${cantidad > 1 ? 's' : ''} agregada${cantidad > 1 ? 's' : ''} al carrito`);
    setTimeout(() => setMensajeExito(''), 2500);
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Nuestros Productos</h2>

      {/* ✅ Mensaje de éxito */}
      {mensajeExito && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          border: '1px solid #c3e6cb',
          borderRadius: '6px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {mensajeExito}
        </div>
      )}

      {/* 🛒 Productos */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-details">Medida: {product.size}</p>
            <p className="product-price">${product.price}</p>

            <input
              type="number"
              min="1"
              value={cantidades[product.id] || 1}
              onChange={(e) => handleChange(product.id, e.target.value)}
              style={{ width: '60px', marginBottom: '0.5rem' }}
            />

            <button
              className="btn btn-primary"
              onClick={() => handleAdd(product)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* 📩 Formulario de cotización */}
      <div className="quote-section">
        <QuoteForm />
      </div>
    </div>
  );
};

export default Products;
