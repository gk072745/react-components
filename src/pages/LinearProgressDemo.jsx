import React, { useState, useEffect } from 'react';
import LinearProgress from '../components/sharedComponents/LinearProgress';

const LinearProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  const [customProgress, setCustomProgress] = useState(45);
  const [customHeight, setCustomHeight] = useState(8);

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

      {/* Variants */}
      <section className="demo-section">
        <h2>Variants</h2>
        <div className="demo-group">
          <h3>Default:</h3>
          <LinearProgress modelValue={60} variant="default" height={8} />

          <h3>Primary:</h3>
          <LinearProgress modelValue={60} variant="primary" height={8} />

          <h3>Success:</h3>
          <LinearProgress modelValue={60} variant="success" height={8} />

          <h3>Warning:</h3>
          <LinearProgress modelValue={60} variant="warning" height={8} />

          <h3>Danger:</h3>
          <LinearProgress modelValue={60} variant="danger" height={8} />

          <h3>Info:</h3>
          <LinearProgress modelValue={60} variant="info" height={8} />
        </div>
        <p>Different color variants for various use cases</p>
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

      {/* Style Variants */}
      <section className="demo-section">
        <h2>Style Variants</h2>
        <div className="demo-group">
          <h3>Rounded:</h3>
          <LinearProgress modelValue={65} rounded={true} height={8} variant="primary" />

          <h3>Indeterminate:</h3>
          <LinearProgress indeterminate={true} height={8} variant="primary" />

          <h3>Rounded + Indeterminate:</h3>
          <LinearProgress indeterminate={true} rounded={true} height={8} variant="primary" />
        </div>
        <p>Rounded corners and indeterminate animation states</p>
      </section>

      {/* Absolute Positioning */}
      <section className="demo-section">
        <h2>Absolute Positioning</h2>
        <div className="demo-group">
          <div style={{ position: 'relative', height: '100px', border: '1px solid #ddd', padding: '20px' }}>
            <LinearProgress absolute={true} modelValue={80} height={4} variant="primary" />
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
          <LinearProgress modelValue={67} height={6} variant="success" rounded={true} />
          <p>Uploading file... 67% complete</p>

          <h3>Loading State:</h3>
          <LinearProgress indeterminate={true} height={4} variant="primary" rounded={true} />
          <p>Loading data...</p>

          <h3>Battery Level:</h3>
          <LinearProgress
            modelValue={23}
            height={12}
            variant={customProgress < 20 ? 'danger' : customProgress < 50 ? 'warning' : 'success'}
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
          <LinearProgress modelValue={60} height={8} variant="primary" rounded={true} />

          <h3>Indeterminate loading:</h3>
          <LinearProgress indeterminate={true} height={6} variant="primary" />

          <h3>Absolute positioning:</h3>
          <div style={{ position: 'relative', height: '60px', border: '1px solid #ddd', padding: '15px' }}>
            <LinearProgress absolute={true} modelValue={80} height={4} variant="success" />
            <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Content below progress bar</p>
          </div>
        </div>
        <p>Interactive examples showing different LinearProgress configurations</p>
      </section>
    </div>
  );
};

export default LinearProgressDemo;
