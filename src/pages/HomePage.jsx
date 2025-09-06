import { useEffect, useState } from 'react';
import CircularProgressBar from '../components/sharedComponents/CircularProgressBar';
import ScrollObserver from '../components/sharedComponents/ScrollObserver';
import BasicPopup from '../components/sharedComponents/BasicPopup';
import { useTranslation } from 'react-i18next';
import { useCommonUtilities } from '@/customHooks/useCommonUtilities';

const HomePage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { goToRoute } = useCommonUtilities();

  const throwError = () => {
    throw new Error('This is a test error');
  };

  const handleScroll = () => {
    console.log('scrolled to end');
  };

  // Navigation handlers removed - now handled by side panel

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      {isLoading ? (
        <CircularProgressBar />
      ) : (
        <div className="home-page-content">
          <div className="welcome-container">
            <h1 className="welcome-title">{t('welcome')}</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
              Welcome to the React Components Library. Use the menu button (☰) in the top-left corner to navigate
              between different component demos.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsPopupOpen(true)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#0056b3')}
                onMouseLeave={e => (e.target.style.backgroundColor = '#007bff')}
              >
                Open Popup
              </button>
              <button
                onClick={throwError}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = '#c82333')}
                onMouseLeave={e => (e.target.style.backgroundColor = '#dc3545')}
              >
                Throw Error
              </button>
            </div>
          </div>
          <ScrollObserver onScrolledToEnd={handleScroll} />
        </div>
      )}

      {isPopupOpen && (
        <BasicPopup onPopupOutsideClick={() => setIsPopupOpen(false)}>
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
          </div>
        </BasicPopup>
      )}
    </div>
  );
};

export default HomePage;
