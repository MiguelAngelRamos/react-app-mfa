import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { verifyMFA } from '../services/api';

const MFAVerificationForm = () => {
  const { token, setToken } = useAuth();
  const [mfaCode, setMfaCode] = useState('');
  const navigate = useNavigate();

  const handleVerifyMFA = async (e) => {
    e.preventDefault();

    // Verificar si el token y el código MFA están disponibles
    console.log('Token:', token); // Verificar el valor del token
    console.log('MFA Code:', mfaCode); // Verificar el valor del código MFA

    try {
      // Enviamos el código MFA a la API de Laravel
      const response = await verifyMFA(mfaCode);

      // Verificar la respuesta
      console.log('API Response:', response.data);
      setToken(response.data.access_token); // Guardar token en el contexto
      localStorage.setItem('token', response.data.access_token); // Guardar token en LocalStorage
      // Si la verificación MFA es exitosa, redirigimos al perfil
      if (response.data.access_token) {
        console.log('MFA verification successful');
        navigate('/profile');
      } else {
        console.error('MFA Verification failed');
      }
    } catch (error) {
      console.error('MFA Verification failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Verify MFA</h2>
      <LogoutButton/>
      <form onSubmit={handleVerifyMFA} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="mfaCode" className="form-label">MFA Code</label>
          <input
            type="text"
            id="mfaCode"
            className="form-control"
            placeholder="Enter MFA Code"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Verify MFA</button>

      </form>
    </div>
  );
};

export default MFAVerificationForm;
