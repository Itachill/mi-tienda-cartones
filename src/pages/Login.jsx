import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // crea estilos visuales si quieres

const Login = () => {
  const { login, loginComoInvitado } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación: validar con datos estáticos
    if (correo === 'cliente@ejemplo.com' && clave === '1234') {
      login({ nombre: 'Cliente 1', correo, tipo: 'cliente' });
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const entrarComoInvitado = () => {
    loginComoInvitado();
    navigate('/');
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <p>¿No tienes cuenta?</p>
      <button onClick={entrarComoInvitado}>Entrar como invitado</button>
    </div>
  );
};

export default Login;
