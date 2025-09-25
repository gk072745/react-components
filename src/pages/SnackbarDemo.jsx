import React, { useState } from 'react';
import { useSnackbar } from '../customHooks/useSnackbar';
import BasicSnackbar from '../components/sharedComponents/BasicSnackbar';
import '@/assets/scss/pages/_snackbar-demo.scss';

const SnackbarDemo = () => {
  const { 
    success, 
    error, 
    warning, 
    info, 
    showSnackbar, 
    clearAll,
    setPosition, 
    setOffset, 
    setDefaultTimeout 
  } = useSnackbar();
  
  const [selectedPosition, setSelectedPosition] = useState('bottom');
  const [xOffset, setXOffset] = useState(1);
  const [yOffset, setYOffset] = useState(1);
  const [timeoutValue, setTimeoutValue] = useState(4000);
  const [customMessage, setCustomMessage] = useState('');
  const [customSecondaryMessage, setCustomSecondaryMessage] = useState('');
  const [customTimeout, setCustomTimeout] = useState(4000);

  const positions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top', label: 'Top Center' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom', label: 'Bottom Center' },
    { value: 'bottom-right', label: 'Bottom Right' }
  ];

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
    setPosition(position);
  };

  const handleShowCustom = (type) => {
    const message = customMessage || `Custom ${type} message`;
    const secondaryMessage = customSecondaryMessage || null;
    
    switch (type) {
      case 'success':
        success(message, { secondaryMessage, timeout: customTimeout });
        break;
      case 'error':
        error(message, { secondaryMessage, timeout: customTimeout });
        break;
      case 'warning':
        warning(message, { secondaryMessage, timeout: customTimeout });
        break;
      case 'info':
        info(message, { secondaryMessage, timeout: customTimeout });
        break;
    }
  };

  // Simple usage examples
  const showSuccessSnackbar = () => {
    success('Operation completed successfully!');
  };

  const showErrorSnackbar = () => {
    error('Something went wrong', {
      secondaryMessage: 'Please try again later'
    });
  };

  const showWarningSnackbar = () => {
    warning('This action cannot be undone', {
      secondaryMessage: 'Please proceed with caution'
    });
  };

  const showInfoSnackbar = () => {
    info('New update available', {
      secondaryMessage: 'Click here to learn more'
    });
  };

  // Position override examples
  const showTopRightSuccess = () => {
    success('Success message with top-right position!', {
      position: 'top-right'
    });
  };

  const showTopLeftError = () => {
    error('Error message with top-left position!', {
      position: 'top-left',
      secondaryMessage: 'This error appears in top-left'
    });
  };

  const showTopWarning = () => {
    warning('Warning message with top center position!', {
      position: 'top'
    });
  };

  const showBottomRightInfo = () => {
    info('Info message with bottom-right position!', {
      position: 'bottom-right',
      secondaryMessage: 'This info appears in bottom-right'
    });
  };

  const showBottomLeftWarning = () => {
    warning('Warning message with bottom-left position!', {
      position: 'bottom-left',
      secondaryMessage: 'This warning appears in bottom-left'
    });
  };

  const showBottomInfo = () => {
    info('Info message with bottom center position!', {
      position: 'bottom',
      secondaryMessage: 'This info appears in bottom center'
    });
  };

  // Custom snackbar with all options
  const showCustomSnackbar = () => {
    showSnackbar({
      type: 'info', // Using info as base type
      primaryMessage: 'Custom snackbar',
      secondaryMessage: 'With custom settings',
      timeout: 10000,
      isPersistent: false,
      showCloseButton: true,
      icon: '🚀'
    });
  };

  const clearSnackbar = () => {
    clearAll();
  };

  // Configuration examples
  const changePosition = (position) => {
    setSelectedPosition(position);
    setPosition(position);
  };

  const changeOffset = (x, y) => {
    setXOffset(x);
    setYOffset(y);
    setOffset(x, y);
  };

  const changeTimeout = (timeout) => {
    setTimeoutValue(timeout);
    setDefaultTimeout(timeout);
  };

  return (
    <div className="snackbar-demo">
      <h1>Snackbar Notifications Demo</h1>
      <a href="/demos">← Back</a>
      
      <section className="demo-section">
        <h2>Basic Snackbar Types</h2>
        <div className="button-group">
          <button className="demo-button success" onClick={showSuccessSnackbar}>
            Show Success
          </button>
          <button className="demo-button error" onClick={showErrorSnackbar}>
            Show Error
          </button>
          <button className="demo-button warning" onClick={showWarningSnackbar}>
            Show Warning
          </button>
          <button className="demo-button info" onClick={showInfoSnackbar}>
            Show Info
          </button>
          <button className="demo-button custom" onClick={showCustomSnackbar}>
            Show Custom
          </button>
          <button className="demo-button clear" onClick={clearSnackbar}>
            Clear
          </button>
        </div>
        <p>Click the buttons above to show different types of snackbar notifications.</p>
      </section>

      <section className="demo-section">
        <h2>Position Override Examples</h2>
        <div className="button-group">
          <button className="demo-button success" onClick={showTopRightSuccess}>
            Success (Top Right)
          </button>
          <button className="demo-button error" onClick={showTopLeftError}>
            Error (Top Left)
          </button>
          <button className="demo-button warning" onClick={showTopWarning}>
            Warning (Top Center)
          </button>
          <button className="demo-button info" onClick={showBottomRightInfo}>
            Info (Bottom Right)
          </button>
          <button className="demo-button warning" onClick={showBottomLeftWarning}>
            Warning (Bottom Left)
          </button>
          <button className="demo-button info" onClick={showBottomInfo}>
            Info (Bottom Center)
          </button>
        </div>
        <p>These examples show how to override the position for individual notifications.</p>
      </section>

      <section className="demo-section">
        <h2>Snackbar with Secondary Message</h2>
        <div className="demo-group">
          <button 
            className="demo-button success" 
            onClick={() => success('File uploaded successfully!', { 
              secondaryMessage: 'Your document has been processed and is ready for review.' 
            })}
          >
            Success with Details
          </button>
          <button 
            className="demo-button error" 
            onClick={() => error('Upload failed!', { 
              secondaryMessage: 'Please check your internet connection and try again.' 
            })}
          >
            Error with Details
          </button>
          <button 
            className="demo-button warning" 
            onClick={() => warning('Storage almost full!', { 
              secondaryMessage: 'You have used 85% of your available storage space.' 
            })}
          >
            Warning with Details
          </button>
          <button 
            className="demo-button info" 
            onClick={() => info('New feature available!', { 
              secondaryMessage: 'Check out the new dashboard layout in the settings menu.' 
            })}
          >
            Info with Details
          </button>
        </div>
        <p>These snackbars include secondary messages with additional details.</p>
      </section>

      <section className="demo-section">
        <h2>Position Configuration: <span>{selectedPosition}</span></h2>
        <div className="button-group">
          <button className="demo-button" onClick={() => changePosition('top-right')}>
            Top Right
          </button>
          <button className="demo-button" onClick={() => changePosition('top-left')}>
            Top Left
          </button>
          <button className="demo-button" onClick={() => changePosition('top')}>
            Top
          </button>
          <button className="demo-button" onClick={() => changePosition('bottom-right')}>
            Bottom Right
          </button>
          <button className="demo-button" onClick={() => changePosition('bottom-left')}>
            Bottom Left
          </button>
          <button className="demo-button" onClick={() => changePosition('bottom')}>
            Bottom
          </button>
        </div>
        <p>Change the global position configuration for all snackbars.</p>
      </section>

      <section className="demo-section">
        <h2>X & Y Offset in Rems: <span>({xOffset}, {yOffset})</span></h2>
        <div className="button-group">
          <button className="demo-button" onClick={() => changeOffset(1, 1)}>
            (1,1)
          </button>
          <button className="demo-button" onClick={() => changeOffset(2, 2)}>
            (2,2)
          </button>
          <button className="demo-button" onClick={() => changeOffset(3, 3)}>
            (3,3)
          </button>
          <button className="demo-button" onClick={() => changeOffset(1, 3)}>
            (1,3)
          </button>
        </div>
        <p>Adjust the offset from the screen edges in rem units.</p>
      </section>

      <section className="demo-section">
        <h2>Timeout Configuration: <span>{timeoutValue}ms</span></h2>
        <div className="button-group">
          <button className="demo-button" onClick={() => changeTimeout(2000)}>
            2s
          </button>
          <button className="demo-button" onClick={() => changeTimeout(4000)}>
            4s
          </button>
          <button className="demo-button" onClick={() => changeTimeout(6000)}>
            6s
          </button>
          <button className="demo-button" onClick={() => changeTimeout(8000)}>
            8s
          </button>
        </div>
        <p>Set the default timeout duration for auto-dismissing snackbars.</p>
      </section>

      <section className="demo-section">
        <h2>Custom Messages</h2>
        <div className="demo-group">
          <div className="custom-message-controls">
            <div className="input-group">
              <label htmlFor="custom-message">Primary Message:</label>
              <input
                id="custom-message"
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter custom message..."
                className="demo-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="custom-secondary">Secondary Message (optional):</label>
              <input
                id="custom-secondary"
                type="text"
                value={customSecondaryMessage}
                onChange={(e) => setCustomSecondaryMessage(e.target.value)}
                placeholder="Enter secondary message..."
                className="demo-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="custom-timeout">Timeout (ms):</label>
              <input
                id="custom-timeout"
                type="number"
                value={customTimeout}
                onChange={(e) => setCustomTimeout(parseInt(e.target.value) || 4000)}
                min="1000"
                max="10000"
                step="1000"
                className="demo-input"
              />
            </div>
          </div>
          <div className="custom-buttons">
            <button 
              className="demo-button success" 
              onClick={() => handleShowCustom('success')}
            >
              Custom Success
            </button>
            <button 
              className="demo-button error" 
              onClick={() => handleShowCustom('error')}
            >
              Custom Error
            </button>
            <button 
              className="demo-button warning" 
              onClick={() => handleShowCustom('warning')}
            >
              Custom Warning
            </button>
            <button 
              className="demo-button info" 
              onClick={() => handleShowCustom('info')}
            >
              Custom Info
            </button>
          </div>
        </div>
        <p>Create custom snackbar messages with your own text and timing.</p>
      </section>

      <section className="demo-section">
        <h2>Persistent Snackbars</h2>
        <div className="demo-group">
          <button 
            className="demo-button error" 
            onClick={() => error('Critical error occurred!', { 
              isPersistent: true,
              secondaryMessage: 'This error requires immediate attention and will not auto-dismiss.' 
            })}
          >
            Persistent Error
          </button>
          <button 
            className="demo-button warning" 
            onClick={() => warning('Important notice!', { 
              isPersistent: true,
              secondaryMessage: 'Please read this important information before proceeding.' 
            })}
          >
            Persistent Warning
          </button>
        </div>
        <p>These snackbars will not auto-dismiss and require manual closing.</p>
      </section>

      <section className="demo-section">
        <h2>Snackbar vs Toast</h2>
        <div className="info-section">
          <p>
            <strong>Snackbar:</strong> Single notification that replaces previous ones. 
            Perfect for status updates, confirmations, and brief messages.
          </p>
          <p>
            <strong>Toast:</strong> Stackable notifications. 
            Great for multiple simultaneous alerts or when users need to see message history.
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Snackbar Features</h2>
        <div className="features-list">
          <ul>
            <li>✅ <strong>Multiple Types:</strong> Success, Error, Warning, and Info notifications</li>
            <li>✅ <strong>Flexible Positioning:</strong> 6 different positions (top/bottom + left/center/right)</li>
            <li>✅ <strong>Secondary Messages:</strong> Support for detailed descriptions</li>
            <li>✅ <strong>Auto-dismiss:</strong> Configurable timeout with manual close option</li>
            <li>✅ <strong>Persistent Mode:</strong> Notifications that require manual dismissal</li>
            <li>✅ <strong>Custom Icons:</strong> Built-in icons for each notification type</li>
            <li>✅ <strong>Responsive Design:</strong> Adapts to different screen sizes</li>
            <li>✅ <strong>Accessibility:</strong> Proper ARIA labels and keyboard support</li>
            <li>✅ <strong>Global State:</strong> Single notification system across the app</li>
            <li>✅ <strong>Easy Integration:</strong> Simple hook-based API for React components</li>
          </ul>
        </div>
      </section>

      {/* Render the snackbar component */}
      <BasicSnackbar />
    </div>
  );
};

export default SnackbarDemo;
