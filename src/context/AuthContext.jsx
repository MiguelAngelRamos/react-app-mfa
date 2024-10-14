import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';  // Importamos la librería de cookies

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Inicializa el token desde las cookies
  const [token, setToken] = useState(() => Cookies.get('token'));

  // Cada vez que cambie el token, actualiza las cookies
  useEffect(() => {
    if (token) {
      // Establecemos la cookie con una expiración de 1 día
      Cookies.set('token', token, { expires: 1, secure: true });  // Secure lo asegura en HTTPS
    } else {
      Cookies.remove('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};