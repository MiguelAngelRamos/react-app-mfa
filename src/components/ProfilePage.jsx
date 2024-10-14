import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeDisplay from './QRCodeDisplay';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import { getProfile } from '../services/api';

const ProfilePage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth(); // Obtenemos el token y la función de logout del contexto
  const [user, setUser] = useState(null); // Guardamos los datos del usuario para saber si MFA está habilitado

  // Efecto para obtener el perfil del usuario cuando el componente se monta
  useEffect(() => {
    console.log("Token actual:", token);
    const fetchUserProfile = async () => {
      try {
        const response = await getProfile(); // Obtenemos el perfil del usuario
        setUser(response.data.user); // Guardamos la información del usuario (asegúrate que el campo es "user")
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please try again.');
      }
    };

    if (token) { // Asegúrate de solo intentar obtener el perfil si existe un token
      fetchUserProfile();
    }
  }, [token]);

  const enableMFA = async () => {
    try {
      const response = enableMFA(); // Llamamos a la función de habilitar MFA en el backend

      // Guardamos la URL del código QR recibido
      setQrCodeUrl(response.data.qrCodeUrl);

      // Actualizamos el estado del usuario para reflejar que MFA ha sido habilitado
      setUser((prevUser) => ({ ...prevUser, mfa_enabled: '1' }));
      setError(null);
    } catch (error) {
      console.error('Error enabling MFA:', error);
      setError('Failed to enable MFA. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      {/* Botón de Logout en la parte superior derecha */}
      <div className="d-flex justify-content-end">
      {token && <LogoutButton/>}
    
      </div>

      {/* Información del perfil del usuario */}
      {user ? (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card shadow-lg p-5 mb-5 bg-white rounded text-center">
              <h2 className="card-title mb-4">User Profile</h2>
              <h4 className="text-primary mb-3">Welcome, {user.name}!</h4>
              <p className="text-muted">Email: {user.email}</p>

              {/* Mostrar el botón de habilitar MFA solo si MFA no está habilitado */}
              {user.mfa_enabled === '0' && (
                <div className="mt-4">
                  <button
                    className="btn btn-warning btn-lg"
                    onClick={enableMFA}
                    style={{
                      fontWeight: 'bold',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    Enable MFA
                  </button>
                  <p className="text-muted mt-2">
                    Click the button to enhance your account security.
                  </p>
                </div>
              )}

              {/* Mostrar el código QR si está disponible */}
              {qrCodeUrl && (
                <div className="mt-5">
                  <h5 className="text-success mb-3">Scan the QR Code below to enable MFA:</h5>
                  <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
                </div>
              )}

              {/* Mostrar un mensaje de error si ocurre un problema */}
              {error && <p className="text-danger mt-4">{error}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
