import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // se conserva del branch correcto
import './cart.css';

const Cart = () => {
  const { usuario } = useContext(AuthContext); // se usa para validar login
  const { cart, clearCart, removeFromCart, changeQuantity } = useContext(CartContext);
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

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
    <div className="cart-container">
      <h2 className="section-title">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="mensaje-vacio">No has agregado productos aún.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-card">
                <h3>{item.name}</h3>
                <p>${item.price} x {item.quantity} = ${item.price * item.quantity}</p>
                <div className="cart-actions">
                  <button onClick={() => changeQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="btn-eliminar" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="cart-total">Total: ${total}</h3>
        </>
      )}

      <div className="cart-form">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="cart-actions" style={{ marginTop: '1rem' }}>
        <button onClick={enviarCotizacion} className="btn btn-primary">
          Generar Cotización
        </button>

        <button onClick={simularPago} className="btn btn-primary" style={{ background: '#28a745' }}>
          Pagar
        </button>

        <button onClick={clearCart} className="btn btn-secundario">
          Vaciar Carrito
        </button>
      </div>

      {mensaje && (
        <p className="mensaje-exito">{mensaje}</p>
      )}
    </div>
  );
};

export default Cart;
