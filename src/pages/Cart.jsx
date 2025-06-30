import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './cart.css';

const Cart = () => {
  const { cart, removeFromCart, changeQuantity, clearCart } = useContext(CartContext);

  const handleQuantityChange = (productId, value) => {
    const cantidad = parseInt(value);
    if (cantidad >= 0) {
      changeQuantity(productId, cantidad);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePagar = async () => {
    try {
      const response = await fetch('http://localhost:4000/crear-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productos: cart })
      });

      const data = await response.json();
      if (data.id) {
        window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert('❌ No se pudo generar el link de pago');
      }
    } catch (error) {
      console.error('Error al generar preferencia:', error);
      alert('❌ Error al procesar el pago');
    }
  };

  return (
    <div className="page-container">
      <h2 className="section-title">🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="products-grid">
            {cart.map(item => (
              <div key={item.id} className="product-card">
                <h3>{item.name}</h3>
                <p className="product-details">Medida: {item.size}</p>
                <p className="product-price">${item.price}</p>

                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: '60px', marginBottom: '0.5rem' }}
                />

                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Total y botones */}
          <div className="cart-summary">
            <div>Total: <strong>${total}</strong></div>
            <button className="btn btn-danger" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button
              style={{
                backgroundColor: '#43a047',
                color: '#fff',
                padding: '0.6rem 1rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
              onClick={handlePagar}
            >
              Pagar con Mercado Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
