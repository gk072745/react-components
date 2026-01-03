import React, { useState, useCallback } from 'react';
import BasicComboBox from '@/components/sharedComponents/BasicComboBox';
import '@/assets/scss/pages/_combobox-demo.scss';

const ComboBoxDemo = () => {
  // Basic combobox
  const [basicValue, setBasicValue] = useState(null);
  const basicItems = [
    { text: 'Apple', value: 'apple' },
    { text: 'Banana', value: 'banana' },
    { text: 'Cherry', value: 'cherry' },
    { text: 'Date', value: 'date' },
    { text: 'Elderberry', value: 'elderberry' },
  ];

  // Multiple selection (tags)
  const [tagsValue, setTagsValue] = useState([]);
  const tagItems = [
    { text: 'JavaScript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },
    { text: 'Python', value: 'py' },
    { text: 'Java', value: 'java' },
    { text: 'C++', value: 'cpp' },
  ];

  // Email addresses
  const [emailsValue, setEmailsValue] = useState([]);
  const emailSuggestions = [
    { text: 'john@example.com', value: 'john@example.com' },
    { text: 'jane@example.com', value: 'jane@example.com' },
    { text: 'bob@example.com', value: 'bob@example.com' },
  ];

  // Create event handling
  const [createValue, setCreateValue] = useState([]);
  const createItems = [
    { text: 'Red', value: 'red' },
    { text: 'Blue', value: 'blue' },
    { text: 'Green', value: 'green' },
  ];
  const [createdItems, setCreatedItems] = useState([]);

  const handleCreate = useCallback((item, value) => {
    setCreatedItems((prev) => [...prev, { item, value, timestamp: new Date().toLocaleTimeString() }]);
  }, []);

  // Clearable combobox
  const [clearableValue, setClearableValue] = useState('custom-value');
  const clearableItems = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
    { text: 'Option 3', value: 'opt3' },
  ];

  // Selected on top
  const [selectedOnTopValue, setSelectedOnTopValue] = useState(['vue', 'react']);
  const selectedOnTopItems = [
    { text: 'React', value: 'react' },
    { text: 'Vue', value: 'vue' },
    { text: 'Angular', value: 'angular' },
    { text: 'Svelte', value: 'svelte' },
    { text: 'Ember', value: 'ember' },
    { text: 'Solid', value: 'solid' },
  ];

  // Custom filter
  const [customFilterValue, setCustomFilterValue] = useState([]);
  const customFilterItems = [
    { text: 'Apple MacBook Pro', value: 'mbp', category: 'laptop', brand: 'Apple' },
    { text: 'Apple iPhone 15', value: 'iphone15', category: 'phone', brand: 'Apple' },
    { text: 'Samsung Galaxy S24', value: 's24', category: 'phone', brand: 'Samsung' },
    { text: 'Dell XPS 13', value: 'xps', category: 'laptop', brand: 'Dell' },
    { text: 'Microsoft Surface Pro', value: 'surface', category: 'tablet', brand: 'Microsoft' },
  ];

  const customFilter = useCallback((item, searchText) => {
    const text = item.text.toLowerCase();
    const category = item.category.toLowerCase();
    const brand = item.brand.toLowerCase();
    const search = searchText.toLowerCase();

    return text.includes(search) || category.includes(search) || brand.includes(search);
  }, []);

  // Disabled state
  const [disabledValue, setDisabledValue] = useState('custom-disabled-value');
  const disabledItems = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
  ];

  // Readonly state
  const [readonlyValue, setReadonlyValue] = useState('readonly-custom');
  const readonlyItems = [
    { text: 'Value 1', value: 'val1' },
    { text: 'Value 2', value: 'val2' },
  ];

  // Different placements
  const [placementValue, setPlacementValue] = useState(null);
  const placementItems = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
    { text: 'Option 3', value: 'opt3' },
  ];

  // Form validation
  const [formData, setFormData] = useState({
    username: null,
    skills: [],
    notes: [],
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    skills: '',
    notes: '',
  });

  const usernameSuggestions = [
    { text: 'john_doe', value: 'john_doe' },
    { text: 'jane_smith', value: 'jane_smith' },
    { text: 'bob_wilson', value: 'bob_wilson' },
  ];

  const skillsSuggestions = [
    { text: 'JavaScript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },
    { text: 'Vue.js', value: 'vue' },
    { text: 'React', value: 'react' },
    { text: 'Node.js', value: 'node' },
  ];

  const validateForm = useCallback(() => {
    setFormErrors({
      username: !formData.username ? 'Username is required' : '',
      skills: formData.skills.length === 0 ? 'At least one skill is required' : '',
      notes: formData.notes.length === 0 ? 'At least one note is required' : '',
    });
  }, [formData]);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      validateForm();
      if (!formErrors.username && !formErrors.skills && !formErrors.notes) {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
      }
    },
    [formData, formErrors, validateForm],
  );

  return (
    <div className="combobox-demo">
      <h1>ComboBox Component Demo</h1>
      <p>This page demonstrates the ComboBox component with various configurations and examples.</p>

      <section className="demo-section">
        <h2>Basic ComboBox</h2>
        <p>A simple combobox where users can select from options or type their own value.</p>
        <div className="demo-group">
          <BasicComboBox modelValue={basicValue} onModelValueChange={setBasicValue} items={basicItems} placeholder="Select or type your own..." />
          <p className="result">Selected: {basicValue || 'None'}</p>
          <p className="tip">💡 Tip: Type anything and press Enter or click outside to create a custom value</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Tag Input (Multiple Selection)</h2>
        <p>Create custom tags or select from suggestions.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={tagsValue}
            onModelValueChange={setTagsValue}
            items={tagItems}
            multiple={true}
            placeholder="Type tags and press Enter..."
          />
          <p className="result">Selected: {tagsValue.length > 0 ? tagsValue.join(', ') : 'None'}</p>
          <p className="tip">💡 Tip: Type any text and press Enter to create custom tags</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Email Address Input</h2>
        <p>Perfect for email input with suggestions and custom entries.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={emailsValue}
            onModelValueChange={setEmailsValue}
            items={emailSuggestions}
            multiple={true}
            placeholder="Type email addresses..."
          />
          <p className="result">Emails: {emailsValue.length > 0 ? emailsValue.join(', ') : 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Create Event Handling</h2>
        <p>Track when custom items are created.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={createValue}
            onModelValueChange={setCreateValue}
            items={createItems}
            multiple={true}
            placeholder="Add colors..."
            onCreate={handleCreate}
          />
          <p className="result">Selected: {createValue.length > 0 ? createValue.join(', ') : 'None'}</p>
          {createdItems.length > 0 && (
            <div className="created-items">
              <h4>Recently Created Items:</h4>
              <ul>
                {createdItems.map((created, index) => (
                  <li key={index}>
                    <strong>{created.value}</strong> at {created.timestamp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2>Clearable Input</h2>
        <p>ComboBox with a clear button.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={clearableValue}
            onModelValueChange={setClearableValue}
            items={clearableItems}
            clearable={true}
            placeholder="Select or type..."
          />
          <p className="result">Selected: {clearableValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Selected Items on Top</h2>
        <p>Keep chosen options at the top of the list.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={selectedOnTopValue}
            onModelValueChange={setSelectedOnTopValue}
            items={selectedOnTopItems}
            multiple={true}
            selectedOnTop={true}
            placeholder="Select or add frameworks..."
          />
          <p className="result">Selected: {selectedOnTopValue.length > 0 ? selectedOnTopValue.join(', ') : 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Custom Filter Function</h2>
        <p>Search across multiple properties.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={customFilterValue}
            onModelValueChange={setCustomFilterValue}
            items={customFilterItems}
            multiple={true}
            filterFunction={customFilter}
            placeholder="Search by name, category, or brand..."
          />
          <p className="result">Selected: {customFilterValue.length > 0 ? customFilterValue.join(', ') : 'None'}</p>
          <p className="tip">💡 Try searching "laptop", "Apple", or "phone"</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Disabled State</h2>
        <p>ComboBox in disabled state.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={disabledValue}
            onModelValueChange={setDisabledValue}
            items={disabledItems}
            disabled={true}
            placeholder="This field is disabled"
          />
          <p className="result">Selected: {disabledValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Readonly State</h2>
        <p>ComboBox in readonly state.</p>
        <div className="demo-group">
          <BasicComboBox
            modelValue={readonlyValue}
            onModelValueChange={setReadonlyValue}
            items={readonlyItems}
            readonly={true}
            placeholder="This field is readonly"
          />
          <p className="result">Selected: {readonlyValue || 'None'}</p>
        </div>
      </section>

      <section className="demo-section">
        <h2>Different Placements</h2>
        <p>ComboBox with various placement options.</p>
        <div className="demo-group placement-examples">
          <BasicComboBox
            modelValue={placementValue}
            onModelValueChange={setPlacementValue}
            items={placementItems}
            placement="bottom"
            placeholder="Bottom (default)"
          />
          <BasicComboBox
            modelValue={placementValue}
            onModelValueChange={setPlacementValue}
            items={placementItems}
            placement="top"
            placeholder="Top"
          />
        </div>
      </section>

      <section className="demo-section">
        <h2>Form Integration</h2>
        <p>ComboBox integrated into a form with validation.</p>
        <div className="demo-group">
          <form onSubmit={submitForm} className="form-example">
            <div className="form-group">
              <label>Username</label>
              <BasicComboBox
                modelValue={formData.username}
                onModelValueChange={(value) => setFormData((prev) => ({ ...prev, username: value }))}
                items={usernameSuggestions}
                placeholder="Select or type username..."
              />
              {formErrors.username && <span className="error">{formErrors.username}</span>}
            </div>

            <div className="form-group">
              <label>Skills</label>
              <BasicComboBox
                modelValue={formData.skills}
                onModelValueChange={(value) => setFormData((prev) => ({ ...prev, skills: value }))}
                items={skillsSuggestions}
                multiple={true}
                placeholder="Add your skills..."
              />
              {formErrors.skills && <span className="error">{formErrors.skills}</span>}
            </div>

            <div className="form-group">
              <label>Notes/Tags</label>
              <BasicComboBox
                modelValue={formData.notes}
                onModelValueChange={(value) => setFormData((prev) => ({ ...prev, notes: value }))}
                items={[]}
                multiple={true}
                placeholder="Type notes or tags..."
              />
              {formErrors.notes && <span className="error">{formErrors.notes}</span>}
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
    </div>
  );
};

export default ComboBoxDemo;

