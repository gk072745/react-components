import React, { useMemo, useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BasicSwitch = memo(
  ({
    value,
    disabled = false,
    readonly = false,
    bgColor = '#e0e0e0',
    activeBgColor = '#2196f3',
    sliderColor,
    activeSliderColor,
    size = 'xl',
    label = '',
    labelPosition = 'right',
    inset = false,
    dotLabels = null,
    dotLabelColors = { true: '#000', false: '#000' },
    className = '',
    style = {},
    onChange,
    ...props
  }) => {
    // =============================================================================
    // STATE
    // =============================================================================
    const [internalValue, setInternalValue] = useState(() => value ?? false);

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const computedSliderColor = useMemo(() => {
      if (sliderColor) return sliderColor;
      return inset ? '#e0e0e0' : '#ffffff';
    }, [sliderColor, inset]);

    const computedActiveSliderColor = useMemo(() => {
      if (activeSliderColor) return activeSliderColor;
      return inset ? '#e0e0e0' : '#ffffff';
    }, [activeSliderColor, inset]);

    const currentDotLabelColor = useMemo(() => {
      return dotLabelColors?.[internalValue] || '#000';
    }, [dotLabelColors, internalValue]);

    const currentDotLabel = useMemo(() => {
      return dotLabels?.[internalValue] || '';
    }, [dotLabels, internalValue]);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleSwitchChange = useCallback(() => {
      if (readonly || disabled) return;
      
      const newValue = !internalValue;
      setInternalValue(newValue);
      
      onChange?.(newValue);
    }, [readonly, disabled, internalValue, onChange]);

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['switch-container', size];
      
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (internalValue) classes.push('checked');
      if (inset) classes.push('inset');
      if (className) classes.push(className);
      
      return classes.join(' ');
    }, [size, disabled, readonly, internalValue, inset, className]);

    const sliderStyle = useMemo(() => ({
      '--bg-color': bgColor,
      '--active-bg-color': activeBgColor,
      color: currentDotLabelColor,
      ...style,
    }), [bgColor, activeBgColor, currentDotLabelColor, style]);

    const dotStyle = useMemo(() => ({
      '--slider-color': computedSliderColor,
      '--active-slider-color': computedActiveSliderColor,
    }), [computedSliderColor, computedActiveSliderColor]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderLabel = useCallback((position) => {
      if (!label || labelPosition !== position) return null;
      
      return (
        <span className={`${position}-label`}>
          {label}
        </span>
      );
    }, [label, labelPosition]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <label
        className={containerClass}
        {...props}
      >
        {renderLabel('left')}
        
        <input
          type="checkbox"
          checked={internalValue}
          hidden
          readOnly={readonly}
          disabled={disabled}
          onChange={handleSwitchChange}
        />
        
        <span className="switch-slider" style={sliderStyle}>
          {currentDotLabel}
          <span className="switch-slider-dot" style={dotStyle} />
        </span>
        
        {renderLabel('right')}
      </label>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicSwitch.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  bgColor: PropTypes.string,
  activeBgColor: PropTypes.string,
  sliderColor: PropTypes.string,
  activeSliderColor: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  inset: PropTypes.bool,
  dotLabels: PropTypes.object,
  dotLabelColors: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

BasicSwitch.displayName = 'BasicSwitch';

export default BasicSwitch;
