import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, clearCart, removeFromCart, removeOneFromCart, addToCart } = useContext(CartContext);
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const enviarCotizacion = () => {
    if (!nombre.trim() || !correo.trim()) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }
    setMensaje(`📝 Cotización enviada correctamente a ${correo}`);
    setNombre('');
    setCorreo('');
    clearCart();
  };

  const simularPago = () => {
    if (!nombre.trim() || !correo.trim()) {
      setMensaje("Para pagar debes ingresar tu nombre y correo.");
      return;
    }
    setMensaje(`💳 Pago simulado exitosamente para ${nombre}. Gracias por tu compra!`);
    setNombre('');
    setCorreo('');
    clearCart();
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>No has agregado productos aún.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => removeOneFromCart(item.id)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '1rem', color: 'red' }}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
        </>
      )}

      {/* Formulario */}
      <div style={{ marginTop: '2rem' }}>
        <label>Nombre:</label><br />
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        /><br />

        <label>Correo electrónico:</label><br />
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
      </div>

      {/* Botones de acción */}
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={enviarCotizacion} className="btn btn-primary">
          Generar Cotización
        </button>

        <button onClick={simularPago} className="btn btn-primary" style={{ background: '#28a745' }}>
          Pagar
        </button>

        <button onClick={clearCart} className="btn" style={{ background: '#ccc', color: '#000' }}>
          Vaciar Carrito
        </button>
      </div>

      {mensaje && (
        <p style={{ color: 'green', marginTop: '1rem' }}>{mensaje}</p>
      )}
    </div>
  );
};

export default Cart;
