import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // ✅ solo una vez

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TrasherBox</div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">🛒</Link>
        <Link to="/perfil">👤</Link>
        <Link to="/login">⎋</Link>
      </div>
    </nav>
  );
};

export default Navbar;
