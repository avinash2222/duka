import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '@/config/environment';

const clearAuthData = () => {
  ['authToken', 'refreshToken', 'userData'].forEach((key) =>
    sessionStorage.removeItem(key)
  );
};

const redirectToLogin = () => {
  clearAuthData();
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.timeout || 15000,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    if (!error.response) return true;
    const status = error.response.status;
    return status >= 500 && status < 600;
  },
});

axiosInstance.interceptors.request.use(
  (requestConfig) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    if (!(requestConfig.data instanceof FormData)) {
      requestConfig.headers['Content-Type'] = 'application/json';
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { clearAuthData };
