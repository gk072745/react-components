import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import BasicPopup from './BasicPopup';
import BasicBreadCrumb from './BasicBreadCrumb';

const SidePanel = ({ isOpen, onToggle, className = '', style = {} }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigationItems = useMemo(
    () => [
      {
        path: '/',
        label: 'Home',
        icon: '🏠',
      },
      {
        path: '/accordion',
        label: 'Accordion',
        icon: '📋',
      },
      {
        path: '/checkbox',
        label: 'Checkbox',
        icon: '☑️',
      },
      {
        path: '/chip',
        label: 'Chip',
        icon: '🏷️',
      },
      {
        path: '/radio',
        label: 'Radio',
        icon: '🔘',
      },
      {
        path: '/range',
        label: 'Range',
        icon: '📊',
      },
      {
        path: '/slider',
        label: 'Slider',
        icon: '🎚️',
      },
      {
        path: '/breadcrumb',
        label: 'Breadcrumb',
        icon: '🍞',
      },
      {
        path: '/linear-progress',
        label: 'Linear Progress',
        icon: '📊',
      },
      {
        path: '/loader',
        label: 'Loader',
        icon: '⏳',
      },
      {
        path: null, // No path for popup button
        label: 'Popup Example',
        icon: '💬',
        isPopup: true,
      },
    ],
    []
  );

  const isActive = path => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="side-panel-overlay"
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0, // Start from very top
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000, // Higher than navbar but lower than side panel
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Side Panel */}
      <div
        className={`side-panel ${isOpen ? 'side-panel-open' : ''} ${className}`}
        style={{
          position: 'fixed',
          top: 0, // Start from very top
          left: isOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh', // Full viewport height
          backgroundColor: '#ffffff',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1030, // Higher than navbar z-index
          transition: 'left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {/* Header */}
        <div
          className="side-panel-header"
          style={{
            padding: '20px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>Components</h2>
            <button
              onClick={onToggle}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666',
                padding: '5px',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={e => (e.target.style.backgroundColor = 'transparent')}
            >
              ✕
            </button>
          </div>

          {/* Breadcrumb Navigation */}
          <BasicBreadCrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Components', to: null, disabled: true },
            ]}
            separator="›"
            gap="0.25rem"
          />
        </div>

        {/* Navigation Items */}
        <nav className="side-panel-nav" style={{ padding: '10px 0', flex: 1, overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navigationItems.map(item => (
              <li key={item.path || item.label}>
                {item.isPopup ? (
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="side-panel-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      textDecoration: 'none',
                      color: '#333',
                      backgroundColor: 'transparent',
                      borderLeft: '4px solid transparent',
                      transition: 'all 0.2s ease',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      border: 'none',
                      width: '100%',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                      e.target.style.backgroundColor = '#f8f9fa';
                      e.target.style.color = '#007bff';
                    }}
                    onMouseLeave={e => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#333';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', marginRight: '12px', width: '20px', textAlign: 'center' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={onToggle}
                    className={`side-panel-link ${isActive(item.path) ? 'side-panel-link-active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      textDecoration: 'none',
                      color: isActive(item.path) ? '#007bff' : '#333',
                      backgroundColor: isActive(item.path) ? '#f8f9fa' : 'transparent',
                      borderLeft: isActive(item.path) ? '4px solid #007bff' : '4px solid transparent',
                      transition: 'all 0.2s ease',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                    }}
                    onMouseEnter={e => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = '#f8f9fa';
                        e.target.style.color = '#007bff';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#333';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', marginRight: '12px', width: '20px', textAlign: 'center' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="side-panel-footer"
          style={{
            padding: '20px',
            borderTop: '1px solid #e0e0e0',
            marginTop: 'auto',
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem',
          }}
        >
          <p style={{ margin: 0 }}>React Components Library</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>Version 1.0.0</p>
        </div>
      </div>

      {/* Popup Example */}
      {isPopupOpen && (
        <BasicPopup onPopupOutsideClick={() => setIsPopupOpen(false)}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              maxWidth: '400px',
              width: '90vw',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                margin: '0 0 15px 0',
                color: '#333',
                fontSize: '1.3rem',
              }}
            >
              🎉 Side Panel Popup!
            </h3>
            <p
              style={{
                margin: '0 0 20px 0',
                color: '#666',
                lineHeight: '1.5',
              }}
            >
              This is a popup example within the side panel. You can use this to show additional information, forms, or
              any other content.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setIsPopupOpen(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#0056b3')}
                onMouseLeave={e => (e.target.style.backgroundColor = '#007bff')}
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Action performed!');
                  setIsPopupOpen(false);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#218838')}
                onMouseLeave={e => (e.target.style.backgroundColor = '#28a745')}
              >
                Action
              </button>
            </div>
          </div>
        </BasicPopup>
      )}
    </>
  );
};

SidePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SidePanel;
