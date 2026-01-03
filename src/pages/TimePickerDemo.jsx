import React, { useState } from 'react';
import BasicTimePicker from '@/components/sharedComponents/BasicTimePicker';
import '@/assets/scss/pages/_time-picker-demo.scss';

const TimePickerDemo = () => {
  // Basic time picker
  const [basicValue, setBasicValue] = useState('');

  // 24-hour format
  const [hour24Value, setHour24Value] = useState('');

  // With label
  const [labeledValue, setLabeledValue] = useState('');

  // Disabled state
  const [disabledValue, setDisabledValue] = useState('14:30');

  // Custom minute step
  const [step5Value, setStep5Value] = useState('');
  const [step15Value, setStep15Value] = useState('');

  // Form integration
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
  });
  const [formErrors, setFormErrors] = useState({
    startTime: '',
    endTime: '',
  });

  const validateForm = () => {
    const errors = {
      startTime: !formData.startTime ? 'Start time is required' : '',
      endTime: !formData.endTime ? 'End time is required' : '',
    };

    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        errors.endTime = 'End time must be after start time';
      }
    }

    setFormErrors(errors);
  };

  const submitForm = (e) => {
    e.preventDefault();
    validateForm();
    if (!formErrors.startTime && !formErrors.endTime) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="time-picker-demo">
      <h1>Time Picker Component Demo</h1>
      <p>This page demonstrates the Time Picker component with various configurations and examples.</p>

      <section className="demo-section">
        <h2>Basic Time Picker</h2>
        <p>A simple time picker with 12-hour format (default).</p>
        <div className="demo-group">
          <BasicTimePicker modelValue={basicValue} onModelValueChange={setBasicValue} placeholder="Select time" />
          <p className="result">Selected: {basicValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>24-Hour Format</h2>
        <p>Time picker using 24-hour format.</p>
        <div className="demo-group">
          <BasicTimePicker
            modelValue={hour24Value}
            onModelValueChange={setHour24Value}
            use12HourFormat={false}
            placeholder="Select time (24H)"
          />
          <p className="result">Selected: {hour24Value || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>With Label</h2>
        <p>Time picker with a label.</p>
        <div className="demo-group">
          <BasicTimePicker
            modelValue={labeledValue}
            onModelValueChange={setLabeledValue}
            label="Select Time"
            placeholder="Choose a time"
          />
          <p className="result">Selected: {labeledValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Disabled State</h2>
        <p>Time picker in disabled state.</p>
        <div className="demo-group">
          <BasicTimePicker modelValue={disabledValue} onModelValueChange={setDisabledValue} disabled={true} />
          <p className="result">Selected: {disabledValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Custom Minute Steps</h2>
        <p>Time pickers with different minute step intervals.</p>
        <div className="demo-group">
          <div className="demo-item">
            <label>5-minute steps:</label>
            <BasicTimePicker modelValue={step5Value} onModelValueChange={setStep5Value} minuteStep={5} />
            <p className="result">Selected: {step5Value || 'None'}</p>
          </div>
          <div className="demo-item">
            <label>15-minute steps:</label>
            <BasicTimePicker modelValue={step15Value} onModelValueChange={setStep15Value} minuteStep={15} />
            <p className="result">Selected: {step15Value || 'None'}</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Form Integration</h2>
        <p>Time picker integrated into a form with validation.</p>
        <div className="demo-group">
          <form onSubmit={submitForm} className="form-example">
            <div className="form-group">
              <label>Start Time</label>
              <BasicTimePicker
                modelValue={formData.startTime}
                onModelValueChange={(value) => setFormData((prev) => ({ ...prev, startTime: value }))}
                label="Start Time"
                placeholder="Select start time"
              />
              {formErrors.startTime && <span className="error">{formErrors.startTime}</span>}
            </div>

            <div className="form-group">
              <label>End Time</label>
              <BasicTimePicker
                modelValue={formData.endTime}
                onModelValueChange={(value) => setFormData((prev) => ({ ...prev, endTime: value }))}
                label="End Time"
                placeholder="Select end time"
              />
              {formErrors.endTime && <span className="error">{formErrors.endTime}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit Form
              </button>
              <button type="button" onClick={validateForm} className="validate-btn">
                Validate Only
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="demo-section">
        <h2>Usage Example</h2>
        <div className="code-example">
          <pre>
            <code>{`import BasicTimePicker from '@/components/sharedComponents/BasicTimePicker';

const MyComponent = () => {
  const [time, setTime] = useState('');

  return (
    <BasicTimePicker
      modelValue={time}
      onModelValueChange={setTime}
      label="Select Time"
      placeholder="Choose a time"
      use12HourFormat={true}
      minuteStep={1}
    />
  );
};`}</code>
          </pre>
        </div>
      </section>

      <section className="demo-section">
        <h2>Configuration Options</h2>
        <div className="config-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>modelValue</td>
                <td>string</td>
                <td>''</td>
                <td>Time value in HH:MM format</td>
              </tr>
              <tr>
                <td>label</td>
                <td>string</td>
                <td>''</td>
                <td>Label text above the time picker</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>'Select time'</td>
                <td>Placeholder text when no time is selected</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>Disable the time picker</td>
              </tr>
              <tr>
                <td>use12HourFormat</td>
                <td>boolean</td>
                <td>true</td>
                <td>Use 12-hour format (AM/PM) or 24-hour format</td>
              </tr>
              <tr>
                <td>minuteStep</td>
                <td>number</td>
                <td>1</td>
                <td>Step interval for minutes (e.g., 5, 15, 30)</td>
              </tr>
              <tr>
                <td>onModelValueChange</td>
                <td>function</td>
                <td>-</td>
                <td>Callback when time value changes</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>function</td>
                <td>-</td>
                <td>Callback when time value changes (alias)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TimePickerDemo;

