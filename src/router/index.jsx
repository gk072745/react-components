import { createBrowserRouter, redirect } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import App from '@/App.jsx';
import AccordionDemo from '@/pages/AccordionDemo.jsx';
import CheckboxDemo from '@/pages/CheckboxDemo.jsx';
import ChipDemo from '@/pages/ChipDemo.jsx';
import RadioDemo from '@/pages/RadioDemo.jsx';

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
      {
        path: '/checkbox',
        element: <CheckboxDemo />,
      },
      {
        path: '/chip',
        element: <ChipDemo />,
      },
      {
        path: '/radio',
        element: <RadioDemo />,
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
