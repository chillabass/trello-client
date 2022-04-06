import axios from 'axios';
import * as config from '../../config';
import { io } from 'socket.io-client';

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": config.BASE_URL,
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
