// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://44f4bfd5-bc43-4671-8cd2-40048f4ff792-00-jzms0wb266ov.sisko.replit.dev/',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
