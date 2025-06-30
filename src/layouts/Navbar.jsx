import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUser.store';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/customHooks/useAppContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { t, i18n } = useTranslation();
  const { appImages } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <img width={100} height={100} src={appImages['altersquare.png']} alt="Logo" />
          </Link>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/counter" className={`nav-link ${location.pathname === '/counter' ? 'active' : ''}`}>
              Counter
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button onClick={handleLogout} className="btn btn-outline-primary">
            Logout
          </button>
          <button
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
            className="btn btn-outline-primary"
          >
            {t('language')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
