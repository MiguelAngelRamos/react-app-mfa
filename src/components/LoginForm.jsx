// login forms

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginForm = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in...");
    try {
      // Petición de autenticación a la API de Laravel
      const response = await login(email, password);

      // Revisa la respuesta en la consola
      console.log('API Response:', response.data);

      // Guardamos el token si la autenticación es correcta
      if (response.data.access_token) {
        console.log('Login successful:', response.data.access_token);
        setToken(response.data.access_token); // Guardar token en el contexto
        localStorage.setItem('token', response.data.access_token); // Guardar token en LocalStorage
      }

      // Si MFA está habilitado, redirigimos a la página de verificación MFA
      if (response.data.mfa_required) {
        console.log('Redirigiendo a /verify-mfa');
        navigate('/verify-mfa'); // Redirige a la página de MFA sin recargar la página
      } else {
        // Redirigir al perfil si MFA no está habilitado
        console.log('Redirigiendo a /profile');
        navigate('/profile'); // Redirige al perfil sin recargar la página
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
