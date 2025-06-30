import React from 'react';

const Pending = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>⏳ Pago pendiente</h2>
      <p>Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default Pending;
