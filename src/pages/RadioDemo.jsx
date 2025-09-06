import React, { useState } from 'react';
import BasicRadio from '../components/sharedComponents/BasicRadio';

const RadioDemo = () => {
  const [singleValue, setSingleValue] = useState('');
  const [multipleValues, setMultipleValues] = useState([]);
  const [colorValue, setColorValue] = useState('primary');

  const handleSingleChange = (newValue, selectedValue) => {
    console.log('Single radio changed:', { newValue, selectedValue });
    setSingleValue(newValue);
  };

  const handleMultipleChange = (newValue, selectedValue) => {
    console.log('Multiple radio changed:', { newValue, selectedValue });
    setMultipleValues(newValue);
  };

  const handleColorChange = newValue => {
    setColorValue(newValue);
  };

  return (
    <div className="radio-demo">
      <h1>Basic Radio Component Demo</h1>

      {/* Single Selection */}
      <section className="demo-section">
        <h2>Single Selection</h2>
        <div className="demo-group">
          <BasicRadio
            value="option1"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            onChange={handleSingleChange}
            label="Option 1"
            size="md"
          />
          <BasicRadio
            value="option2"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            onChange={handleSingleChange}
            label="Option 2"
            size="md"
          />
          <BasicRadio
            value="option3"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            onChange={handleSingleChange}
            label="Option 3"
            size="md"
          />
        </div>
        <p>Selected: {singleValue || 'None'}</p>
      </section>

      {/* Multiple Selection */}
      <section className="demo-section">
        <h2>Multiple Selection</h2>
        <div className="demo-group">
          <BasicRadio
            value="multi1"
            modelValue={multipleValues}
            onUpdateModelValue={setMultipleValues}
            onChange={handleMultipleChange}
            label="Multi Option 1"
            multiple={true}
            size="md"
          />
          <BasicRadio
            value="multi2"
            modelValue={multipleValues}
            onUpdateModelValue={setMultipleValues}
            onChange={handleMultipleChange}
            label="Multi Option 2"
            multiple={true}
            size="md"
          />
          <BasicRadio
            value="multi3"
            modelValue={multipleValues}
            onUpdateModelValue={setMultipleValues}
            onChange={handleMultipleChange}
            label="Multi Option 3"
            multiple={true}
            size="md"
          />
        </div>
        <p>Selected: {multipleValues.length ? multipleValues.join(', ') : 'None'}</p>
      </section>

      {/* Sizes */}
      <section className="demo-section">
        <h2>Sizes</h2>
        <div className="demo-group">
          <BasicRadio
            value="xs"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Extra Small"
            size="xs"
          />
          <BasicRadio value="sm" modelValue={singleValue} onUpdateModelValue={setSingleValue} label="Small" size="sm" />
          <BasicRadio
            value="md"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Medium"
            size="md"
          />
          <BasicRadio value="lg" modelValue={singleValue} onUpdateModelValue={setSingleValue} label="Large" size="lg" />
          <BasicRadio
            value="xl"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Extra Large"
            size="xl"
          />
        </div>
      </section>

      {/* Colors */}
      <section className="demo-section">
        <h2>Colors</h2>
        <div className="demo-group">
          <BasicRadio
            value="default"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Default"
            color="gray"
            size="md"
          />
          <BasicRadio
            value="primary"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Primary"
            color="blue"
            size="md"
          />
          <BasicRadio
            value="success"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Success"
            color="green"
            size="md"
          />
          <BasicRadio
            value="warning"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Warning"
            color="orange"
            size="md"
          />
          <BasicRadio
            value="danger"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Danger"
            color="red"
            size="md"
          />
          <BasicRadio
            value="info"
            modelValue={colorValue}
            onUpdateModelValue={handleColorChange}
            label="Info"
            color="cyan"
            size="md"
          />
        </div>
      </section>

      {/* States */}
      <section className="demo-section">
        <h2>States</h2>
        <div className="demo-group">
          <BasicRadio
            value="normal"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Normal"
            size="md"
          />
          <BasicRadio
            value="disabled"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Disabled"
            disabled={true}
            size="md"
          />
          <BasicRadio
            value="readonly"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Readonly"
            readonly={true}
            size="md"
          />
        </div>
      </section>

      {/* Toggle Mode */}
      <section className="demo-section">
        <h2>Toggle Mode</h2>
        <div className="demo-group">
          <BasicRadio
            value="toggle1"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Toggle Option 1"
            toggle={true}
            size="md"
          />
          <BasicRadio
            value="toggle2"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Toggle Option 2"
            toggle={true}
            size="md"
          />
        </div>
        <p>Toggle allows deselection</p>
      </section>

      {/* Custom Children */}
      <section className="demo-section">
        <h2>Custom Children</h2>
        <div className="demo-group">
          <BasicRadio
            value="custom1"
            modelValue={singleValue}
            onUpdateModelValue={setSingleValue}
            label="Custom Icon"
            size="md"
          >
            {({ isChecked }) => (
              <div
                className="custom-radio"
                style={{
                  borderColor: isChecked ? '#007bff' : '#ccc',
                  backgroundColor: isChecked ? '#007bff' : 'white',
                }}
              >
                {isChecked && <span>✓</span>}
              </div>
            )}
          </BasicRadio>
        </div>
      </section>
    </div>
  );
};

export default RadioDemo;
