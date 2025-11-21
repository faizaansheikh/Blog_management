// lib/axiosInstance.ts
import axios from 'axios';
// import { getCookie } from '../libs';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'}/api`,
});


axiosInstance.interceptors.request.use(
  (config) => {

    const token =  localStorage.getItem('token') ??  null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirect to login.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;