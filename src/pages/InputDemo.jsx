import React, { useState } from 'react';
import BasicInput from '../components/sharedComponents/BasicInput';

const InputDemo = () => {
  // Demo values
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [disabledValue] = useState('This is disabled');
  const [readonlyValue] = useState('This is readonly');
  const [prependValue, setPrependValue] = useState('');
  const [loadingValue, setLoadingValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hintValue, setHintValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [validationValue, setValidationValue] = useState('');
  const [clearableValue, setClearableValue] = useState('');
  const [passwordWithLoading, setPasswordWithLoading] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // React 19: Modern async validation demo
  const [asyncEmail, setAsyncEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Pure loader demo (no inner append)
  const [pureLoaderValue, setPureLoaderValue] = useState('');
  const [isPureLoading, setIsPureLoading] = useState(false);

  // Custom SVG icons demo
  const [customPrependValue, setCustomPrependValue] = useState('');
  const [customPrependInnerValue, setCustomPrependInnerValue] = useState('');
  const [customAppendValue, setCustomAppendValue] = useState('');
  const [customAppendInnerValue, setCustomAppendInnerValue] = useState('');

  // Custom append + loader demos
  const [customAppendWithLoaderValue, setCustomAppendWithLoaderValue] = useState('');
  const [isCustomAppendLoading, setIsCustomAppendLoading] = useState(false);
  const [customAppendInnerWithLoaderValue, setCustomAppendInnerWithLoaderValue] = useState('');
  const [isCustomAppendInnerLoading, setIsCustomAppendInnerLoading] = useState(false);

  // Handler functions
  const handleBasicChange = newValue => {
    console.log('Basic input changed:', newValue);
    setBasicValue(newValue);
  };

  const handleEmailChange = newValue => {
    console.log('Email input changed:', newValue);
    setEmailValue(newValue);
  };

  const handlePasswordChange = newValue => {
    console.log('Password input changed:', newValue);
    setPasswordValue(newValue);
  };

  const handleNumberChange = newValue => {
    console.log('Number input changed:', newValue);
    setNumberValue(newValue);
  };

  const handlePrependChange = newValue => {
    console.log('Prepend input changed:', newValue);
    setPrependValue(newValue);
  };

  const handleLoadingChange = newValue => {
    console.log('Loading input changed:', newValue);
    setLoadingValue(newValue);
  };

  const handleHintChange = newValue => {
    console.log('Hint input changed:', newValue);
    setHintValue(newValue);
  };

  const handleUrlChange = newValue => {
    console.log('URL input changed:', newValue);
    setUrlValue(newValue);
  };

  const handleValidationChange = newValue => {
    console.log('Validation input changed:', newValue);
    setValidationValue(newValue);
  };

  const handleClearableChange = newValue => {
    console.log('Clearable input changed:', newValue);
    setClearableValue(newValue);
  };

  const handlePasswordWithLoadingChange = newValue => {
    console.log('Password with loading changed:', newValue);
    setPasswordWithLoading(newValue);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const togglePasswordLoading = () => {
    setIsPasswordLoading(!isPasswordLoading);
  };

  // React 19: Modern async validation
  const handleAsyncEmailChange = newValue => {
    console.log('Async email changed:', newValue);
    setAsyncEmail(newValue);
  };

  const asyncEmailValidation = async value => {
    setIsValidating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate validation logic
    const isValid = value.includes('@') && value.includes('.');

    setIsValidating(false);

    return {
      valid: isValid,
      message: isValid ? '' : 'Please enter a valid email address',
    };
  };

  // Pure loader demo handlers
  const handlePureLoaderChange = newValue => {
    console.log('Pure loader input changed:', newValue);
    setPureLoaderValue(newValue);
  };

  const togglePureLoading = () => {
    setIsPureLoading(!isPureLoading);
  };

  // Custom SVG handlers
  const handleCustomPrependChange = newValue => {
    console.log('Custom prepend changed:', newValue);
    setCustomPrependValue(newValue);
  };

  const handleCustomPrependInnerChange = newValue => {
    console.log('Custom prepend inner changed:', newValue);
    setCustomPrependInnerValue(newValue);
  };

  const handleCustomAppendChange = newValue => {
    console.log('Custom append changed:', newValue);
    setCustomAppendValue(newValue);
  };

  const handleCustomAppendInnerChange = newValue => {
    console.log('Custom append inner changed:', newValue);
    setCustomAppendInnerValue(newValue);
  };

  // Custom append + loader handlers
  const handleCustomAppendWithLoaderChange = newValue => {
    console.log('Custom append with loader changed:', newValue);
    setCustomAppendWithLoaderValue(newValue);
  };

  const toggleCustomAppendLoading = () => {
    setIsCustomAppendLoading(!isCustomAppendLoading);
  };

  const handleCustomAppendInnerWithLoaderChange = newValue => {
    console.log('Custom append inner with loader changed:', newValue);
    setCustomAppendInnerWithLoaderValue(newValue);
  };

  const toggleCustomAppendInnerLoading = () => {
    setIsCustomAppendInnerLoading(!isCustomAppendInnerLoading);
  };

  const emailRules = [
    { rule: 'required', message: 'Email is required' },
    { rule: 'email', message: 'Email must be valid' },
  ];

  return (
    <div className="input-demo">
      <h1>Basic Input Component Demo</h1>

      {/* Basic Input */}
      <section className="demo-section">
        <h2>Basic Input</h2>
        <div className="demo-group">
          <BasicInput value={basicValue} onChange={handleBasicChange} label="Basic Input" placeholder="Enter text..." />
        </div>
        <p>Value: {basicValue}</p>
      </section>

      {/* Email Input with Validation */}
      <section className="demo-section">
        <h2>Email Input with Validation</h2>
        <div className="demo-group">
          <BasicInput value={emailValue} onChange={handleEmailChange} label="Email" type="email" rules={emailRules} />
        </div>
        <p>Value: {emailValue}</p>
      </section>

      {/* Password Input */}
      <section className="demo-section">
        <h2>Password Input</h2>
        <div className="demo-group">
          <BasicInput
            value={passwordValue}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
            appendInner={true}
          />
        </div>
        <p>Value: {passwordValue}</p>
      </section>

      {/* Number Input */}
      <section className="demo-section">
        <h2>Number Input</h2>
        <div className="demo-group">
          <BasicInput value={numberValue} onChange={handleNumberChange} label="Number" type="number" />
        </div>
        <p>Value: {numberValue}</p>
      </section>

      {/* Disabled Input */}
      <section className="demo-section">
        <h2>Disabled Input</h2>
        <div className="demo-group">
          <BasicInput value={disabledValue} label="Disabled" disabled={true} />
        </div>
        <p>Value: {disabledValue}</p>
      </section>

      {/* Readonly Input */}
      <section className="demo-section">
        <h2>Readonly Input</h2>
        <div className="demo-group">
          <BasicInput value={readonlyValue} label="Readonly" readonly={true} />
        </div>
        <p>Value: {readonlyValue}</p>
      </section>

      {/* Input with Prepend/Append */}
      <section className="demo-section">
        <h2>Input with Prepend/Append</h2>
        <div className="demo-group">
          <BasicInput
            value={prependValue}
            onChange={handlePrependChange}
            label="Search"
            prepend={true}
            append={true}
            clearable={true}
            onPrependClick={() => console.log('Prepend clicked')}
            onAppendClick={() => console.log('Append clicked')}
          />
        </div>
        <p>Value: {prependValue}</p>
      </section>

      {/* Loading Input */}
      <section className="demo-section">
        <h2>Loading Input</h2>
        <div className="demo-group">
          <BasicInput
            value={loadingValue}
            onChange={handleLoadingChange}
            label="Loading"
            loading={isLoading}
            appendInner={true}
          />
        </div>
        <button onClick={toggleLoading} className="demo-button">
          {isLoading ? 'Stop' : 'Start'} Loading
        </button>
        <p>Value: {loadingValue}</p>
      </section>

      {/* Password with Loading (Inner Append + Loader) */}
      <section className="demo-section">
        <h2>Password with Loading (Inner Append + Loader)</h2>
        <div className="demo-group">
          <BasicInput
            value={passwordWithLoading}
            onChange={handlePasswordWithLoadingChange}
            label="Password with Loading"
            placeholder="Enter your password"
            type="password"
            loading={isPasswordLoading}
            appendInner={true}
          />
        </div>
        <button onClick={togglePasswordLoading} className="demo-button">
          {isPasswordLoading ? 'Stop' : 'Start'} Password Loading
        </button>
        <p>Value: {passwordWithLoading}</p>
        <p>
          <strong>Note:</strong> This demonstrates how inner append (password toggle) and loader can work together. When
          loading is true, it shows the spinner. When loading is false, it shows the password toggle button.
        </p>
      </section>

      {/* React 19: Modern Async Validation */}
      <section className="demo-section">
        <h2>React 19: Async Validation</h2>
        <div className="demo-group">
          <BasicInput
            value={asyncEmail}
            onChange={handleAsyncEmailChange}
            label="Async Email Validation"
            placeholder="Enter email for async validation"
            type="email"
            asyncValidation={asyncEmailValidation}
            loading={isValidating}
            appendInner={true}
          />
        </div>
        <p>Value: {asyncEmail}</p>
        <p>
          <strong>React 19 Features:</strong>
        </p>
        <ul>
          <li>
            ✅ <strong>Async Validation:</strong> Server-side validation with loading state
          </li>
          <li>
            ✅ <strong>Modern Ref Handling:</strong> No forwardRef needed
          </li>
          <li>
            ✅ <strong>Better Performance:</strong> Optimized re-renders
          </li>
          <li>
            ✅ <strong>Enhanced UX:</strong> Real-time validation feedback
          </li>
        </ul>
      </section>

      {/* Pure Loader Demo (No Inner Append) */}
      <section className="demo-section">
        <h2>Pure Loader Demo (No Inner Append)</h2>
        <div className="demo-group">
          <BasicInput
            value={pureLoaderValue}
            onChange={handlePureLoaderChange}
            label="Pure Loading Input"
            placeholder="Enter text while loading"
            loading={isPureLoading}
            // No appendInner prop - just pure loader
          />
        </div>
        <button onClick={togglePureLoading} className="demo-button">
          {isPureLoading ? 'Stop' : 'Start'} Pure Loading
        </button>
        <p>Value: {pureLoaderValue}</p>
        <p>
          <strong>Note:</strong> This demonstrates a pure loading state without any inner append functionality. Only the
          loader spinner is shown in the append area.
        </p>
      </section>

      {/* Custom SVG Icons Demo */}
      <section className="demo-section">
        <h2>Custom SVG Icons from Parent</h2>

        {/* Custom Prepend Icon */}
        <div className="demo-group">
          <h3>Custom Prepend Icon</h3>
          <BasicInput
            value={customPrependValue}
            onChange={handleCustomPrependChange}
            label="Custom Prepend"
            placeholder="With custom prepend icon"
            prepend={true}
            prependIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>

        {/* Custom Prepend Inner Icon */}
        <div className="demo-group">
          <h3>Custom Prepend Inner Icon</h3>
          <BasicInput
            value={customPrependInnerValue}
            onChange={handleCustomPrependInnerChange}
            label="Custom Prepend Inner"
            placeholder="With custom prepend inner icon"
            prependInner={true}
            prependInnerIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
              </svg>
            }
          />
        </div>

        {/* Custom Append Icon */}
        <div className="demo-group">
          <h3>Custom Append Icon</h3>
          <BasicInput
            value={customAppendValue}
            onChange={handleCustomAppendChange}
            label="Custom Append"
            placeholder="With custom append icon"
            append={true}
            appendIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 15V3" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </div>

        {/* Custom Append Inner Icon */}
        <div className="demo-group">
          <h3>Custom Append Inner Icon</h3>
          <BasicInput
            value={customAppendInnerValue}
            onChange={handleCustomAppendInnerChange}
            label="Custom Append Inner"
            placeholder="With custom append inner icon"
            appendInner={true}
            appendInnerIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                  fill="#8B5CF6"
                />
                <path d="M21 9V7L15 4L12 2L9 4L3 7V9L12 13L21 9Z" fill="#8B5CF6" />
                <path d="M12 13L9 11L3 8V10L9 13L12 15L15 13L21 10V8L15 11L12 13Z" fill="#8B5CF6" />
              </svg>
            }
          />
        </div>

        <p>
          <strong>Custom SVG Features:</strong>
        </p>
        <ul>
          <li>
            ✅ <strong>Prepend Icon:</strong> Custom icon before the input field
          </li>
          <li>
            ✅ <strong>Prepend Inner Icon:</strong> Custom icon inside the input field (left)
          </li>
          <li>
            ✅ <strong>Append Icon:</strong> Custom icon after the input field
          </li>
          <li>
            ✅ <strong>Append Inner Icon:</strong> Custom icon inside the input field (right)
          </li>
          <li>
            ✅ <strong>Flexible Design:</strong> Pass any SVG from parent component
          </li>
          <li>
            ✅ <strong>Custom Styling:</strong> Full control over icon appearance
          </li>
        </ul>
      </section>

      {/* Custom Append + Loader Demos */}
      <section className="demo-section">
        <h2>Custom Append + Loader Examples</h2>

        {/* Custom Append with Loader */}
        <div className="demo-group">
          <h3>Custom Append with Loader</h3>
          <BasicInput
            value={customAppendWithLoaderValue}
            onChange={handleCustomAppendWithLoaderChange}
            label="Custom Append with Loader"
            placeholder="Custom append icon + loading state"
            append={true}
            loading={isCustomAppendLoading}
            appendIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <button onClick={toggleCustomAppendLoading} className="demo-button">
            {isCustomAppendLoading ? 'Stop' : 'Start'} Custom Append Loading
          </button>
          <p>Value: {customAppendWithLoaderValue}</p>
          <p>
            <strong>Note:</strong> Shows custom append icon when not loading, loader when loading.
          </p>
        </div>

        {/* Custom Append Inner with Loader */}
        <div className="demo-group">
          <h3>Custom Append Inner with Loader</h3>
          <BasicInput
            value={customAppendInnerWithLoaderValue}
            onChange={handleCustomAppendInnerWithLoaderChange}
            label="Custom Append Inner with Loader"
            placeholder="Custom append inner icon + loading state"
            appendInner={true}
            loading={isCustomAppendInnerLoading}
            appendInnerIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                  fill="#F59E0B"
                />
                <path d="M21 9V7L15 4L12 2L9 4L3 7V9L12 13L21 9Z" fill="#F59E0B" />
                <path d="M12 13L9 11L3 8V10L9 13L12 15L15 13L21 10V8L15 11L12 13Z" fill="#F59E0B" />
              </svg>
            }
          />
          <button onClick={toggleCustomAppendInnerLoading} className="demo-button">
            {isCustomAppendInnerLoading ? 'Stop' : 'Start'} Custom Append Inner Loading
          </button>
          <p>Value: {customAppendInnerWithLoaderValue}</p>
          <p>
            <strong>Note:</strong> Shows custom append inner icon when not loading, loader + custom icon when loading.
          </p>
        </div>

        <p>
          <strong>Custom Append + Loader Features:</strong>
        </p>
        <ul>
          <li>
            ✅ <strong>Custom Append with Loader:</strong> Custom icon when not loading, loader when loading
          </li>
          <li>
            ✅ <strong>Custom Append Inner with Loader:</strong> Custom icon when not loading, loader + custom icon when
            loading
          </li>
          <li>
            ✅ <strong>Flexible Combinations:</strong> Mix custom icons with loading states
          </li>
          <li>
            ✅ <strong>Visual Feedback:</strong> Clear indication of loading vs normal states
          </li>
          <li>
            ✅ <strong>Interactive Demos:</strong> Toggle between loading and normal states
          </li>
        </ul>
      </section>

      {/* Input with Hint */}
      <section className="demo-section">
        <h2>Input with Hint</h2>
        <div className="demo-group">
          <BasicInput value={hintValue} onChange={handleHintChange} label="With Hint" hint="This is a helpful hint" />
        </div>
        <p>Value: {hintValue}</p>
      </section>

      {/* URL Input with Validation */}
      <section className="demo-section">
        <h2>URL Input with Validation</h2>
        <div className="demo-group">
          <BasicInput
            value={urlValue}
            onChange={handleUrlChange}
            label="Website URL"
            type="url"
            placeholder="https://example.com"
          />
        </div>
        <p>Value: {urlValue}</p>
      </section>

      {/* Input with Validation */}
      <section className="demo-section">
        <h2>Input with Validation</h2>
        <div className="demo-group">
          <BasicInput
            value={validationValue}
            onChange={handleValidationChange}
            label="Email (Required)"
            placeholder="Enter your email"
            type="email"
            rules={emailRules}
            hint="Please enter a valid email address"
            onValidate={(isValid, value, message) => {
              console.log('Validation result:', { isValid, value, message });
            }}
          />
        </div>
        <p>Value: {validationValue}</p>
      </section>

      {/* Input with Clear Button */}
      <section className="demo-section">
        <h2>Input with Clear Button</h2>
        <div className="demo-group">
          <BasicInput
            value={clearableValue}
            onChange={handleClearableChange}
            label="Clearable Input"
            placeholder="Type something to see clear button"
            clearable={true}
            onClearClick={() => console.log('Clear clicked')}
          />
        </div>
        <p>Value: {clearableValue}</p>
      </section>

      {/* Different Input Types */}
      <section className="demo-section">
        <h2>Different Input Types</h2>
        <div className="demo-group">
          <BasicInput label="Text Input" placeholder="Text input" type="text" />
          <BasicInput label="Email Input" placeholder="Email input" type="email" />
          <BasicInput label="Number Input" placeholder="Number input" type="number" />
          <BasicInput label="Tel Input" placeholder="Phone input" type="tel" />
          <BasicInput label="URL Input" placeholder="URL input" type="url" />
        </div>
      </section>

      {/* Input with Hide Details */}
      <section className="demo-section">
        <h2>Input with Hidden Details</h2>
        <div className="demo-group">
          <BasicInput
            label="Input without Details"
            placeholder="No validation messages"
            hideDetails={true}
            hint="This hint won't show"
          />
        </div>
      </section>

      {/* Input with Persistent Details */}
      <section className="demo-section">
        <h2>Input with Persistent Details</h2>
        <div className="demo-group">
          <BasicInput
            label="Persistent Details"
            placeholder="Details always visible"
            hint="This hint is always visible"
            persistentDetails={true}
          />
        </div>
      </section>

      {/* Input with Hide Spin Buttons */}
      <section className="demo-section">
        <h2>Number Input without Spin Buttons</h2>
        <div className="demo-group">
          <BasicInput
            label="Number without Spin Buttons"
            placeholder="Enter number"
            type="number"
            hideSpinButtons={true}
          />
        </div>
      </section>
    </div>
  );
};

export default InputDemo;
