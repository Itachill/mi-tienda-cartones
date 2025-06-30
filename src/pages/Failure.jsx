import React from 'react';

const Failure = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>❌ El pago ha fallado</h2>
      <p>Algo salió mal. Intenta nuevamente.</p>
      <a href="/carrito">Volver al carrito</a>
    </div>
  );
};

export default Failure;
