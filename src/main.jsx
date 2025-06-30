import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/scss/main.scss';
import router from './router/index.jsx';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppProvider.jsx';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
