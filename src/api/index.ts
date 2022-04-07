import axios from 'axios';
import { BASE_URL } from '../utils/constants/server';
import { io } from 'socket.io-client';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  }
});

api.interceptors.request.use(req => {
  if (req.headers) {
    req.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const socket = io(api.defaults.baseURL || 'http://localhost:5000', {
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
