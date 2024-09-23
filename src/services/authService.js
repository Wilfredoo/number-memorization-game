// src/services/authService.js
import axios from 'axios';

export const login = async (username, password) => {
  return await axios.post('/api/auth/login', { username, password });
};

export const register = async (userData) => {
  return await axios.post('/api/auth/register', userData);
};
