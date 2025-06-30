import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // ✅ Cargar usuario desde localStorage si existe
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("usuarioLogeado"));
    if (datos) setUsuario(datos);
  }, []);

  const login = (datos) => {
    localStorage.setItem("usuarioLogeado", JSON.stringify(datos)); // guardar en localStorage
    setUsuario(datos);
  };

  const logout = () => {
    localStorage.removeItem("usuarioLogeado"); // limpiar
    setUsuario(null);
  };

  const loginComoInvitado = () => {
    const invitado = { nombre: 'Invitado', tipo: 'invitado' };
    localStorage.setItem("usuarioLogeado", JSON.stringify(invitado));
    setUsuario(invitado);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loginComoInvitado }}>
      {children}
    </AuthContext.Provider>
  );
}
