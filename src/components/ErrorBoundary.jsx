import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleError = errorEvent => {
      console.error('Error captured by boundary:', errorEvent.error, errorEvent);

      setHasError(true);
      setErrorMessage(errorEvent.error?.message || 'An unexpected error occurred');

      // Prevent the error from propagating further
      errorEvent.preventDefault();
    };

    const handleUnhandledRejection = rejectionEvent => {
      console.error('Unhandled promise rejection captured:', rejectionEvent.reason);

      setHasError(true);
      setErrorMessage(rejectionEvent.reason?.message || 'An unexpected error occurred');
    };

    // Add global error listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const retry = () => {
    setHasError(false);
    setErrorMessage('');
  };

  if (hasError) {
    return (
      <div className="error-boundary">
        <h3>Something went wrong</h3>
        <p>{errorMessage}</p>
        <button onClick={retry} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
