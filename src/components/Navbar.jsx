import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1e88e5',
      color: 'white',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
        TrasherBox
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/productos" style={{ color: 'white', textDecoration: 'none' }}>Productos</Link>
        <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>Carrito</Link>
        {usuario ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>Hola, {usuario.nombre}</span>
            <button
              onClick={handleLogout}
              style={{
                background: '#e53935',
                color: 'white',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
