import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (email, password) => {
    if (!email || !password) return false;
    setUsuario({ email });
    return true;
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
