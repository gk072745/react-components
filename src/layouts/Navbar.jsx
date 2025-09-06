import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUser.store';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/customHooks/useAppContext';

const Navbar = ({ onToggleSidePanel }) => {
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
          <button
            onClick={onToggleSidePanel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#333',
              padding: '8px',
              borderRadius: '4px',
              marginRight: '15px',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={e => (e.target.style.backgroundColor = 'transparent')}
            aria-label="Toggle side panel"
          >
            ☰
          </button>
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img width={40} height={40} src={appImages['react.svg']} alt="React Components" />
            <div style={{ marginLeft: '10px', lineHeight: '1.2' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>React</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '500', color: '#666' }}>Components</div>
            </div>
          </Link>
        </div>

        {/* Navigation moved to side panel */}

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
