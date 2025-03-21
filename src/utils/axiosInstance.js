// src/utils/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../components/redux/liginSlice';
import Store from '../components/store/store';

const axiosInstance = axios.create({
  baseURL: 'http://3.223.253.106:3129/api',
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Session timed out. Please login again.', { autoClose: 2000 });
      Store.dispatch(logout()); 
      setTimeout(() => {
        window.location.href = '/login'; 
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
