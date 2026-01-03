import React, { useState, useEffect } from 'react';
import BasicAutocomplete from '@/components/sharedComponents/BasicAutocomplete';
import '@/assets/scss/pages/_autocomplete-demo.scss';

const AutocompleteDemo = () => {
  // Basic autocomplete
  const [basicValue, setBasicValue] = useState(null);
  const basicItems = [
    { text: 'Afghanistan', value: 'af' },
    { text: 'Albania', value: 'al' },
    { text: 'Algeria', value: 'dz' },
    { text: 'Argentina', value: 'ar' },
    { text: 'Australia', value: 'au' },
    { text: 'Austria', value: 'at' },
    { text: 'Belgium', value: 'be' },
    { text: 'Brazil', value: 'br' },
    { text: 'Canada', value: 'ca' },
    { text: 'China', value: 'cn' },
  ];

  // Multiple selection
  const [multipleValue, setMultipleValue] = useState([]);
  const multipleItems = [
    { text: 'React', value: 'react' },
    { text: 'Vue', value: 'vue' },
    { text: 'Angular', value: 'angular' },
    { text: 'Svelte', value: 'svelte' },
    { text: 'Ember', value: 'ember' },
    { text: 'Backbone', value: 'backbone' },
    { text: 'Preact', value: 'preact' },
    { text: 'Alpine.js', value: 'alpine' },
  ];

  // Clearable autocomplete
  const [clearableValue, setClearableValue] = useState('react');
  const clearableItems = [
    { text: 'JavaScript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },
    { text: 'Python', value: 'py' },
    { text: 'Java', value: 'java' },
    { text: 'C++', value: 'cpp' },
    { text: 'Ruby', value: 'rb' },
    { text: 'Go', value: 'go' },
    { text: 'Rust', value: 'rust' },
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
    { text: 'Qwik', value: 'qwik' },
    { text: 'Lit', value: 'lit' },
  ];

  // Loading state
  const [loadingValue, setLoadingValue] = useState(null);
  const [loadingItems, setLoadingItems] = useState([
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingItems([
        { text: 'Apple', value: 'apple' },
        { text: 'Banana', value: 'banana' },
        { text: 'Cherry', value: 'cherry' },
        { text: 'Date', value: 'date' },
        { text: 'Elderberry', value: 'elderberry' },
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Async search simulation
  const [asyncValue, setAsyncValue] = useState(null);
  const [asyncItems, setAsyncItems] = useState([]);
  const [asyncLoading, setAsyncLoading] = useState(false);

  const handleAsyncSearch = (searchText) => {
    if (!searchText || searchText.length < 2) {
      setAsyncItems([]);
      return;
    }

    setAsyncLoading(true);

    // Simulate API call
    setTimeout(() => {
      const allUsers = [
        { text: 'John Doe', value: 'john' },
        { text: 'Jane Smith', value: 'jane' },
        { text: 'Bob Johnson', value: 'bob' },
        { text: 'Alice Williams', value: 'alice' },
        { text: 'Charlie Brown', value: 'charlie' },
        { text: 'Diana Prince', value: 'diana' },
        { text: 'Edward Norton', value: 'edward' },
        { text: 'Fiona Apple', value: 'fiona' },
      ];

      setAsyncItems(allUsers.filter((user) => user.text.toLowerCase().includes(searchText.toLowerCase())));
      setAsyncLoading(false);
    }, 500);
  };

  // Custom filter function
  const [customFilterValue, setCustomFilterValue] = useState([]);
  const customFilterItems = [
    { text: 'Apple MacBook Pro', value: 'mbp', category: 'laptop' },
    { text: 'Apple iPhone 15', value: 'iphone15', category: 'phone' },
    { text: 'Apple iPad Air', value: 'ipad', category: 'tablet' },
    { text: 'Samsung Galaxy S24', value: 's24', category: 'phone' },
    { text: 'Samsung Galaxy Book', value: 'book', category: 'laptop' },
    { text: 'Dell XPS 13', value: 'xps', category: 'laptop' },
    { text: 'Microsoft Surface Pro', value: 'surface', category: 'tablet' },
  ];

  const customFilter = (item, searchText) => {
    const text = item.text.toLowerCase();
    const category = item.category.toLowerCase();
    const search = searchText.toLowerCase();

    // Search in both text and category
    return text.includes(search) || category.includes(search);
  };

  // Disabled state
  const [disabledValue, setDisabledValue] = useState('option1');
  const disabledItems = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
  ];

  // Readonly state
  const [readonlyValue, setReadonlyValue] = useState('read');
  const readonlyItems = [
    { text: 'Readonly Value', value: 'read' },
    { text: 'Another Value', value: 'another' },
  ];

  // No data state
  const [noDataValue, setNoDataValue] = useState(null);
  const noDataItems = [];

  // Different placements
  const [placementValue, setPlacementValue] = useState(null);
  const placementItems = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
    { text: 'Option 3', value: 'opt3' },
  ];

  // Custom width
  const [customWidthValue, setCustomWidthValue] = useState(null);
  const customWidthItems = [
    { text: 'Short', value: 'short' },
    { text: 'Medium length option', value: 'medium' },
    { text: 'Very long option text that might overflow in smaller containers', value: 'long' },
  ];

  // Form validation
  const [formData, setFormData] = useState({
    username: null,
    skills: [],
    country: null,
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    skills: '',
    country: '',
  });

  const usernames = [
    { text: 'john_doe', value: 'john' },
    { text: 'jane_smith', value: 'jane' },
    { text: 'bob_wilson', value: 'bob' },
    { text: 'alice_wonder', value: 'alice' },
  ];

  const skills = [
    { text: 'JavaScript', value: 'js' },
    { text: 'TypeScript', value: 'ts' },
    { text: 'Vue.js', value: 'vue' },
    { text: 'React', value: 'react' },
    { text: 'Node.js', value: 'node' },
    { text: 'Python', value: 'python' },
    { text: 'Docker', value: 'docker' },
    { text: 'Kubernetes', value: 'k8s' },
  ];

  const countries = [
    { text: 'United States', value: 'us' },
    { text: 'United Kingdom', value: 'uk' },
    { text: 'Canada', value: 'ca' },
    { text: 'Australia', value: 'au' },
    { text: 'Germany', value: 'de' },
    { text: 'France', value: 'fr' },
    { text: 'Japan', value: 'jp' },
    { text: 'India', value: 'in' },
  ];

  // Methods
  const validateForm = () => {
    setFormErrors({
      username: !formData.username ? 'Username is required' : '',
      skills: formData.skills.length === 0 ? 'At least one skill is required' : '',
      country: !formData.country ? 'Country is required' : '',
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    validateForm();
    if (!formErrors.username && !formErrors.skills && !formErrors.country) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="autocomplete-demo">
      <h1>BasicAutocomplete Component Demo</h1>

      {/* Basic Autocomplete */}
      <section className="demo-section">
        <h2>Basic Autocomplete</h2>
        <p>A simple autocomplete with single selection and search functionality.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={basicItems}
            modelValue={basicValue}
            onModelValueChange={setBasicValue}
            placeholder="Search for a country..."
            onSelect={(item, value) => console.log('Selected:', item, value)}
            onSearch={(searchText) => console.log('Searching for:', searchText)}
          />
          <p className="result">Selected: {basicValue || 'None'}</p>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="demo-section">
        <h2>Multiple Selection</h2>
        <p>Autocomplete with multiple selection and chip display.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={multipleItems}
            modelValue={multipleValue}
            onModelValueChange={setMultipleValue}
            multiple={true}
            placeholder="Select frameworks..."
            onSelect={(item, value) => console.log('Selected:', item, value)}
            onRemove={(item, value) => console.log('Removed:', item, value)}
          />
          <p className="result">Selected: {multipleValue.length > 0 ? multipleValue.join(', ') : 'None'}</p>
        </div>
      </section>

      {/* Clearable Input */}
      <section className="demo-section">
        <h2>Clearable Input</h2>
        <p>Autocomplete with a clear button to quickly reset the selection.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={clearableItems}
            modelValue={clearableValue}
            onModelValueChange={setClearableValue}
            clearable={true}
            placeholder="Select a programming language..."
          />
          <p className="result">Selected: {clearableValue || 'None'}</p>
        </div>
      </section>

      {/* Selected Items on Top */}
      <section className="demo-section">
        <h2>Selected Items on Top</h2>
        <p>Keep chosen options at the top of the list for easier management.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={selectedOnTopItems}
            modelValue={selectedOnTopValue}
            onModelValueChange={setSelectedOnTopValue}
            multiple={true}
            selectedOnTop={true}
            placeholder="Select frameworks..."
          />
          <p className="result">Selected: {selectedOnTopValue.length > 0 ? selectedOnTopValue.join(', ') : 'None'}</p>
        </div>
      </section>

      {/* Loading State */}
      <section className="demo-section">
        <h2>Loading State</h2>
        <p>Display a loading spinner while fetching data.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={loadingItems}
            modelValue={loadingValue}
            onModelValueChange={setLoadingValue}
            loading={isLoading}
            placeholder="Loading options..."
          />
          <p className="result">Selected: {loadingValue || 'None'}</p>
        </div>
      </section>

      {/* Async Search */}
      <section className="demo-section">
        <h2>Async Search</h2>
        <p>Perform asynchronous searches as the user types.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={asyncItems}
            modelValue={asyncValue}
            onModelValueChange={setAsyncValue}
            loading={asyncLoading}
            placeholder="Search for a user (type at least 2 characters)..."
            onSearch={handleAsyncSearch}
          />
          <p className="result">Selected: {asyncValue || 'None'}</p>
        </div>
      </section>

      {/* Custom Filter Function */}
      <section className="demo-section">
        <h2>Custom Filter Function</h2>
        <p>Use a custom filter function to search across multiple properties.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={customFilterItems}
            modelValue={customFilterValue}
            onModelValueChange={setCustomFilterValue}
            multiple={true}
            filterFunction={customFilter}
            placeholder="Search by product name or category..."
          />
          <p className="result">Selected: {customFilterValue.length > 0 ? customFilterValue.join(', ') : 'None'}</p>
        </div>
      </section>

      {/* Disabled State */}
      <section className="demo-section">
        <h2>Disabled State</h2>
        <p>Autocomplete in disabled state.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={disabledItems}
            modelValue={disabledValue}
            onModelValueChange={setDisabledValue}
            disabled={true}
            placeholder="This field is disabled"
          />
          <p className="result">Selected: {disabledValue || 'None'}</p>
        </div>
      </section>

      {/* Readonly State */}
      <section className="demo-section">
        <h2>Readonly State</h2>
        <p>Autocomplete in readonly state.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={readonlyItems}
            modelValue={readonlyValue}
            onModelValueChange={setReadonlyValue}
            readonly={true}
            placeholder="This field is readonly"
          />
          <p className="result">Selected: {readonlyValue || 'None'}</p>
        </div>
      </section>

      {/* No Data State */}
      <section className="demo-section">
        <h2>No Data State</h2>
        <p>Autocomplete with no available options.</p>
        <div className="demo-group">
          <BasicAutocomplete
            items={noDataItems}
            modelValue={noDataValue}
            onModelValueChange={setNoDataValue}
            placeholder="No items available"
          />
          <p className="result">Selected: {noDataValue || 'None'}</p>
        </div>
      </section>

      {/* Different Placements */}
      <section className="demo-section">
        <h2>Different Placements</h2>
        <p>Autocomplete with various placement options.</p>
        <div className="placement-examples">
          <div className="demo-group">
            <BasicAutocomplete
              items={placementItems}
              modelValue={placementValue}
              onModelValueChange={setPlacementValue}
              placement="bottom"
              placeholder="Bottom (default)"
            />
          </div>
          <div className="demo-group">
            <BasicAutocomplete
              items={placementItems}
              modelValue={placementValue}
              onModelValueChange={setPlacementValue}
              placement="top"
              placeholder="Top"
            />
          </div>
        </div>
      </section>

      {/* Custom Width */}
      <section className="demo-section">
        <h2>Custom Width</h2>
        <p>Autocomplete with custom menu width.</p>
        <div className="width-examples">
          <div className="demo-group">
            <BasicAutocomplete
              items={customWidthItems}
              modelValue={customWidthValue}
              onModelValueChange={setCustomWidthValue}
              placeholder="Default width (matches trigger)"
            />
          </div>
          <div className="demo-group">
            <BasicAutocomplete
              items={customWidthItems}
              modelValue={customWidthValue}
              onModelValueChange={setCustomWidthValue}
              menuWidth={400}
              placeholder="Custom width (400px)"
            />
          </div>
        </div>
        <p className="result">Selected: {customWidthValue || 'None'}</p>
      </section>

      {/* Form Integration */}
      <section className="demo-section">
        <h2>Form Integration</h2>
        <p>Autocomplete integrated into a form with validation.</p>
        <form onSubmit={submitForm} className="form-example">
          <div className="form-group">
            <label>Username</label>
            <BasicAutocomplete
              items={usernames}
              modelValue={formData.username}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, username: value }))}
              placeholder="Search for a username..."
            />
            {formErrors.username && <span className="error">{formErrors.username}</span>}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <BasicAutocomplete
              items={skills}
              modelValue={formData.skills}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, skills: value }))}
              multiple={true}
              placeholder="Select your skills..."
            />
            {formErrors.skills && <span className="error">{formErrors.skills}</span>}
          </div>

          <div className="form-group">
            <label>Country</label>
            <BasicAutocomplete
              items={countries}
              modelValue={formData.country}
              onModelValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
              clearable={true}
              placeholder="Search for your country..."
            />
            {formErrors.country && <span className="error">{formErrors.country}</span>}
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

export default AutocompleteDemo;

