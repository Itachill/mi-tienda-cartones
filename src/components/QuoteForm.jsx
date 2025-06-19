import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './QuoteForm.css';

const QuoteForm = () => {
  const { usuario } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);

  const [tipo, setTipo] = useState('natural');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [enviado, setEnviado] = useState(false);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const handleRutChange = (e) => {
    let cleanInput = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    cleanInput = cleanInput.slice(0, 9);

    if (cleanInput.length > 1) {
      const cuerpo = cleanInput.slice(0, -1);
      const dv = cleanInput.slice(-1);
      setRut(`${cuerpo}-${dv}`);
    } else {
      setRut(cleanInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const datos = {
      tipo,
      nombre,
      rut,
      correo,
      dimensiones,
      productos: cart,
      total,
    };

    try {
      await fetch('http://localhost:3001/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      setEnviado(true);
      clearCart();
      setNombre('');
      setRut('');
      setCorreo('');
      setDimensiones('');
      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      console.error('Error enviando cotización', error);
    }
  };

  return (
    <div className="quote-form">
      <h2>Solicita una caja personalizada</h2>
      <p>Completa el formulario según tu tipo de solicitud:</p>

      <form onSubmit={handleSubmit}>
        <label>Tipo de solicitante:</label>
        <select className="field" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="natural">Persona Natural</option>
          <option value="juridica">Empresa</option>
        </select>

        <label>Nombre {tipo === 'juridica' ? 'de la empresa' : 'completo'}:</lab
