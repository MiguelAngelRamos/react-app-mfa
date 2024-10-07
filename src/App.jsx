import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MFAVerificationForm from './components/MFAVerificationForm';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './context/AuthContext';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const { token } = useAuth(); // Obtenemos el token del contexto
  console.log(token);

  return (
    <Router>
      <div>
        <Routes>
          {/* Ruta de login */}
          <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/profile" />} />

          {/* Ruta de verificación MFA */}
          <Route path="/verify-mfa" element={token ? <MFAVerificationForm /> : <Navigate to="/login" />} />

          {/* Ruta del perfil protegida */}
          <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/login" />} />

          {/* Redirección de la ruta raíz */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>

        {/* Mostrar el botón de logout solo si el usuario está autenticado */}
        {/* {token && <LogoutButton/>} */}
      </div>
    </Router>
  );
};

export default App;
