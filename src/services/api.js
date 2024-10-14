import axios from 'axios';
import Cookies from 'js-cookie';  // Importamos la librería de cookies

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'https://localhost:8000/api/',  // Asegúrate de usar HTTPS
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a las solicitudes si existe
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');  // Obtiene el token de las cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const verifyMFA = async (code) => {
  const response = await api.post('/verify-mfa', { code });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/user-profile');
  return response.data;
};

export const enableMFA = async () => {
  const response = await api.post('/enable-mfa');
  return response.data;
}