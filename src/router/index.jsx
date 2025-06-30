import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import CounterPage from "../pages/CounterPage.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

// Auth loader function
const authLoader = () => {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    return redirect("/auth");
  }
  return null;
};

// Public loader function (redirect if already authenticated)
const publicLoader = () => {
  const token = localStorage.getItem("Authorization");
  if (token) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: authLoader,
    element: <HomePage />,
  },
  {
    path: "/about",
    loader: authLoader,
    element: <AboutPage />,
  },
  {
    path: "/counter",
    loader: authLoader,
    element: <CounterPage />,
  },
  {
    path: "/auth",
    loader: publicLoader,
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
