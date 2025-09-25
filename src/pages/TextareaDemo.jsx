import React, { useState } from 'react';
import BasicTextarea from '../components/sharedComponents/BasicTextarea';
import '@/assets/scss/pages/_textarea-demo.scss';

const TextareaDemo = () => {
  const [basicValue, setBasicValue] = useState('');
  const [autoGrowValue, setAutoGrowValue] = useState('');
  const [counterValue, setCounterValue] = useState('');
  const [validationValue, setValidationValue] = useState('');
  const [disabledValue] = useState('This textarea is disabled');
  const [readonlyValue] = useState('This textarea is readonly');
  const [loadingValue, setLoadingValue] = useState('');
  const [customIconsValue, setCustomIconsValue] = useState('');

  const customPrependIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" fill="#1C274C" />
    </svg>
  );

  const customAppendIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" fill="#1C274C" />
    </svg>
  );

  return (
    <div className="textarea-demo">
      <h1>Basic Textarea Component Demo</h1>
      
      <section className="demo-section">
        <h2>Basic Textarea</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Basic Textarea"
            placeholder="Enter your message here..."
            value={basicValue}
            onChange={setBasicValue}
            hint="This is a basic textarea with default settings"
          />
        </div>
        <p>Value: {basicValue}</p>
      </section>

      <section className="demo-section">
        <h2>Auto Grow Textarea</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Auto Grow Textarea"
            placeholder="Type to see auto-resize..."
            value={autoGrowValue}
            onChange={setAutoGrowValue}
            autoGrow={true}
            minRows={2}
            hint="This textarea automatically grows as you type"
          />
        </div>
        <p>Value: {autoGrowValue}</p>
      </section>

      <section className="demo-section">
        <h2>Character Counter</h2>
        <div className="demo-group">
          <BasicTextarea
            label="With Character Counter"
            placeholder="Type to see character count..."
            value={counterValue}
            onChange={setCounterValue}
            maxlength={100}
            counter={true}
            hint="Shows character count with maximum limit"
          />
        </div>
        <p>Value: {counterValue}</p>
      </section>

      <section className="demo-section">
        <h2>Validation Rules</h2>
        <div className="demo-group">
          <BasicTextarea
            label="With Validation"
            placeholder="Enter at least 10 characters..."
            value={validationValue}
            onChange={setValidationValue}
            rules={[
              { rule: 'required', message: 'This field is required' },
              { rule: 'minLength', condition: 10, message: 'Must be at least 10 characters' },
            ]}
            hint="This textarea has validation rules"
          />
        </div>
        <p>Value: {validationValue}</p>
      </section>

      <section className="demo-section">
        <h2>No Resize</h2>
        <div className="demo-group">
          <BasicTextarea
            label="No Resize Textarea"
            placeholder="This textarea cannot be resized..."
            value={basicValue}
            onChange={setBasicValue}
            noResize={true}
            rows={4}
            hint="This textarea has resize disabled"
          />
        </div>
        <p>Value: {basicValue}</p>
      </section>

      <section className="demo-section">
        <h2>Disabled State</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Disabled Textarea"
            value={disabledValue}
            disabled={true}
            hint="This textarea is disabled"
          />
        </div>
        <p>Value: {disabledValue}</p>
      </section>

      <section className="demo-section">
        <h2>Readonly State</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Readonly Textarea"
            value={readonlyValue}
            readonly={true}
            hint="This textarea is readonly"
          />
        </div>
        <p>Value: {readonlyValue}</p>
      </section>

      <section className="demo-section">
        <h2>Loading State</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Loading Textarea"
            placeholder="This textarea is loading..."
            value={loadingValue}
            onChange={setLoadingValue}
            loading={true}
            hint="This textarea shows loading state"
          />
        </div>
        <p>Value: {loadingValue}</p>
      </section>

      <section className="demo-section">
        <h2>Custom Icons</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Custom Icons"
            placeholder="Textarea with custom icons..."
            value={customIconsValue}
            onChange={setCustomIconsValue}
            prepend={true}
            append={true}
            prependIcon={customPrependIcon}
            appendIcon={customAppendIcon}
            hint="This textarea has custom icons"
          />
        </div>
        <p>Value: {customIconsValue}</p>
      </section>

      <section className="demo-section">
        <h2>All Features Combined</h2>
        <div className="demo-group">
          <BasicTextarea
            label="Feature-Rich Textarea"
            placeholder="Try all features..."
            value={basicValue}
            onChange={setBasicValue}
            autoGrow={true}
            counter={true}
            maxlength={200}
            rows={3}
            minRows={2}
            rules={[
              { rule: 'required', message: 'This field is required' },
              { rule: 'minLength', condition: 5, message: 'Must be at least 5 characters' },
            ]}
            hint="This textarea demonstrates all available features"
          />
        </div>
        <p>Value: {basicValue}</p>
      </section>
    </div>
  );
};

export default TextareaDemo;
