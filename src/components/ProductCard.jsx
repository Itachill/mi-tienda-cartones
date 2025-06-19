import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      width: '200px',
      textAlign: 'center'
    }}>
      <h3>{product.name}</h3>
      <p>Medida: {product.size}</p>
      <p>Precio: ${product.price}</p>
      <button>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
