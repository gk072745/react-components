import React, { useState } from 'react';
import BasicCheckbox from '../components/sharedComponents/BasicCheckbox';

const CheckboxDemo = () => {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================
  const [selectedItems, setSelectedItems] = useState([]);
  const [customColors, setCustomColors] = useState({
    backgroundColor: '#2196F3',
    innerTickColor: '#ffffff',
    labelColor: '#333333',
  });

  // =============================================================================
  // SAMPLE DATA
  // =============================================================================
  const sampleItems = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
    { id: 4, name: 'Tomato', category: 'Vegetable' },
    { id: 5, name: 'Orange', category: 'Fruit' },
  ];

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================
  const handleCheckboxChange = (newValue, currentValue) => {
    setSelectedItems(newValue);
    console.log('Selected items:', newValue);
    console.log('Current value:', currentValue);
  };

  // =============================================================================
  // CUSTOM COMPONENTS
  // =============================================================================
  const CustomIcon = ({ isChecked }) => (
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '2px solid #ff6b6b',
        borderRadius: '4px',
        backgroundColor: isChecked ? '#ff6b6b' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {isChecked ? '✓' : ''}
    </div>
  );

  const CustomLabel = ({ isChecked }) => (
    <span
      style={{
        color: isChecked ? '#ff6b6b' : '#666666',
        fontWeight: isChecked ? 'bold' : 'normal',
      }}
    >
      Custom Label {isChecked ? '(Selected)' : '(Not Selected)'}
    </span>
  );

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>BasicCheckbox Demos</h1>

      {/* Demo 1: Basic Checkbox */}
      <h3 style={{ marginTop: '2rem' }}>Demo 1: Basic Checkbox</h3>
      <BasicCheckbox label="Basic Checkbox" value="basic" selected={selectedItems} onChange={handleCheckboxChange} />

      {/* Demo 2: Size Variants */}
      <h3 style={{ marginTop: '2rem' }}>Demo 2: Size Variants</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <BasicCheckbox
          size="xs"
          label="Extra Small (xs)"
          value="xs"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          size="sm"
          label="Small (sm)"
          value="sm"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          size="md"
          label="Medium (md) - Default"
          value="md"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          size="lg"
          label="Large (lg)"
          value="lg"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          size="xl"
          label="Extra Large (xl)"
          value="xl"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
      </div>

      {/* Demo 3: Disabled and Readonly States */}
      <h3 style={{ marginTop: '2rem' }}>Demo 3: Disabled and Readonly States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <BasicCheckbox
          label="Normal Checkbox"
          value="normal"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          disabled={true}
          label="Disabled Checkbox"
          value="disabled"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox
          readonly={true}
          label="Readonly Checkbox"
          value="readonly"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
      </div>

      {/* Demo 4: Custom Colors */}
      <h3 style={{ marginTop: '2rem' }}>Demo 4: Custom Colors</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Background Color:
          <input
            type="color"
            value={customColors.backgroundColor}
            onChange={e => setCustomColors(prev => ({ ...prev, backgroundColor: e.target.value }))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Tick Color:
          <input
            type="color"
            value={customColors.innerTickColor}
            onChange={e => setCustomColors(prev => ({ ...prev, innerTickColor: e.target.value }))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Label Color:
          <input
            type="color"
            value={customColors.labelColor}
            onChange={e => setCustomColors(prev => ({ ...prev, labelColor: e.target.value }))}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
      <BasicCheckbox
        label="Custom Colored Checkbox"
        value="custom"
        selected={selectedItems}
        onChange={handleCheckboxChange}
        backgroundColor={customColors.backgroundColor}
        innerTickColor={customColors.innerTickColor}
        labelColor={customColors.labelColor}
      />

      {/* Demo 5: Select All Functionality */}
      <h3 style={{ marginTop: '2rem' }}>Demo 5: Select All Functionality</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <BasicCheckbox
          label="Select All Items"
          value="selectAll"
          selected={selectedItems}
          onChange={handleCheckboxChange}
          allItems={sampleItems}
          valueKey="id"
        />
        <div style={{ marginLeft: '2rem', borderLeft: '2px solid #eeeeee', paddingLeft: '1rem' }}>
          {sampleItems.map(item => (
            <BasicCheckbox
              key={item.id}
              label={item.name}
              value={item.id}
              selected={selectedItems}
              onChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>

      {/* Demo 6: Custom Icon and Label */}
      <h3 style={{ marginTop: '2rem' }}>Demo 6: Custom Icon and Label</h3>
      <BasicCheckbox
        value="custom"
        selected={selectedItems}
        onChange={handleCheckboxChange}
        icon={CustomIcon}
        labelSlot={CustomLabel}
      />

      {/* Demo 7: Multiple Checkboxes */}
      <h3 style={{ marginTop: '2rem' }}>Demo 7: Multiple Checkboxes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {['Option A', 'Option B', 'Option C', 'Option D'].map((option, index) => (
          <BasicCheckbox
            key={index}
            label={option}
            value={`option-${index}`}
            selected={selectedItems}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>

      {/* Demo 8: Current Selection Display */}
      <h3 style={{ marginTop: '2rem' }}>Demo 8: Current Selection</h3>
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      >
        <strong>Currently Selected:</strong>
        <div style={{ marginTop: '0.5rem' }}>
          {selectedItems.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {selectedItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <em>No items selected</em>
          )}
        </div>
      </div>

      {/* Demo 9: Different Value Types */}
      <h3 style={{ marginTop: '2rem' }}>Demo 9: Different Value Types</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <BasicCheckbox
          label="String Value"
          value="string-value"
          selected={selectedItems}
          onChange={handleCheckboxChange}
        />
        <BasicCheckbox label="Number Value" value={42} selected={selectedItems} onChange={handleCheckboxChange} />
        <BasicCheckbox label="Boolean Value" value={true} selected={selectedItems} onChange={handleCheckboxChange} />
      </div>
    </div>
  );
};

export default CheckboxDemo;
