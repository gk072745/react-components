import React, { useState, useEffect } from 'react';
import Loader from '../components/sharedComponents/Loader';

const LoaderDemo = () => {
  const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
  const [showLocalLoader, setShowLocalLoader] = useState(false);
  const [customSize, setCustomSize] = useState(40);
  const [customWidth, setCustomWidth] = useState(4);

  // Auto-hide full screen loader after 3 seconds
  useEffect(() => {
    if (showFullScreenLoader) {
      const timer = setTimeout(() => {
        setShowFullScreenLoader(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFullScreenLoader]);

  return (
    <div className="loader-demo">
      <h1>Loader Component Demo</h1>

      {/* Basic Usage */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <div className="demo-group">
          <div style={{ position: 'relative', height: '200px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader />
            <p>Default loader with local positioning</p>
          </div>
        </div>
        <p>Default size (40px) with standard colors and local positioning</p>
      </section>

      {/* Size Variants */}
      <section className="demo-section">
        <h2>Size Variants</h2>
        <div className="demo-group">
          <h3>Small (20px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={20} />
          </div>

          <h3>Default (40px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={40} />
          </div>

          <h3>Medium (60px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={60} />
          </div>

          <h3>Large (80px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={80} />
          </div>

          <h3>Custom Size:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="size">Size: </label>
            <input
              id="size"
              type="range"
              min="20"
              max="120"
              value={customSize}
              onChange={e => setCustomSize(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>{customSize}px</span>
          </div>
          <div style={{ position: 'relative', height: '150px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={customSize} />
          </div>
        </div>
        <p>Different sizes for various use cases and visual emphasis</p>
      </section>

      {/* Width Variants */}
      <section className="demo-section">
        <h2>Stroke Width Variants</h2>
        <div className="demo-group">
          <h3>Thin (2px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={2} />
          </div>

          <h3>Default (4px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={4} />
          </div>

          <h3>Medium (6px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={6} />
          </div>

          <h3>Thick (8px):</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={8} />
          </div>

          <h3>Custom Width:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="width">Width: </label>
            <input
              id="width"
              type="range"
              min="1"
              max="12"
              value={customWidth}
              onChange={e => setCustomWidth(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>{customWidth}px</span>
          </div>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={customWidth} />
          </div>
        </div>
        <p>Different stroke widths for various visual styles</p>
      </section>

      {/* Variants */}
      <section className="demo-section">
        <h2>Variants</h2>
        <div className="demo-group">
          <h3>Default:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="default" />
          </div>

          <h3>Primary:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="primary" />
          </div>

          <h3>Success:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="success" />
          </div>

          <h3>Warning:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="warning" />
          </div>

          <h3>Danger:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="danger" />
          </div>

          <h3>Info:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader variant="info" />
          </div>
        </div>
        <p>Different color variants for various use cases</p>
      </section>

      {/* Positioning Variants */}
      <section className="demo-section">
        <h2>Positioning Variants</h2>
        <div className="demo-group">
          <h3>Local Loader (Relative):</h3>
          <div style={{ position: 'relative', height: '150px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader isLocalLoader={true} />
            <p>Content below the loader</p>
          </div>

          <h3>Full Screen Loader (Fixed):</h3>
          <button 
            onClick={() => setShowFullScreenLoader(true)}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Show Full Screen Loader (3s)
          </button>
          <p>Click the button to see a full screen loader overlay</p>
        </div>
        <p>Local loaders for specific areas, full screen for global loading states</p>
      </section>

      {/* Custom Image Loader */}
      <section className="demo-section">
        <h2>Custom Image Loader</h2>
        <div className="demo-group">
          <h3>Using Custom Image:</h3>
          <div style={{ position: 'relative', height: '150px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader 
              src="/src/assets/loader.gif" 
              size={60}
              isLocalLoader={true}
            />
          </div>
          <p>Use custom images instead of the default SVG loader</p>
        </div>
      </section>


      {/* Real-world Examples */}
      <section className="demo-section">
        <h2>Real-world Examples</h2>
        <div className="demo-group">
          <h3>Button Loading State:</h3>
          <button 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setShowLocalLoader(!showLocalLoader)}
          >
            {showLocalLoader && <Loader size={16} width={2} />}
            {showLocalLoader ? 'Loading...' : 'Submit'}
          </button>

          <h3>Card Loading State:</h3>
          <div style={{ 
            position: 'relative', 
            height: '200px', 
            border: '1px solid #ddd', 
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}>
            {showLocalLoader ? (
              <Loader size={50} variant="primary" />
            ) : (
              <div>
                <h4>Card Content</h4>
                <p>This is the loaded content of the card.</p>
                <button 
                  onClick={() => setShowLocalLoader(true)}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Load Content
                </button>
              </div>
            )}
          </div>

          <h3>Page Loading State:</h3>
          <button 
            onClick={() => setShowFullScreenLoader(true)}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Simulate Page Load
          </button>
        </div>
        <p>Practical use cases for different loading scenarios</p>
      </section>

      {/* Live Examples */}
      <section className="demo-section">
        <h2>Live Examples</h2>
        <div className="demo-group">
          <h3>Basic usage:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader />
          </div>

          <h3>Custom styling:</h3>
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={50} width={6} variant="primary" />
          </div>

          <h3>Large loader:</h3>
          <div style={{ position: 'relative', height: '120px', border: '1px solid #ddd', padding: '20px' }}>
            <Loader size={80} width={8} variant="success" />
          </div>
        </div>
        <p>Interactive examples showing different Loader configurations</p>
      </section>

      {/* Full Screen Loader Overlay */}
      {showFullScreenLoader && (
        <Loader 
          isLocalLoader={false}
          variant="default"
          size={60}
        />
      )}
    </div>
  );
};

export default LoaderDemo;
