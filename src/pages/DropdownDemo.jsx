import React, { useState, useRef } from 'react';
import BasicDropdown from '@/components/sharedComponents/BasicDropdown';
import '@/assets/scss/pages/_dropdown-demo.scss';

const DropdownDemo = () => {
  const [singleValue, setSingleValue] = useState(null);
  const [multipleValue, setMultipleValue] = useState([]);
  const [customValue, setCustomValue] = useState(null);
  const dropdownRef = useRef(null);

  // Sample data
  const simpleItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const objectItems = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' },
    { text: 'Option 3', value: 'opt3' },
    { text: 'Option 4', value: 'opt4' },
  ];
  const countryItems = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
  ];

  return (
    <div className="dropdown-demo">
      <h1>BasicDropdown Component Demo</h1>

      {/* Basic Single Selection */}
      <section className="demo-section">
        <h2>Basic Single Selection</h2>
        <div className="demo-group">
          <BasicDropdown
            items={simpleItems}
            modelValue={singleValue}
            onModelValueChange={setSingleValue}
            buttonText="Select a fruit"
          />
          <p>Selected: {singleValue || 'None'}</p>
        </div>
        <p>Simple dropdown with string items</p>
      </section>

      {/* Object Items */}
      <section className="demo-section">
        <h2>Object Items with Custom Keys</h2>
        <div className="demo-group">
          <BasicDropdown
            items={objectItems}
            modelValue={customValue}
            onModelValueChange={setCustomValue}
            itemText="text"
            itemValue="value"
            buttonText="Select an option"
          />
          <p>Selected: {customValue || 'None'}</p>
        </div>
        <p>Dropdown with object items using custom text and value keys</p>
      </section>

      {/* Multiple Selection */}
      <section className="demo-section">
        <h2>Multiple Selection</h2>
        <div className="demo-group">
          <BasicDropdown
            items={countryItems}
            modelValue={multipleValue}
            onModelValueChange={setMultipleValue}
            itemText="name"
            itemValue="code"
            multiple={true}
            buttonText="Select countries"
          />
          <p>Selected: {multipleValue.length > 0 ? multipleValue.join(', ') : 'None'}</p>
        </div>
        <p>Multiple selection with chips display</p>
      </section>

      {/* Selected on Top */}
      <section className="demo-section">
        <h2>Selected Items on Top</h2>
        <div className="demo-group">
          <BasicDropdown
            items={countryItems}
            modelValue={multipleValue}
            onModelValueChange={setMultipleValue}
            itemText="name"
            itemValue="code"
            multiple={true}
            selectedOnTop={true}
            buttonText="Select countries (sorted)"
          />
          <p>Selected items appear at the top of the list</p>
        </div>
      </section>

      {/* Placements */}
      <section className="demo-section">
        <h2>Different Placements</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Top" placement="top" />
          <BasicDropdown items={simpleItems} buttonText="Bottom" placement="bottom" />
          <BasicDropdown items={simpleItems} buttonText="Left" placement="left" />
          <BasicDropdown items={simpleItems} buttonText="Right" placement="right" />
        </div>
        <div className="demo-group-row" style={{ marginTop: '1rem' }}>
          <BasicDropdown items={simpleItems} buttonText="Top Start" placement="top-start" />
          <BasicDropdown items={simpleItems} buttonText="Top End" placement="top-end" />
          <BasicDropdown items={simpleItems} buttonText="Bottom Start" placement="bottom-start" />
          <BasicDropdown items={simpleItems} buttonText="Bottom End" placement="bottom-end" />
        </div>
        <p>Different placement options for the dropdown menu</p>
      </section>

      {/* Trigger Types */}
      <section className="demo-section">
        <h2>Trigger Types</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Click Trigger" triggerType="click" />
          <BasicDropdown items={simpleItems} buttonText="Hover Trigger" triggerType="hover" />
        </div>
        <p>Click or hover to open the dropdown</p>
      </section>

      {/* Width Options */}
      <section className="demo-section">
        <h2>Width Options</h2>
        <div className="demo-group">
          <BasicDropdown items={simpleItems} buttonText="Auto Width" buttonWidth="auto" />
          <BasicDropdown items={simpleItems} buttonText="Fixed 200px" buttonWidth="200px" />
          <BasicDropdown items={simpleItems} buttonText="Full Width" buttonWidth="100%" />
          <BasicDropdown items={simpleItems} buttonText="Custom Menu Width" width={300} />
        </div>
        <p>Different width configurations for button and menu</p>
      </section>

      {/* Disabled State */}
      <section className="demo-section">
        <h2>Disabled State</h2>
        <div className="demo-group">
          <BasicDropdown items={simpleItems} buttonText="Disabled Dropdown" disabled={true} />
        </div>
        <p>Disabled dropdown cannot be opened</p>
      </section>

      {/* No Data */}
      <section className="demo-section">
        <h2>Empty State</h2>
        <div className="demo-group">
          <BasicDropdown items={[]} buttonText="Empty Dropdown" noDataText="No items available" />
        </div>
        <p>Dropdown with no items shows empty state message</p>
      </section>

      {/* Programmatic Control */}
      <section className="demo-section">
        <h2>Programmatic Control</h2>
        <div className="demo-group">
          <BasicDropdown ref={dropdownRef} items={simpleItems} buttonText="Controlled Dropdown" />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              onClick={() => dropdownRef.current?.openMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Open Menu
            </button>
            <button
              onClick={() => dropdownRef.current?.closeMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Close Menu
            </button>
            <button
              onClick={() => dropdownRef.current?.toggleMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
              }}
            >
              Toggle Menu
            </button>
          </div>
        </div>
        <p>Control the dropdown programmatically using ref methods</p>
      </section>

      {/* Event Handlers */}
      <section className="demo-section">
        <h2>Event Handlers</h2>
        <div className="demo-group">
          <BasicDropdown
            items={objectItems}
            modelValue={customValue}
            onModelValueChange={value => {
              setCustomValue(value);
              console.log('Value changed:', value);
            }}
            onItemSelect={item => {
              console.log('Item selected:', item);
            }}
            onItemUnselect={item => {
              console.log('Item unselected:', item);
            }}
            onMenuOpen={() => {
              console.log('Menu opened');
            }}
            onMenuClose={() => {
              console.log('Menu closed');
            }}
            itemText="text"
            itemValue="value"
            buttonText="With Event Handlers"
          />
          <p>Check console for event logs</p>
        </div>
        <p>All events are logged to the console</p>
      </section>

      {/* Custom Styling */}
      <section className="demo-section">
        <h2>Custom Styling</h2>
        <div className="demo-group">
          <BasicDropdown
            items={simpleItems}
            buttonText="Custom Class"
            className="custom-dropdown"
          />
        </div>
        <p>Apply custom styling using className prop</p>
      </section>
    </div>
  );
};

export default DropdownDemo;

