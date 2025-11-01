import React, { useMemo, useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BasicSwitch = memo(
  ({
    value,
    variant = 'default',
    disabled = false,
    readonly = false,
    size = 'xl',
    label = '',
    labelPosition = 'right',
    inset = false,
    dotLabels = null,
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
      const classes = ['switch-container', size, variant];

      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (internalValue) classes.push('checked');
      if (inset) classes.push('inset');
      if (className) classes.push(className);

      return classes.join(' ');
    }, [size, variant, disabled, readonly, internalValue, inset, className]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderLabel = useCallback(
      position => {
        if (!label || labelPosition !== position) return null;

        return <span className={`${position}-label`}>{label}</span>;
      },
      [label, labelPosition]
    );

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <label className={containerClass} {...props}>
        {renderLabel('left')}

        <input
          type="checkbox"
          checked={internalValue}
          hidden
          readOnly={readonly}
          disabled={disabled}
          onChange={handleSwitchChange}
        />

        <span className="switch-slider" style={style}>
          {currentDotLabel}
          <span className="switch-slider-dot" />
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
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  inset: PropTypes.bool,
  dotLabels: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

BasicSwitch.displayName = 'BasicSwitch';

export default BasicSwitch;
