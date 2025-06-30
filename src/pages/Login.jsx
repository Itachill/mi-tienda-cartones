import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// 👉 Función para formatear RUT automáticamente
const formatearRut = (input) => {
  let limpio = input.replace(/[^0-9kK]/g, '').toUpperCase(); // solo números y K

  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let conPuntos = '';
  let i = 0;
  for (let j = cuerpo.length - 1; j >= 0; j--) {
    conPuntos = cuerpo[j] + conPuntos;
    i++;
    if (i % 3 === 0 && j !== 0) conPuntos = '.' + conPuntos;
  }

  return `${conPuntos}-${dv}`;
};

const Login = () => {
  const { login, loginComoInvitado } = useContext(AuthContext);
  const navigate = useNavigate();

  const [modoRegistro, setModoRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(datos);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.clave === clave
    );
    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      navigate('/');
    } else {
      alert('❌ Usuario o clave incorrecta');
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert('📧 Correo inválido. Debe incluir @ y un dominio.');
      return;
    }

    // Validar RUT chileno
    const rutRegex = /^\d{1,3}(\.\d{3}){2}-[\dkK]$/;
    if (!rutRegex.test(rut)) {
      alert('🧾 RUT inválido. Usa el formato 12.345.678-9');
      return;
    }

    const existe = usuarios.some((u) => u.correo === correo);
    if (existe) {
      alert('⚠️ Ya existe un usuario con ese correo');
      return;
    }

    const nuevo = { nombre, rut, correo, clave, tipo: 'usuario' };
    const actualizados = [...usuarios, nuevo];
    localStorage.setItem('usuarios', JSON.stringify(actualizados));
    setUsuarios(actualizados);
    alert('✅ Usuario creado correctamente');
    setModoRegistro(false);
    setNombre('');
    setRut('');
    setCorreo('');
    setClave('');
  };

  const handleInvitado = () => {
    loginComoInvitado();
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{modoRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>

      <form onSubmit={modoRegistro ? handleRegistro : handleLogin}>
        {modoRegistro && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              className="login-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="RUT (ej: 12.345.678-9)"
              className="login-input"
              value={rut}
              onChange={(e) => setRut(formatearRut(e.target.value))}
              maxLength={12}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Correo"
          className="login-input"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Clave"
          className="login-input"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          {modoRegistro ? 'Registrar' : 'Entrar'}
        </button>
      </form>

      <span className="login-link">
        {modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
      </span>

      <button
        onClick={() => setModoRegistro(!modoRegistro)}
        className="login-button login-invitado"
      >
        {modoRegistro ? 'Volver a login' : 'Crear cuenta nueva'}
      </button>

      {!modoRegistro && (
        <button onClick={handleInvitado} className="login-button login-invitado">
          Entrar como invitado
        </button>
      )}
    </div>
  );
};

export default Login;
