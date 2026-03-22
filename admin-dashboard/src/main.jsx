import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeModeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/auth/AuthContext';
import { UiProvider } from '@/contexts/UiContext';
import NotificationProvider from '@/components/mui/feedback/NotificationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <AuthProvider>
        <UiProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </UiProvider>
      </AuthProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
