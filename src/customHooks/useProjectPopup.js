import { useState, useCallback, useEffect } from 'react';

// Global state for popup
let globalIsPopupVisible = false;
let globalConfig = {};

// Global listeners for state changes
const listeners = new Set();

// Notify all listeners of state changes
const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

// Generate unique ID for each popup
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Initial configuration
const initialConfig = () => {
  return {
    width: '24.1875rem',
    height: '7.9375rem',
    showOverlay: true,
    closeOnOverlayClick: true,
    enableAnimation: true,
    showHeader: true,
    title: '',
    content: '',
    buttonConfig: {
      isVisible: true,
      position: 'right',
      buttons: [
        {
          icon: '',
          buttonText: 'Cancel',
          isDisabled: false,
          classNames: ['white-btn'],
          callback: null,
        },
        {
          icon: '',
          buttonText: 'Delete',
          isDisabled: false,
          classNames: ['red-btn'],
          callback: null,
        },
      ],
    },
    customClass: '',
    onClose: null,
  };
};

// Close popup function (needs to be defined before use in initialConfig)
const closePopup = (reason = 'manual') => {
  if (globalConfig?.onClose) {
    globalConfig.onClose(reason);
  }
  globalIsPopupVisible = false;
  globalConfig = initialConfig();
  notifyListeners();
};

export function useProjectPopup() {
  const [isPopupVisible, setIsPopupVisible] = useState(globalIsPopupVisible);
  const [config, setConfig] = useState(globalConfig);

  // Subscribe to global state changes
  useEffect(() => {
    const listener = () => {
      setIsPopupVisible(globalIsPopupVisible);
      setConfig({ ...globalConfig });
    };

    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  // Configuration methods
  const setCloseOnOverlayClick = useCallback((value) => {
    globalConfig.closeOnOverlayClick = value;
    setConfig({ ...globalConfig });
    notifyListeners();
  }, []);

  const setEnableAnimation = useCallback((value) => {
    globalConfig.enableAnimation = value;
    setConfig({ ...globalConfig });
    notifyListeners();
  }, []);

  // Close popup
  const onClosePopup = useCallback((reason = 'manual') => {
    closePopup(reason);
  }, []);

  // Overlay click
  const onOverlayClick = useCallback((event, reason = 'overlayClick') => {
    if (globalConfig?.closeOnOverlayClick) {
      closePopup(reason);
    }
  }, []);

  // Show popup
  const onShowPopup = useCallback((options = {}) => {
    // Create popup object
    const newConfig = {
      id: generateId(),
      createdAt: Date.now(),
      ...options,
    };

    // Set the popup (replaces any existing popup)
    globalConfig = Object.assign(initialConfig(), newConfig);

    // Show the popup
    globalIsPopupVisible = true;

    // Notify listeners
    setIsPopupVisible(true);
    setConfig({ ...globalConfig });
    notifyListeners();

    return globalConfig;
  }, []);

  return {
    // State
    isPopupVisible,
    config,

    // Methods
    onShowPopup,
    onClosePopup,
    onOverlayClick,

    // Configuration Methods
    setCloseOnOverlayClick,
    setEnableAnimation,
  };
}
