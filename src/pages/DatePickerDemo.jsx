import React, { useState } from 'react';
import BasicDatePicker from '@/components/sharedComponents/BasicDatePicker';
import '@/assets/scss/pages/_date-picker-demo.scss';

const DatePickerDemo = () => {
  // Basic date picker
  const [basicValue, setBasicValue] = useState(null);

  // Date time picker
  const [dateTimeValue, setDateTimeValue] = useState(null);

  // Range picker
  const [rangeValue, setRangeValue] = useState(null);

  // Multi dates
  const [multiDatesValue, setMultiDatesValue] = useState([]);

  // With constraints
  const [minMaxValue, setMinMaxValue] = useState(null);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Disabled dates
  const [disabledDatesValue, setDisabledDatesValue] = useState(null);
  const disabledDates = [
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];

  // Disabled week days (weekends)
  const [weekendDisabledValue, setWeekendDisabledValue] = useState(null);

  // Custom format
  const [customFormatValue, setCustomFormatValue] = useState(null);

  // Clearable
  const [clearableValue, setClearableValue] = useState(new Date());

  // With label
  const [labeledValue, setLabeledValue] = useState(null);

  // Disabled state
  const [disabledValue, setDisabledValue] = useState(new Date());

  // Readonly state
  const [readonlyValue, setReadonlyValue] = useState(new Date());

  // Auto apply disabled
  const [manualApplyValue, setManualApplyValue] = useState(null);

  // Form integration
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    eventDate: null,
  });
  const [formErrors, setFormErrors] = useState({
    startDate: '',
    endDate: '',
    eventDate: '',
  });

  const validateForm = () => {
    const errors = {
      startDate: !formData.startDate ? 'Start date is required' : '',
      endDate: !formData.endDate ? 'End date is required' : '',
      eventDate: !formData.eventDate ? 'Event date is required' : '',
    };

    if (formData.startDate && formData.endDate) {
      if (formData.startDate > formData.endDate) {
        errors.endDate = 'End date must be after start date';
      }
    }

    setFormErrors(errors);
  };

  const submitForm = (e) => {
    e.preventDefault();
    validateForm();
    if (!formErrors.startDate && !formErrors.endDate && !formErrors.eventDate) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="date-picker-demo">
      <h1>Date Picker Component Demo</h1>
      <p>This page demonstrates the Date Picker component with various configurations and examples.</p>

      <section className="demo-section">
        <h2>Basic Date Picker</h2>
        <p>A simple date picker for selecting a single date.</p>
        <div className="demo-group">
          <BasicDatePicker modelValue={basicValue} onModelValueChange={setBasicValue} placeholder="Select date" />
          <p className="result">Selected: {basicValue ? (basicValue instanceof Date ? basicValue.toLocaleDateString() : String(basicValue)) : 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Date Time Picker</h2>
        <p>Date picker with time selection integrated.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={dateTimeValue}
            onModelValueChange={setDateTimeValue}
            type="datetime"
            placeholder="Select date and time"
          />
          <p className="result">
            Selected: {dateTimeValue ? (dateTimeValue instanceof Date ? dateTimeValue.toLocaleString() : String(dateTimeValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Range Picker</h2>
        <p>Select a date range (start and end dates).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={rangeValue}
            onModelValueChange={setRangeValue}
            range={true}
            placeholder="Select date range"
          />
          <p className="result">
            Selected:{' '}
            {rangeValue && rangeValue.start && rangeValue.end
              ? `${rangeValue.start instanceof Date ? rangeValue.start.toLocaleDateString() : rangeValue.start} - ${rangeValue.end instanceof Date ? rangeValue.end.toLocaleDateString() : rangeValue.end}`
              : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Multi Dates Selection</h2>
        <p>Select multiple dates (up to 5 dates).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={multiDatesValue}
            onModelValueChange={setMultiDatesValue}
            multiDates={true}
            multiDatesLimit={5}
            placeholder="Select multiple dates"
          />
          <p className="result">
            Selected:{' '}
            {multiDatesValue && multiDatesValue.length > 0
              ? multiDatesValue.map((d) => (d instanceof Date ? d.toLocaleDateString() : String(d))).join(', ')
              : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Min/Max Date Constraints</h2>
        <p>Date picker with minimum and maximum date constraints (7 days ago to 30 days from now).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={minMaxValue}
            onModelValueChange={setMinMaxValue}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Select date (within range)"
          />
          <p className="result">
            Selected: {minMaxValue ? (minMaxValue instanceof Date ? minMaxValue.toLocaleDateString() : String(minMaxValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Disabled Dates</h2>
        <p>Date picker with specific dates disabled.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={disabledDatesValue}
            onModelValueChange={setDisabledDatesValue}
            disabledDates={disabledDates}
            placeholder="Select date (some dates disabled)"
          />
          <p className="result">
            Selected:{' '}
            {disabledDatesValue ? (disabledDatesValue instanceof Date ? disabledDatesValue.toLocaleDateString() : String(disabledDatesValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Disabled Week Days</h2>
        <p>Date picker with weekends disabled (Saturday = 6, Sunday = 0).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={weekendDisabledValue}
            onModelValueChange={setWeekendDisabledValue}
            disabledWeekDays={[0, 6]}
            placeholder="Select date (weekends disabled)"
          />
          <p className="result">
            Selected:{' '}
            {weekendDisabledValue ? (weekendDisabledValue instanceof Date ? weekendDisabledValue.toLocaleDateString() : String(weekendDisabledValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Custom Format</h2>
        <p>Date picker with custom display format (MM/dd/yyyy).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={customFormatValue}
            onModelValueChange={setCustomFormatValue}
            displayFormat="MM/dd/yyyy"
            placeholder="Select date (MM/DD/YYYY)"
          />
          <p className="result">
            Selected: {customFormatValue ? (customFormatValue instanceof Date ? customFormatValue.toLocaleDateString() : String(customFormatValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Clearable</h2>
        <p>Date picker with clear button enabled.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={clearableValue}
            onModelValueChange={setClearableValue}
            clearable={true}
            placeholder="Select date"
          />
          <p className="result">
            Selected: {clearableValue ? (clearableValue instanceof Date ? clearableValue.toLocaleDateString() : String(clearableValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>With Label</h2>
        <p>Date picker with a label.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={labeledValue}
            onModelValueChange={setLabeledValue}
            label="Select Date"
            placeholder="Choose a date"
          />
          <p className="result">
            Selected: {labeledValue ? (labeledValue instanceof Date ? labeledValue.toLocaleDateString() : String(labeledValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Disabled State</h2>
        <p>Date picker in disabled state.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={disabledValue}
            onModelValueChange={setDisabledValue}
            disabled={true}
            placeholder="This field is disabled"
          />
          <p className="result">
            Selected: {disabledValue ? (disabledValue instanceof Date ? disabledValue.toLocaleDateString() : String(disabledValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Readonly State</h2>
        <p>Date picker in readonly state.</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={readonlyValue}
            onModelValueChange={setReadonlyValue}
            readonly={true}
            placeholder="This field is readonly"
          />
          <p className="result">
            Selected: {readonlyValue ? (readonlyValue instanceof Date ? readonlyValue.toLocaleDateString() : String(readonlyValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Manual Apply</h2>
        <p>Date picker with auto-apply disabled (requires clicking Apply button).</p>
        <div className="demo-group">
          <BasicDatePicker
            modelValue={manualApplyValue}
            onModelValueChange={setManualApplyValue}
            autoApply={false}
            placeholder="Select date and click Apply"
          />
          <p className="result">
            Selected: {manualApplyValue ? (manualApplyValue instanceof Date ? manualApplyValue.toLocaleDateString() : String(manualApplyValue)) : 'None'}
          </p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Form Integration</h2>
        <p>Date picker integrated into a form with validation.</p>
        <form onSubmit={submitForm} className="form-example">
          <div className="form-group">
            <label>Start Date</label>
            <BasicDatePicker
              modelValue={formData.startDate}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, startDate: value }))}
              placeholder="Select start date"
              rules={[{ rule: 'required', message: 'Start date is required' }]}
            />
            {formErrors.startDate && <span className="error">{formErrors.startDate}</span>}
          </div>

          <div className="form-group">
            <label>End Date</label>
            <BasicDatePicker
              modelValue={formData.endDate}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, endDate: value }))}
              placeholder="Select end date"
              rules={[{ rule: 'required', message: 'End date is required' }]}
            />
            {formErrors.endDate && <span className="error">{formErrors.endDate}</span>}
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <BasicDatePicker
              modelValue={formData.eventDate}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, eventDate: value }))}
              type="datetime"
              placeholder="Select event date and time"
              rules={[{ rule: 'required', message: 'Event date is required' }]}
            />
            {formErrors.eventDate && <span className="error">{formErrors.eventDate}</span>}
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
      </section>
    </div>
  );
};

export default DatePickerDemo;

