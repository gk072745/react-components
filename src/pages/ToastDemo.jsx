import React from 'react';
import { useToast } from '@/customHooks/useToast';

export default function ToastDemo() {
  const {
    success,
    error,
    warning,
    info,
    setPosition,
    setOffset,
    setDefaultTimeout,
    clearAll,
    defaultConfig,
  } = useToast();

  return (
    <div className="toast-demo">
      <h1>Toast Demo</h1>

      <section className="demo-section">
        <h3>Quick Triggers</h3>
        <div className="row">
          <button onClick={() => success('Saved successfully!')}>Success</button>
          <button onClick={() => error('Something went wrong', { secondaryMessage: 'Please try again' })}>Error</button>
          <button onClick={() => warning('Be careful...', { timeout: 3000 })}>Warning</button>
          <button onClick={() => info('Just FYI')}>Info</button>
        </div>
      </section>

      <section className="demo-section">
        <h3>Positions</h3>
        <div className="row">
          <button onClick={() => {
            setPosition('top-left');
            info('Position set to top-left');
          }}>Top-Left</button>
          <button onClick={() => {
            setPosition('top');
            info('Position set to top');
          }}>Top</button>
          <button onClick={() => {
            setPosition('top-right');
            info('Position set to top-right');
          }}>Top-Right</button>
          <button onClick={() => {
            setPosition('bottom-left');
            info('Position set to bottom-left');
          }}>Bottom-Left</button>
          <button onClick={() => {
            setPosition('bottom');
            info('Position set to bottom');
          }}>Bottom</button>
          <button onClick={() => {
            setPosition('bottom-right');
            info('Position set to bottom-right');
          }}>Bottom-Right</button>
        </div>
      </section>

      <section className="demo-section">
        <h3>Offset Examples</h3>
        <div className="row">
          <button onClick={() => {
            setPosition('top-left');
            setOffset(1, 1);
            info('Top-Left: 1rem from top, 1rem from left', { 
              timeout: 3000,
              position: 'top-left'
            });
          }}>Top-Left (1,1)</button>
          <button onClick={() => {
            setPosition('top');
            setOffset(2, 0);
            info('Top: 2rem from top, centered', { 
              timeout: 3000,
              position: 'top'
            });
          }}>Top (2,0)</button>
          <button onClick={() => {
            setPosition('top-right');
            setOffset(1, 3);
            info('Top-Right: 1rem from top, 3rem from right', { 
              timeout: 3000,
              position: 'top-right'
            });
          }}>Top-Right (1,3)</button>
          <button onClick={() => {
            setPosition('bottom-left');
            setOffset(2, 1);
            info('Bottom-Left: 2rem from bottom, 1rem from left', { 
              timeout: 3000,
              position: 'bottom-left'
            });
          }}>Bottom-Left (2,1)</button>
          <button onClick={() => {
            setPosition('bottom');
            setOffset(1, 0);
            info('Bottom: 1rem from bottom, centered', { 
              timeout: 3000,
              position: 'bottom'
            });
          }}>Bottom (1,0)</button>
          <button onClick={() => {
            setPosition('bottom-right');
            setOffset(3, 2);
            info('Bottom-Right: 3rem from bottom, 2rem from right', { 
              timeout: 3000,
              position: 'bottom-right'
            });
          }}>Bottom-Right (3,2)</button>
        </div>
      </section>

      <section className="demo-section">
        <h3>Timeout Examples</h3>
        <div className="row">
          <button onClick={() => {
            setDefaultTimeout(1000);
            info('This toast will hide in 1 second', { 
              timeout: 1000,
              position: defaultConfig.position
            });
          }}>Timeout 1s</button>
          <button onClick={() => {
            setDefaultTimeout(2000);
            info('This toast will hide in 2 seconds', { 
              timeout: 2000,
              position: defaultConfig.position
            });
          }}>Timeout 2s</button>
          <button onClick={() => {
            setDefaultTimeout(5000);
            info('This toast will hide in 5 seconds', { 
              timeout: 5000,
              position: defaultConfig.position
            });
          }}>Timeout 5s</button>
          <button onClick={() => {
            setDefaultTimeout(10000);
            info('This toast will hide in 10 seconds', { 
              timeout: 10000,
              position: defaultConfig.position
            });
          }}>Timeout 10s</button>
        </div>
      </section>

      <section className="demo-section">
        <h3>Independent Toasts</h3>
        <div className="row">
          <button onClick={() => {
            success('Success in top-left', { position: 'top-left', timeout: 4000 });
            error('Error in top-right', { position: 'top-right', timeout: 6000 });
            warning('Warning in bottom-left', { position: 'bottom-left', timeout: 3000 });
            info('Info in bottom-right', { position: 'bottom-right', timeout: 5000 });
          }}>Show All Positions</button>
          <button onClick={() => {
            success('Quick success (2s)', { timeout: 2000 });
            warning('Slow warning (8s)', { timeout: 8000 });
          }}>Different Timeouts</button>
        </div>
      </section>

      <section className="demo-section">
        <h3>Actions</h3>
        <div className="row">
          <button onClick={clearAll}>Clear All</button>
        </div>
      </section>
    </div>
  );
}


