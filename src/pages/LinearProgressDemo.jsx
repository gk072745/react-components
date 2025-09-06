import React, { useState, useEffect } from 'react';
import LinearProgress from '../components/sharedComponents/LinearProgress';

const LinearProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  const [customProgress, setCustomProgress] = useState(45);
  const [customHeight, setCustomHeight] = useState(8);
  const [customColor, setCustomColor] = useState('#007bff');
  const [customBgColor, setCustomBgColor] = useState('#e0e0e0');

  // Auto-progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="linear-progress-demo">
      <h1>Linear Progress Component Demo</h1>

      {/* Basic Usage */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <div className="demo-group">
          <LinearProgress modelValue={progress} />
          <p>Auto-progressing bar: {progress}%</p>
        </div>
        <p>Default height (4px) with auto-progress animation</p>
      </section>

      {/* Height Variants */}
      <section className="demo-section">
        <h2>Height Variants</h2>
        <div className="demo-group">
          <h3>Thin (2px):</h3>
          <LinearProgress modelValue={75} height={2} />

          <h3>Default (4px):</h3>
          <LinearProgress modelValue={75} height={4} />

          <h3>Medium (8px):</h3>
          <LinearProgress modelValue={75} height={8} />

          <h3>Thick (16px):</h3>
          <LinearProgress modelValue={75} height={16} />

          <h3>Custom Height:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="height">Height: </label>
            <input
              id="height"
              type="range"
              min="2"
              max="32"
              value={customHeight}
              onChange={e => setCustomHeight(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>{customHeight}px</span>
          </div>
          <LinearProgress modelValue={75} height={customHeight} />
        </div>
        <p>Different heights for various use cases and visual emphasis</p>
      </section>

      {/* Color Variants */}
      <section className="demo-section">
        <h2>Color Variants</h2>
        <div className="demo-group">
          <h3>Default Colors:</h3>
          <LinearProgress modelValue={60} color="#000" bgColor="#e0e0e0" />

          <h3>Blue Theme:</h3>
          <LinearProgress modelValue={60} color="#007bff" bgColor="#e3f2fd" />

          <h3>Green Theme:</h3>
          <LinearProgress modelValue={60} color="#28a745" bgColor="#e8f5e8" />

          <h3>Red Theme:</h3>
          <LinearProgress modelValue={60} color="#dc3545" bgColor="#f8e8e8" />

          <h3>Custom Colors:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label htmlFor="color">Progress Color: </label>
              <input
                id="color"
                type="color"
                value={customColor}
                onChange={e => setCustomColor(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </div>
            <div>
              <label htmlFor="bgColor">Background Color: </label>
              <input
                id="bgColor"
                type="color"
                value={customBgColor}
                onChange={e => setCustomBgColor(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </div>
          </div>
          <LinearProgress modelValue={60} color={customColor} bgColor={customBgColor} height={8} />
        </div>
        <p>Customize colors to match your design system</p>
      </section>

      {/* Progress Values */}
      <section className="demo-section">
        <h2>Progress Values</h2>
        <div className="demo-group">
          <h3>Custom Progress:</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="progress">Progress: </label>
            <input
              id="progress"
              type="range"
              min="0"
              max="100"
              value={customProgress}
              onChange={e => setCustomProgress(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            />
            <span style={{ marginLeft: '0.5rem' }}>{customProgress}%</span>
          </div>
          <LinearProgress modelValue={customProgress} height={8} />

          <h3>Fixed Values:</h3>
          <LinearProgress modelValue={25} height={6} />
          <LinearProgress modelValue={50} height={6} />
          <LinearProgress modelValue={75} height={6} />
          <LinearProgress modelValue={100} height={6} />
        </div>
        <p>Control progress values from 0 to 100%</p>
      </section>

      {/* Variants */}
      <section className="demo-section">
        <h2>Variants</h2>
        <div className="demo-group">
          <h3>Rounded:</h3>
          <LinearProgress modelValue={65} rounded={true} height={8} />

          <h3>Indeterminate:</h3>
          <LinearProgress indeterminate={true} height={8} />

          <h3>Rounded + Indeterminate:</h3>
          <LinearProgress indeterminate={true} rounded={true} height={8} />
        </div>
        <p>Rounded corners and indeterminate animation states</p>
      </section>

      {/* Absolute Positioning */}
      <section className="demo-section">
        <h2>Absolute Positioning</h2>
        <div className="demo-group">
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <LinearProgress absolute={true} modelValue={80} height={4} color="#007bff" />
            <p>Progress bar positioned at the top of this container</p>
            <p>Content below the progress bar</p>
          </div>
        </div>
        <p>Use absolute positioning for top-aligned progress bars</p>
      </section>

      {/* Real-world Examples */}
      <section className="demo-section">
        <h2>Real-world Examples</h2>
        <div className="demo-group">
          <h3>File Upload Progress:</h3>
          <LinearProgress modelValue={67} height={6} color="#28a745" bgColor="#e8f5e8" rounded={true} />
          <p>Uploading file... 67% complete</p>

          <h3>Loading State:</h3>
          <LinearProgress indeterminate={true} height={4} color="#007bff" rounded={true} />
          <p>Loading data...</p>

          <h3>Battery Level:</h3>
          <LinearProgress
            modelValue={23}
            height={12}
            color={customProgress < 20 ? '#dc3545' : customProgress < 50 ? '#ffc107' : '#28a745'}
            bgColor="#f8f9fa"
            rounded={true}
          />
          <p>Battery: 23% {customProgress < 20 ? '(Low)' : customProgress < 50 ? '(Medium)' : '(Good)'}</p>
        </div>
        <p>Practical use cases for different scenarios</p>
      </section>

      {/* Live Examples */}
      <section className="demo-section">
        <h2>Live Examples</h2>
        <div className="demo-group">
          <h3>Basic usage:</h3>
          <LinearProgress modelValue={75} />

          <h3>Custom styling:</h3>
          <LinearProgress modelValue={60} height={8} color="#007bff" bgColor="#e3f2fd" rounded={true} />

          <h3>Indeterminate loading:</h3>
          <LinearProgress indeterminate={true} height={6} />

          <h3>Absolute positioning:</h3>
          <div style={{ position: 'relative', height: '60px', border: '1px solid #ddd', padding: '15px' }}>
            <LinearProgress absolute={true} modelValue={80} height={4} color="#28a745" />
            <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Content below progress bar</p>
          </div>
        </div>
        <p>Interactive examples showing different LinearProgress configurations</p>
      </section>
    </div>
  );
};

export default LinearProgressDemo;
