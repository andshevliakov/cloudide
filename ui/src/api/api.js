import axios from 'axios';
import managerUrl from '../envloader';

const api = axios.create({
    'baseURL': managerUrl,
});

const withInterceptors = () => {
    api.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('auth-token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );
}

withInterceptors();

export default api;