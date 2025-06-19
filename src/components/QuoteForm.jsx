import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './QuoteForm.css';

const QuoteForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [tipo, setTipo] = useState('natural');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [dimensiones, setDimensiones] = useState('');
  const [enviado, setEnviado] = useState(false);

  // ✅ RUT con guion automático, max 8 dígitos + DV
  const handleRutChange = (e) => {
    let cleanInput = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    cleanInput = cleanInput.slice(0, 9); // máximo 9 caracteres (8 num + DV)

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
      console.error('Error enviando cotizacion', error);
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

        <label>Nombre {tipo === 'juridica' ? 'de la empresa' : 'completo'}:</label>
        <input
          type="text"
          className="field"
          placeholder={`Escribe el nombre ${tipo === 'juridica' ? 'de la empresa' : 'completo'}`}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>RUT {tipo === 'juridica' ? 'de la empresa' : 'personal'}:</label>
        <input
          type="text"
          className="field"
          placeholder="Ej: 12345678-K"
          value={rut}
          onChange={handleRutChange}
          pattern="^\d{7,8}-[0-9K]$"
          title="Formato válido: 12345678-9 o 12345678-K"
          required
        />

        <label>Correo {tipo === 'juridica' ? 'de la empresa' : 'personal'}:</label>
        <input
          type="email"
          className="field"
          placeholder={`Correo ${tipo === 'juridica' ? 'de contacto' : 'personal'}`}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Dimensiones de la caja:</label>
        <textarea
          className="field textarea"
          placeholder="Indica las dimensiones en cm (largo x ancho x alto)"
          value={dimensiones}
          onChange={(e) => setDimensiones(e.target.value)}
          required
        />

        <button type="submit">Enviar Cotización</button>
        {enviado && <p className="exito">Tu cotización fue enviada con éxito.</p>}
      </form>
    </div>
  );
};

export default QuoteForm;
