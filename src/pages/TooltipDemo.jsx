import React from 'react';
import BasicTooltip from '@/components/sharedComponents/BasicTooltip.jsx';

const Box = ({ children }) => (
  <div style={{ display: 'inline-block', padding: '1rem', background: '#f3f4f6', borderRadius: '0.375rem' }}>{children}</div>
);

const TooltipDemo = () => {
  return (
    <div className="tooltip-demo">
      <h1>Basic Tooltip Component Demo</h1>

      <section className="demo-section">
        <h2>Hover Trigger (default)</h2>
        <div className="demo-group-row">
          <BasicTooltip content="Top tooltip" position="top">
            <Box>Hover Top</Box>
          </BasicTooltip>
          <BasicTooltip content="Bottom tooltip" position="bottom">
            <Box>Hover Bottom</Box>
          </BasicTooltip>
          <BasicTooltip content="Left tooltip" position="left">
            <Box>Hover Left</Box>
          </BasicTooltip>
          <BasicTooltip content="Right tooltip" position="right">
            <Box>Hover Right</Box>
          </BasicTooltip>
        </div>
      </section>

      <section className="demo-section">
        <h2>Corner Positions</h2>
        <div className="demo-group-row">
          <BasicTooltip content="Top Left" position="top-left">
            <Box>Top Left</Box>
          </BasicTooltip>
          <BasicTooltip content="Top Right" position="top-right">
            <Box>Top Right</Box>
          </BasicTooltip>
          <BasicTooltip content="Bottom Left" position="bottom-left">
            <Box>Bottom Left</Box>
          </BasicTooltip>
          <BasicTooltip content="Bottom Right" position="bottom-right">
            <Box>Bottom Right</Box>
          </BasicTooltip>
        </div>
      </section>

      <section className="demo-section">
        <h2>Click Trigger</h2>
        <div className="demo-group-row">
          <BasicTooltip content="Click to toggle" position="top" trigger="click">
            <Box>Click Me</Box>
          </BasicTooltip>
          <BasicTooltip content="Click outside to close" position="bottom" trigger="click">
            <Box>Click Outside</Box>
          </BasicTooltip>
        </div>
      </section>

      <section className="demo-section">
        <h2>Focus Trigger</h2>
        <div className="demo-group-column">
          <BasicTooltip content="Focus on input" position="top" trigger="focus">
            <input placeholder="Focus me" style={{ padding: '0.5rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }} />
          </BasicTooltip>
          <BasicTooltip content={<span><b>Formatted</b> content allowed</span>} position="right" trigger="focus">
            <button style={{ padding: '0.5rem 0.75rem' }}>Focusable Button</button>
          </BasicTooltip>
        </div>
      </section>

      <section className="demo-section">
        <h2>Variants and Arrow</h2>
        <div className="demo-group-row">
          <BasicTooltip content="Light variant" customClass="tooltip-light" position="top">
            <Box>Light</Box>
          </BasicTooltip>
          <BasicTooltip content="Success variant" customClass="tooltip-success" position="top">
            <Box>Success</Box>
          </BasicTooltip>
          <BasicTooltip content="Error variant" customClass="tooltip-error" position="top">
            <Box>Error</Box>
          </BasicTooltip>
          <BasicTooltip content="Warning variant" customClass="tooltip-warning" position="top">
            <Box>Warning</Box>
          </BasicTooltip>
          <BasicTooltip content="No arrow" showArrow={false} position="top">
            <Box>No Arrow</Box>
          </BasicTooltip>
        </div>
      </section>
    </div>
  );
};

export default TooltipDemo;


