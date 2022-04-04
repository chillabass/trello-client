import axios from 'axios';
import * as config from '../../config';

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": config.BASE_URL,
  }
});

api.interceptors.request.use(config => {
  //api.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
});

export default api;