import React, { useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

const BasicCheckbox = memo(
  ({
    size = 'md',
    disabled = false,
    readonly = false,
    label = '',
    value = '',
    selected = [],
    valueComparator = (a, b) => Array.isArray(a) && a.includes(b),
    innerTickColor = '#ffffff',
    backgroundColor = '#000000',
    labelColor = '#000000',
    allItems = [],
    valueKey = '',
    onChange,
    children,
    icon: IconSlot,
    labelSlot: LabelSlot,
  }) => {
    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const internalValue = useMemo(() => {
      console.log('selected', selected);
      return Array.isArray(selected) ? selected : [];
    }, [selected]);

    const isChecked = useMemo(() => {
      if (!internalValue?.length) return false;

      if (value === 'selectAll') {
        // Check if all items from allItems are present in internalValue
        if (internalValue?.length !== allItems?.length) return false;
        return allItems.every(item => {
          const itemValue = valueKey ? item[valueKey] : item;
          return internalValue.includes(itemValue);
        });
      }

      return valueComparator(internalValue, value);
    }, [internalValue, value, allItems, valueKey, valueComparator]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleClick = useCallback(
      event => {
        // Skip if disabled or readonly
        if (disabled || readonly) return;

        const isSelected = isChecked;
        const currentValues = Array.isArray(internalValue) ? internalValue : [];

        let newValue;
        if (value === 'selectAll') {
          // If selectAll is clicked and not all items are selected, select all
          // Otherwise, empty the array
          if (currentValues.length < allItems.length) {
            if (valueKey) {
              newValue = allItems.map(item => item[valueKey]);
            } else {
              newValue = [...allItems];
            }
          } else {
            newValue = [];
          }
        } else {
          // Normal checkbox behavior
          if (isSelected) {
            newValue = currentValues.filter(v => v !== value);
          } else {
            newValue = [...currentValues, value];
          }
        }

        // Emit events (React equivalent of Vue emits)
        onChange?.(newValue, value, event);
      },
      [disabled, readonly, isChecked, internalValue, value, allItems, valueKey, onChange]
    );

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['checkbox-container', size];
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      return classes.join(' ');
    }, [size, disabled, readonly]);

    const checkboxStyle = useMemo(
      () => ({
        borderColor: backgroundColor,
        '--background-checked-color': backgroundColor,
      }),
      [backgroundColor]
    );

    const innerTickStyle = useMemo(
      () => ({
        borderColor: innerTickColor,
      }),
      [innerTickColor]
    );

    const labelStyle = useMemo(
      () => ({
        color: labelColor,
      }),
      [labelColor]
    );

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderIcon = useMemo(() => {
      if (IconSlot) {
        return <IconSlot isChecked={isChecked} />;
      }

      return (
        <div className="checkbox" style={checkboxStyle}>
          <div className="inner-tick" style={innerTickStyle}></div>
        </div>
      );
    }, [IconSlot, isChecked, checkboxStyle, innerTickStyle]);

    const renderLabel = useMemo(() => {
      if (LabelSlot) {
        return <LabelSlot isChecked={isChecked} />;
      }

      return label;
    }, [LabelSlot, isChecked, label]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <label className={containerClass} style={labelStyle}>
        <input
          type="checkbox"
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleClick}
          style={{ display: 'none' }}
        />
        {renderIcon}
        {renderLabel}
        {children}
      </label>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicCheckbox.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  selected: PropTypes.array,
  valueComparator: PropTypes.func,
  innerTickColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  labelColor: PropTypes.string,
  allItems: PropTypes.array,
  valueKey: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  labelSlot: PropTypes.elementType,
};

BasicCheckbox.displayName = 'BasicCheckbox';

export default BasicCheckbox;
