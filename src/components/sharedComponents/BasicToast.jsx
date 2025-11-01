import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useToast } from '@/customHooks/useToast';
import { useRemToPixels } from '@/customHooks/useRemToPixels';

const positions = new Set(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']);

// Individual Toast Component with Animation
function AnimatedToast({ notification, onRemove, position, index }) {
  const [animationState, setAnimationState] = useState('enter');
  const [isVisible, setIsVisible] = useState(true);

  const startExitAnimation = useCallback(() => {
    setAnimationState('exit');
    setTimeout(() => {
      setAnimationState('exit-active');
      setTimeout(() => {
        setIsVisible(false);
        onRemove(notification);
      }, 300); // Match CSS transition duration
    }, 10);
  }, [notification, onRemove]);

  const handleRemove = useCallback(() => {
    startExitAnimation();
  }, [startExitAnimation]);

  useEffect(() => {
    // Start enter animation
    const enterTimer = setTimeout(() => {
      setAnimationState('enter-active');
    }, 10);

    return () => clearTimeout(enterTimer);
  }, []);

  // Handle automatic removal (timeout)
  useEffect(() => {
    if (notification.shouldRemove && animationState === 'enter-active') {
      startExitAnimation();
    }
  }, [notification.shouldRemove, animationState, startExitAnimation]);

  if (!isVisible) return null;

  return (
    <div 
      className={[
        "toast-notification", 
        `position-${position}`,
        animationState,
        ...notification.notificationClass
      ].join(' ')}
    >
      <div className="toast-content">
        {notification.iconRef ? (
          <div className="toast-icon" dangerouslySetInnerHTML={{ __html: notification.iconRef }} />
        ) : null}
        <div className="toast-messages">
          <div className="toast-primary-message">{notification.primaryMessage}</div>
          {notification.secondaryMessage ? (
            <div className="toast-secondary-message">{notification.secondaryMessage}</div>
          ) : null}
        </div>
        {notification.showCloseButton ? (
          <button 
            className="toast-close-button" 
            aria-label="Close notification" 
            onClick={handleRemove}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function OToast() {
  const { notifications, removeNotification } = useToast();
  const { convertRemToPixels } = useRemToPixels();

  // Group notifications by position and sort by creation time
  const notificationsByPosition = useMemo(() => {
    const grouped = {};
    notifications.forEach(notification => {
      const position = notification.position || 'bottom-right';
      if (!grouped[position]) {
        grouped[position] = [];
      }
      grouped[position].push(notification);
    });
    
    // Sort notifications by creation time (newest first for proper stacking)
    Object.keys(grouped).forEach(position => {
      grouped[position].sort((a, b) => b.createdAt - a.createdAt);
    });
    
    return grouped;
  }, [notifications]);

  // Get container style for a specific position
  const getContainerStyle = useCallback((position, offset) => {
    const { x, y } = offset;
    const pxX = convertRemToPixels ? convertRemToPixels(x) : x * 16;
    const pxY = convertRemToPixels ? convertRemToPixels(y) : y * 16;
    const pos = positions.has(position) ? position : 'bottom-right';
    const styles = {};
    
    switch (pos) {
      case 'top-right': 
        styles.top = pxX; // First offset = top
        styles.right = pxY; // Second offset = right
        break;
      case 'top-left': 
        styles.top = pxX; // First offset = top
        styles.left = pxY; // Second offset = left
        break;
      case 'top': 
        styles.top = pxX; // First offset = top
        styles.left = '50%'; 
        styles.transform = 'translateX(-50%)'; 
        break;
      case 'bottom-left': 
        styles.bottom = pxX; // First offset = bottom
        styles.left = pxY; // Second offset = left
        break;
      case 'bottom': 
        styles.bottom = pxX; // First offset = bottom
        styles.left = '50%'; 
        styles.transform = 'translateX(-50%)'; 
        break;
      case 'bottom-right': 
      default: 
        styles.bottom = pxX; // First offset = bottom
        styles.right = pxY; // Second offset = right
        break;
    }
    return styles;
  }, [convertRemToPixels]);

  if (!notifications || notifications.length === 0) return null;

  return (
    <>
      {Object.entries(notificationsByPosition).map(([position, positionNotifications]) => {
        const firstNotification = positionNotifications[0];
        const containerStyle = getContainerStyle(position, firstNotification.offset);
        
        return (
          <div key={position} className={`toast-container position-${position}`} style={containerStyle}>
            <div className="toast-stack">
              {positionNotifications.map((n, index) => (
                <AnimatedToast
                  key={n.id}
                  notification={n}
                  position={position}
                  index={index}
                  onRemove={removeNotification}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}


