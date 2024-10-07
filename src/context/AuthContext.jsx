import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Inicializa el token con el valor de localStorage si existe
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // Cada vez que cambie el token, actualiza localStorage
  useEffect(() => {
    if (token) {
      console.log('token', token);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
