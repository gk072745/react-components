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
            width={220}
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
            width={220} 
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
            width={220}
          />
          <p>Selected: {multipleValue.length > 0 ? multipleValue.join(', ') : 'None'}</p>
        </div>
        <p>Multiple selection with chips display. Click chips to remove items.</p>
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
            width={220}
          />
          <p>Selected items appear at the top of the list</p>
        </div>
      </section>

      {/* Placements - Top */}
      <section className="demo-section">
        <h2>Top Placements</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Top" placement="top" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Top Start" placement="top-start" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Top End" placement="top-end" width={220} />
        </div>
      </section>

      {/* Placements - Bottom */}
      <section className="demo-section">
        <h2>Bottom Placements</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Bottom" placement="bottom" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Bottom Start" placement="bottom-start" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Bottom End" placement="bottom-end" width={220} />
        </div>
      </section>

      {/* Placements - Left */}
      <section className="demo-section">
        <h2>Left Placements</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Left" placement="left" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Left Top" placement="left-top" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Left Bottom" placement="left-bottom" width={220} />
        </div>
      </section>

      {/* Placements - Right */}
      <section className="demo-section">
        <h2>Right Placements</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Right" placement="right" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Right Top" placement="right-top" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Right Bottom" placement="right-bottom" width={220} />
        </div>
      </section>

      {/* Trigger Types */}
      <section className="demo-section">
        <h2>Trigger Types</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Click Trigger" triggerType="click" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Hover Trigger" triggerType="hover" width={220} />
        </div>
        <p>Click or hover to open the dropdown</p>
      </section>

      {/* Width Options */}
      <section className="demo-section">
        <h2>Width Options</h2>
        <div className="demo-group">
          <BasicDropdown items={simpleItems} buttonText="Auto Button Width" buttonWidth="auto" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Fixed 200px Button" buttonWidth="200px" width={200} />
          <BasicDropdown items={simpleItems} buttonText="Full Width Button" buttonWidth="100%" width={220} />
          <BasicDropdown items={simpleItems} buttonText="Match Button Width" buttonWidth="250px" width={null} />
          <BasicDropdown items={simpleItems} buttonText="Custom Menu Width" buttonWidth="auto" width={300} />
        </div>
        <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
          When width is null, menu width matches button width. Otherwise, use custom width.
        </p>
      </section>

      {/* Disabled State */}
      <section className="demo-section">
        <h2>Disabled State</h2>
        <div className="demo-group">
          <BasicDropdown items={simpleItems} buttonText="Disabled Dropdown" disabled={true} width={220} />
        </div>
        <p>Disabled dropdown cannot be opened or interacted with</p>
      </section>

      {/* No Data */}
      <section className="demo-section">
        <h2>Empty State</h2>
        <div className="demo-group">
          <BasicDropdown items={[]} buttonText="Empty Dropdown" noDataText="No items available" width={220} />
        </div>
        <p>Dropdown with no items shows empty state message</p>
      </section>

      {/* Custom Slots */}
      <section className="demo-section">
        <h2>Custom Slots</h2>
        <div className="demo-group">
          <BasicDropdown
            items={objectItems}
            modelValue={customValue}
            onModelValueChange={setCustomValue}
            itemText="text"
            itemValue="value"
            buttonText="Custom Trigger"
            width={200}
          >
            {({ name, item, selected }) => {
              if (name === 'item') {
                return (
                  <div style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: selected ? 'bold' : 'normal', color: selected ? '#3b82f6' : '#374151' }}>
                      {item.text}
                    </span>
                    {selected && <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✓</span>}
                  </div>
                );
              }
              return null;
            }}
          </BasicDropdown>
          <p>Custom item rendering using slot API</p>
        </div>
      </section>

      {/* Programmatic Control */}
      <section className="demo-section">
        <h2>Programmatic Control</h2>
        <div className="demo-group">
          <BasicDropdown ref={dropdownRef} items={simpleItems} buttonText="Controlled Dropdown" width={220} />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => dropdownRef.current?.openMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Open Menu
            </button>
            <button
              onClick={() => dropdownRef.current?.closeMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Close Menu
            </button>
            <button
              onClick={() => dropdownRef.current?.toggleMenu()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
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
            onModelValueChange={(value) => {
              setCustomValue(value);
              console.log('Value changed:', value);
            }}
            onItemSelect={(item) => {
              console.log('Item selected:', item);
            }}
            onItemUnselect={(item) => {
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
            width={220}
          />
          <p>Check console for event logs</p>
        </div>
        <p>All events are logged to the console</p>
      </section>

      {/* Custom Styling */}
      <section className="demo-section">
        <h2>Custom Styling</h2>
        <div className="demo-group">
          <BasicDropdown items={simpleItems} buttonText="Custom Class" className="custom-dropdown" width={220} />
        </div>
        <p>Apply custom styling using className prop</p>
      </section>

      {/* Offset Examples */}
      <section className="demo-section">
        <h2>Custom Offset</h2>
        <div className="demo-group-row">
          <BasicDropdown items={simpleItems} buttonText="Default Offset" placement="bottom" offset={[0, 0.125]} width={220} />
          <BasicDropdown items={simpleItems} buttonText="Large Offset" placement="bottom" offset={[0, 0.5]} width={220} />
          <BasicDropdown items={simpleItems} buttonText="No Offset" placement="bottom" offset={[0, 0]} width={220} />
        </div>
        <p>Adjust spacing between trigger and menu</p>
      </section>
    </div>
  );
};

export default DropdownDemo;

