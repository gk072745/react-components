import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useProjectPopup } from '@/customHooks/useProjectPopup';
import '@/assets/scss/components/_basic-project-popup.scss';

const BasicProjectPopup = memo(() => {
  const { isPopupVisible, config, onClosePopup, onOverlayClick } = useProjectPopup();
  const { t } = useTranslation();

  const getI18nText = (text) => {
    // Check if translation exists, if not return the text as-is
    try {
      const translated = t(text);
      // If translation returns the same key, it means translation doesn't exist
      return translated !== text ? translated : text;
    } catch {
      return text;
    }
  };

  const handleButtonClick = (button) => {
    if (button?.callback && typeof button.callback === 'function') {
      button.callback(button);
    }
    onClosePopup();
  };

  if (!isPopupVisible) {
    return null;
  }

  return (
    <div
      className={`default-pop-over-styles ${config.showOverlay ? 'show-overlay' : ''}`}
      onClick={(e) => onOverlayClick(e, 'overlayClick')}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div
        className={`popup-body ${config.customClass || ''}`}
        style={{ width: config.width, height: config.height }}
        onClick={(e) => e.stopPropagation()}
      >
        {config?.showHeader && (
          <div className="popup-header-container">
            {config?.title && <div className="popup-title">{getI18nText(config.title)}</div>}
            <svg
              className="close-icon"
              onClick={onClosePopup}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.9999 16.9999L12 12M12 12L7 7M12 12L17 7M12 12L7 17"
                stroke="black"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        <div className="popup-content-container">
          {/* Content */}
          {config.content && (
            <div
              className="project-popup-content"
              dangerouslySetInnerHTML={{ __html: getI18nText(config.content) }}
            />
          )}

          {/* Footer buttons */}
          {config?.buttonConfig?.isVisible && (
            <div
              className={`popup-actions ${config?.buttonConfig?.position || 'right'}`}
            >
              {config.buttonConfig.buttons?.map((button, index) => (
                <div
                  key={index}
                  className={`popup-button ${button.classNames?.join(' ') || ''} ${button.isDisabled ? 'disabled' : ''}`}
                  onClick={() => !button.isDisabled && handleButtonClick(button)}
                >
                  {button.icon && (
                    <div
                      className="project-popup-button-icon-wrapper"
                      dangerouslySetInnerHTML={{ __html: button.icon }}
                    />
                  )}
                  {button.buttonText && (
                    <span className="project-popup-button-text">{getI18nText(button.buttonText)}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

BasicProjectPopup.displayName = 'BasicProjectPopup';

export default BasicProjectPopup;

