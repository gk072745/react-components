import BasicAccordion from '../components/sharedComponents/BasicAccordion';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AccordionDemo = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  // Demo 1: Simple status indicator
  const statusPrepend = ({ isOpen }) => {
    return (
      <div
        style={{
          color: isOpen ? 'green' : 'red',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? '✓' : '✗'}
      </div>
    );
  };

  // Demo 2: Custom toggle button
  const togglePrepend = ({ isOpen, handleToggle }) => {
    return (
      <button
        onClick={e => {
          e.stopPropagation();
          handleToggle();
        }}
        style={{
          padding: '4px 8px',
          backgroundColor: isOpen ? '#4CAF50' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    );
  };

  // Demo 3: Animated icon
  const animatedPrepend = ({ isOpen }) => {
    return (
      <div
        style={{
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          fontSize: '16px',
        }}
      >
        ▶
      </div>
    );
  };

  // Demo 4: Counter prepend
  const counterPrepend = ({ isOpen }) => {
    return (
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isOpen ? '#2196F3' : '#cccccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? '1' : '0'}
      </div>
    );
  };

  // Demo 5: Status append
  const statusAppend = ({ isOpen }) => {
    return (
      <div
        style={{
          color: isOpen ? '#2196F3' : '#666666',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? 'ACTIVE' : 'INACTIVE'}
      </div>
    );
  };

  // Demo 6: Complex prepend with multiple elements
  const complexPrepend = ({ isOpen, handleToggle }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: isOpen ? 'green' : 'orange' }}>{isOpen ? '●' : '○'}</span>
        <button
          onClick={e => {
            e.stopPropagation();
            handleToggle();
          }}
          style={{
            padding: '2px 6px',
            fontSize: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #cccccc',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Toggle
        </button>
      </div>
    );
  };

  // Demo 7: Badge append
  const badgeAppend = ({ isOpen }) => {
    return (
      <div
        style={{
          padding: '4px 8px',
          backgroundColor: isOpen ? '#4CAF50' : '#f44336',
          color: 'white',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? 'OPEN' : 'CLOSED'}
      </div>
    );
  };

  // Demo 8: Disabled state prepend
  const disabledPrepend = ({ isOpen, disabled }) => {
    return (
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: disabled ? '#cccccc' : isOpen ? '#4CAF50' : '#f44336',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {disabled ? '🚫' : isOpen ? '✓' : '✗'}
      </div>
    );
  };

  // Demo 9: Disabled state append
  const disabledAppend = ({ isOpen, disabled }) => {
    return (
      <div
        style={{
          padding: '4px 8px',
          backgroundColor: disabled ? '#cccccc' : isOpen ? '#4CAF50' : '#f44336',
          color: 'white',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: 'bold',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {disabled ? 'DISABLED' : isOpen ? 'OPEN' : 'CLOSED'}
      </div>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>BasicAccordion Demos</h1>

      {/* Demo 1: Status Indicator */}
      <h3 style={{ marginTop: '2rem' }}>Demo 1: Status Indicator</h3>
      <BasicAccordion title="Status Indicator Example" prepend={statusPrepend}>
        <div>
          <p>This accordion shows a status indicator that changes based on open/closed state.</p>
        </div>
      </BasicAccordion>

      {/* Demo 2: Custom Toggle Button */}
      <h3 style={{ marginTop: '2rem' }}>Demo 2: Custom Toggle Button</h3>
      <BasicAccordion title="Custom Toggle Example" prepend={togglePrepend}>
        <div>
          <p>This example has a custom toggle button in the prepend slot.</p>
        </div>
      </BasicAccordion>

      {/* Demo 3: Animated Icon */}
      <h3 style={{ marginTop: '2rem' }}>Demo 3: Animated Icon</h3>
      <BasicAccordion title="Animated Icon Example" prepend={animatedPrepend}>
        <div>
          <p>This accordion has an animated arrow icon that rotates when opened.</p>
        </div>
      </BasicAccordion>

      {/* Demo 4: Counter with Status Append */}
      <h3 style={{ marginTop: '2rem' }}>Demo 4: Counter with Status</h3>
      <BasicAccordion title="Counter Example" prepend={counterPrepend} append={statusAppend}>
        <div>
          <p>This example shows a counter in prepend and status text in append.</p>
        </div>
      </BasicAccordion>

      {/* Demo 5: Complex Prepend */}
      <h3 style={{ marginTop: '2rem' }}>Demo 5: Complex Prepend</h3>
      <BasicAccordion title="Complex Prepend Example" prepend={complexPrepend}>
        <div>
          <p>This example has multiple elements in the prepend slot.</p>
        </div>
      </BasicAccordion>

      {/* Demo 6: Badge Append Only */}
      <h3 style={{ marginTop: '2rem' }}>Demo 6: Badge Append Only</h3>
      <BasicAccordion title="Badge Append Example" append={badgeAppend}>
        <div>
          <p>This example only customizes the append slot with a badge.</p>
        </div>
      </BasicAccordion>

      {/* Demo 7: No Custom Functions */}
      <h3 style={{ marginTop: '2rem' }}>Demo 7: Default Behavior</h3>
      <BasicAccordion title="Default Accordion">
        <div>
          <p>This accordion uses the default prepend and append behavior.</p>
        </div>
      </BasicAccordion>

      {/* Demo 8: Static Disabled State */}
      <h3 style={{ marginTop: '2rem' }}>Demo 8: Static Disabled State</h3>
      <BasicAccordion
        title="Disabled Accordion (Static)"
        disabled={true}
        prepend={disabledPrepend}
        append={disabledAppend}
      >
        <div>
          <p>This accordion is permanently disabled and shows disabled state styling.</p>
        </div>
      </BasicAccordion>

      {/* Demo 9: Conditional Disabled State */}
      <h3 style={{ marginTop: '2rem' }}>Demo 9: Conditional Disabled State</h3>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setIsDisabled(!isDisabled)}
          style={{
            padding: '8px 16px',
            backgroundColor: isDisabled ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          {isDisabled ? 'Enable' : 'Disable'} Accordion
        </button>
        <p style={{ fontSize: '14px', color: '#666666' }}>
          Current state: <strong>{isDisabled ? 'Disabled' : 'Enabled'}</strong>
        </p>
      </div>
      <BasicAccordion
        title="Conditional Disabled Accordion"
        disabled={isDisabled}
        prepend={disabledPrepend}
        append={disabledAppend}
      >
        <div>
          <p>This accordion can be toggled between enabled and disabled states using the button above.</p>
          <p>When disabled, it shows visual feedback and prevents interactions.</p>
        </div>
      </BasicAccordion>

      {/* Demo 10: Disabled with Default Styling */}
      <h3 style={{ marginTop: '2rem' }}>Demo 10: Disabled with Default Styling</h3>
      <BasicAccordion title="Disabled Default Accordion" disabled={true}>
        <div>
          <p>This accordion is disabled but uses the default prepend and append styling.</p>
          <p>Notice how the default arrow icon also shows disabled state.</p>
        </div>
      </BasicAccordion>
    </div>
  );
};

AccordionDemo.propTypes = {};

export default AccordionDemo;
