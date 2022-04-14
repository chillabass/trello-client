import axios from 'axios';
import { BASE_URL } from '../utils/constants/server';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(req => {
  if (req.headers) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default api;
