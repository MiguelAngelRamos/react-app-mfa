// src/services/api.js
import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajusta esta URL según sea necesario
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a las solicitudes si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Asumiendo que guardas el token en localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Función para el login
export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

// Función para verificar MFA
export const verifyMFA = async (code) => {
  const response = await api.post('/verify-mfa', { code });
  return response.data;
};

// Función para obtener el perfil del usuario
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

// Función para habilitar MFA
export const enableMFA = async () => {
  const response = await api.post('/enable-mfa');
  return response.data;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token'); // Borra el token de localStorage
  window.location.href = '/login'; // Redirige al login
};

export default api;
