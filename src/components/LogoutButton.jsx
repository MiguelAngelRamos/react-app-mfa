import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminamos el token
    setToken(null);
    // Redirigimos al login sin recargar la página
    navigate('/login');
  };

  return <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
