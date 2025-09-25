import React, { useMemo } from 'react';
import { useSnackbar } from '../../customHooks/useSnackbar';
import '@/assets/scss/components/_basic-snackbar.scss';

const BasicSnackbar = () => {
  const { notification, config, hasNotification, removeNotification, convertRemToPixels } = useSnackbar();

  // Handle close notification
  const closeNotification = () => {
    // You can add any additional logic here before removing
    // For example: analytics, logging, etc.
    removeNotification();
  };

  // Use individual notification position or fall back to global config
  const notificationPosition = useMemo(() => {
    return notification?.position || config.position;
  }, [notification?.position, config.position]);

  const containerStyle = useMemo(() => {
    let { x, y } = config.offset;

    // Convert rem to pixels
    x = convertRemToPixels ? convertRemToPixels(x) : x * parseInt(getComputedStyle(document.documentElement).fontSize);
    y = convertRemToPixels ? convertRemToPixels(y) : y * parseInt(getComputedStyle(document.documentElement).fontSize);

    // Use individual notification position or fall back to global config
    const position = notification?.position || config.position;
    const styles = {};

    // Apply positioning based on notification position
    switch (position) {
      case 'top-right':
        styles.top = `${y}px`;
        styles.right = `${x}px`;
        break;
      case 'top-left':
        styles.top = `${y}px`;
        styles.left = `${x}px`;
        break;
      case 'top':
        styles.top = `${y}px`;
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        break;
      case 'bottom-right':
        styles.bottom = `${y}px`;
        styles.right = `${x}px`;
        break;
      case 'bottom-left':
        styles.bottom = `${y}px`;
        styles.left = `${x}px`;
        break;
      case 'bottom':
        styles.bottom = `${y}px`;
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        break;
    }

    return styles;
  }, [config.offset, notification?.position, config.position, convertRemToPixels]);

  // Don't render if no notification
  if (!hasNotification || !notification) {
    return null;
  }

  return (
    <div 
      className={`snackbar-container position-${notificationPosition}`}
      style={containerStyle}
    >
      <div
        className={`snackbar-notification ${notification.notificationClass.join(' ')}`}
      >
        <div className="snackbar-content">
          {notification.iconRef && (
            <div 
              className="snackbar-icon" 
              dangerouslySetInnerHTML={{ __html: notification.iconRef }}
            />
          )}
          <div className="snackbar-messages">
            <div className="snackbar-primary-message">{notification.primaryMessage}</div>
            {notification.secondaryMessage && (
              <div className="snackbar-secondary-message">
                {notification.secondaryMessage}
              </div>
            )}
          </div>
          {notification.showCloseButton && (
            <button
              onClick={closeNotification}
              className="snackbar-close-button"
              aria-label="Close notification"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicSnackbar;
