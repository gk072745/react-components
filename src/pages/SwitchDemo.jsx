import React, { useState } from 'react';
import BasicSwitch from '../components/sharedComponents/BasicSwitch';

const SwitchDemo = () => {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [labeledSwitch, setLabeledSwitch] = useState(true);
  const [customColorsSwitch, setCustomColorsSwitch] = useState(false);
  const [dotLabelsSwitch, setDotLabelsSwitch] = useState(false);
  const [insetSwitch, setInsetSwitch] = useState(false);
  const [disabledSwitch, setDisabledSwitch] = useState(true);
  const [readonlySwitch, setReadonlySwitch] = useState(true);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================
  const handleSwitchChange = (value, setter) => {
    setter(value);
    console.log('Switch changed:', value);
  };

  return (
    <div className="switch-demo">
      <div className="demo-header">
        <h1>BasicSwitch Component Demo</h1>
        <p>Toggle switch component with multiple sizes, colors, and variants</p>
      </div>

      <div className="demo-section">
        <h2>Basic Switch</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Default Switch</h3>
              <BasicSwitch
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
              <p>Value: {basicSwitch ? 'ON' : 'OFF'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Size Variations</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Extra Small (xs)</h3>
              <BasicSwitch
                size="xs"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Small (sm)</h3>
              <BasicSwitch
                size="sm"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Medium (md)</h3>
              <BasicSwitch
                size="md"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Large (lg)</h3>
              <BasicSwitch
                size="lg"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Extra Large (xl)</h3>
              <BasicSwitch
                size="xl"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Labeled Switches</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Label on Right (Default)</h3>
              <BasicSwitch
                label="Enable notifications"
                labelPosition="right"
                value={labeledSwitch}
                onChange={(value) => handleSwitchChange(value, setLabeledSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Label on Left</h3>
              <BasicSwitch
                label="Dark mode"
                labelPosition="left"
                value={labeledSwitch}
                onChange={(value) => handleSwitchChange(value, setLabeledSwitch)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Custom Colors</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Custom Background Colors</h3>
              <BasicSwitch
                bgColor="#e0e0e0"
                activeBgColor="#4caf50"
                sliderColor="#ffffff"
                activeSliderColor="#ffffff"
                value={customColorsSwitch}
                onChange={(value) => handleSwitchChange(value, setCustomColorsSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Purple Theme</h3>
              <BasicSwitch
                bgColor="#f3e5f5"
                activeBgColor="#9c27b0"
                sliderColor="#ffffff"
                activeSliderColor="#ffffff"
                value={customColorsSwitch}
                onChange={(value) => handleSwitchChange(value, setCustomColorsSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Orange Theme</h3>
              <BasicSwitch
                bgColor="#fff3e0"
                activeBgColor="#ff9800"
                sliderColor="#ffffff"
                activeSliderColor="#ffffff"
                value={customColorsSwitch}
                onChange={(value) => handleSwitchChange(value, setCustomColorsSwitch)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Dot Labels</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Text Labels</h3>
              <BasicSwitch
                dotLabels={{ true: 'ON', false: 'OFF' }}
                dotLabelColors={{ true: '#ffffff', false: '#666666' }}
                value={dotLabelsSwitch}
                onChange={(value) => handleSwitchChange(value, setDotLabelsSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Symbol Labels</h3>
              <BasicSwitch
                dotLabels={{ true: '✓', false: '✗' }}
                dotLabelColors={{ true: '#ffffff', false: '#666666' }}
                value={dotLabelsSwitch}
                onChange={(value) => handleSwitchChange(value, setDotLabelsSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Emoji Labels</h3>
              <BasicSwitch
                dotLabels={{ true: '😊', false: '😴' }}
                value={dotLabelsSwitch}
                onChange={(value) => handleSwitchChange(value, setDotLabelsSwitch)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Inset Variant</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Default Inset</h3>
              <BasicSwitch
                inset={true}
                value={insetSwitch}
                onChange={(value) => handleSwitchChange(value, setInsetSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Inset with Labels</h3>
              <BasicSwitch
                inset={true}
                dotLabels={{ true: 'ON', false: 'OFF' }}
                dotLabelColors={{ true: '#ffffff', false: '#666666' }}
                value={insetSwitch}
                onChange={(value) => handleSwitchChange(value, setInsetSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Inset with Custom Colors</h3>
              <BasicSwitch
                inset={true}
                bgColor="#e0e0e0"
                activeBgColor="#2196f3"
                sliderColor="#ffffff"
                activeSliderColor="#ffffff"
                value={insetSwitch}
                onChange={(value) => handleSwitchChange(value, setInsetSwitch)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>States</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Disabled (OFF)</h3>
              <BasicSwitch
                disabled={true}
                value={false}
                onChange={() => {}}
              />
            </div>
            <div className="switch-example">
              <h3>Disabled (ON)</h3>
              <BasicSwitch
                disabled={true}
                value={true}
                onChange={() => {}}
              />
            </div>
            <div className="switch-example">
              <h3>Readonly (OFF)</h3>
              <BasicSwitch
                readonly={true}
                value={false}
                onChange={() => {}}
              />
            </div>
            <div className="switch-example">
              <h3>Readonly (ON)</h3>
              <BasicSwitch
                readonly={true}
                value={true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Combined Examples</h2>
        <div className="demo-container">
          <div className="switch-examples">
            <div className="switch-example">
              <h3>Large Switch with Label</h3>
              <BasicSwitch
                size="lg"
                label="Enable advanced features"
                labelPosition="right"
                bgColor="#e8f5e8"
                activeBgColor="#4caf50"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Small Inset with Emoji</h3>
              <BasicSwitch
                size="sm"
                inset={true}
                dotLabels={{ true: '🌞', false: '🌙' }}
                bgColor="#fff3e0"
                activeBgColor="#ff9800"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
            <div className="switch-example">
              <h3>Extra Large with Custom Labels</h3>
              <BasicSwitch
                size="xl"
                dotLabels={{ true: 'SORT', false: 'LONG' }}
                dotLabelColors={{ true: '#ffffff', false: '#666666' }}
                bgColor="#f3e5f5"
                activeBgColor="#9c27b0"
                value={basicSwitch}
                onChange={(value) => handleSwitchChange(value, setBasicSwitch)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchDemo;
