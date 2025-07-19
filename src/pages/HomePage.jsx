import { useEffect, useState } from 'react';
import CircularProgressBar from '../components/sharedComponents/CircularProgressBar';
import ScrollObserver from '../components/sharedComponents/ScrollObserver';
import BasicPopup from '../components/sharedComponents/BasicPopup';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleScroll = () => {
    console.log('scrolled to end');
  };

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
            <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>
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
