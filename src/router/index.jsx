import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import App from '@/App.jsx';
import AccordionDemo from '@/pages/AccordionDemo.jsx';

// Auth loader function
const authLoader = () => {
  const token = localStorage.getItem('Authorization');
  if (!token) {
    return redirect('/auth');
  }
  return null;
};

// Public loader function (redirect if already authenticated)
const publicLoader = () => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    return redirect('/');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: authLoader,
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
      },
      {
        path: '/accordion',
        element: <AccordionDemo />,
      },
    ],
  },
  {
    path: '/auth',
    loader: publicLoader,
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
