import React, { useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

const BasicRadio = memo(
  ({
    size = 'sm',
    disabled = false,
    readonly = false,
    toggle = false,
    label = '',
    value,
    multiple = false,
    modelValue,
    selected,
    valueComparator,
    color = 'green',
    labelColor = '#000',
    className = '',
    style = {},
    onChange,
    onUpdateModelValue,
    children,
    ...props
  }) => {
    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const internalValue = useMemo(() => {
      let val = modelValue || selected;
      if (multiple) {
        val = modelValue?.length ? modelValue : selected;
      }
      return multiple ? (Array.isArray(val) ? val : []) : val || '';
    }, [modelValue, selected, multiple]);

    const isChecked = useMemo(() => {
      if (internalValue === '' && value === '') return false;
      return valueComparator
        ? valueComparator(internalValue, value, multiple)
        : multiple
          ? Array.isArray(internalValue) && internalValue.includes(value)
          : internalValue === value;
    }, [internalValue, value, multiple, valueComparator]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleClick = useCallback(
      event => {
        // Skip if disabled or readonly
        if (disabled || readonly) return;

        // Prevent default behavior and stop propagation to avoid double triggering
        event.preventDefault();
        event.stopPropagation();

        // Handle multiple selection mode
        if (multiple) {
          const isSelected = isChecked;
          const currentValues = Array.isArray(internalValue) ? internalValue : [];

          let newValue;
          if (isSelected) {
            // Only allow removing all options if toggle is true
            if (toggle || currentValues.length > 1) {
              newValue = currentValues.filter(v => v !== value);
            } else {
              // Keep the current value if it's the only one and toggle is false
              newValue = currentValues;
            }
          } else {
            newValue = [...currentValues, value];
          }

          if (onUpdateModelValue) onUpdateModelValue(newValue);
          if (onChange) onChange(newValue, value, event);
        }
        // Handle single selection mode
        else {
          const isSelected = isChecked;
          const newValue = toggle && isSelected ? '' : value;
          if (onUpdateModelValue) onUpdateModelValue(newValue);
          if (onChange) onChange(newValue, value, event);
        }
      },
      [disabled, readonly, multiple, isChecked, internalValue, toggle, value, onUpdateModelValue, onChange]
    );

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['radio-container', size];
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [size, disabled, readonly, className]);

    const containerStyle = useMemo(
      () => ({
        color: labelColor,
        ...style,
      }),
      [labelColor, style]
    );

    const radioStyle = useMemo(
      () => ({
        borderColor: color,
      }),
      [color]
    );

    const innerCircleStyle = useMemo(
      () => ({
        backgroundColor: color,
      }),
      [color]
    );

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderIcon = useMemo(() => {
      if (children && typeof children === 'function') {
        return children({ isChecked, disabled, readonly });
      }
      if (children) {
        return children;
      }

      return (
        <div className="radio" style={radioStyle}>
          <div className="inner-circle" style={innerCircleStyle}></div>
        </div>
      );
    }, [children, isChecked, disabled, readonly, radioStyle, innerCircleStyle]);

    const renderLabel = useMemo(() => {
      if (label) {
        return <span className="radio-label">{label}</span>;
      }
      return null;
    }, [label]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <label
        className={containerClass}
        style={containerStyle}
        onClick={handleClick}
        role="button"
        tabIndex={disabled || readonly ? -1 : 0}
        aria-disabled={disabled || readonly}
        {...props}
      >
        <input
          type="radio"
          value={value}
          checked={isChecked}
          disabled={disabled}
          readOnly={readonly}
          style={{ display: 'none' }}
          onChange={e => {
            // Prevent the native radio input from triggering additional events
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        {renderIcon}
        {renderLabel}
      </label>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicRadio.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  toggle: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  multiple: PropTypes.bool,
  modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
  valueComparator: PropTypes.func,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onUpdateModelValue: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

BasicRadio.displayName = 'BasicRadio';

export default BasicRadio;
