/**
 * Runtime config (Vite: import.meta.env.VITE_*).
 * Set VITE_API_BASE_URL in .env for your DUKA Backend.
 */
const apiBaseUrlDev = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const apiBaseUrlProd = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const config = {
  development: {
    apiBaseUrl: apiBaseUrlDev,
    timeout: 30000,
    enableLogging: true,
  },
  production: {
    apiBaseUrl: apiBaseUrlProd,
    timeout: 20000,
    enableLogging: false,
  },
};

const mode = import.meta.env.MODE || 'development';
const currentConfig = config[mode] || config.development;

export default currentConfig;
