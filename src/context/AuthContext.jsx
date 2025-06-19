import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null o { nombre, correo, tipo }

  const login = (datos) => {
    setUsuario(datos);
  };

  const logout = () => {
    setUsuario(null);
  };

  const loginComoInvitado = () => {
    setUsuario({ nombre: 'Invitado', tipo: 'invitado' });
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loginComoInvitado }}>
      {children}
    </AuthContext.Provider>
  );
}
