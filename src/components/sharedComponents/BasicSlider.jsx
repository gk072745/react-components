import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BasicSlider = memo(
  ({
    size = 'md',
    disabled = false,
    readonly = false,
    step = 0.1,
    color = 'default',
    thumbColor = 'black',
    trackColor = 'grey',
    label = '',
    min = 0,
    max = 100,
    thumbLabel = false,
    thumbLabelClasses = [],
    labelClasses = [],
    value = 0,
    className = '',
    style = {},
    onChange,
    ...props
  }) => {
    // =============================================================================
    // REFS AND STATE
    // =============================================================================
    const trackRef = useRef(null);
    const [currentValue, setCurrentValue] = useState(() => value);
    const [isDragging, setIsDragging] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const roundToStep = useCallback((value, step) => {
      const stepStr = step.toString();
      const decimals = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
      const multiplier = Math.pow(10, decimals);
      return Math.round(value * multiplier) / multiplier;
    }, []);

    const fillPercent = useMemo(() => {
      const percent = ((currentValue - min) / (max - min)) * 100;
      return Math.min(100, Math.max(0, percent));
    }, [currentValue, min, max]);

    const displayValue = useMemo(() => {
      const stepStr = step.toString();
      const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
      return currentValue.toFixed(decimalPlaces);
    }, [currentValue, step]);

    const showThumbLabel = useMemo(() => {
      if (thumbLabel === 'always') return true;
      if (thumbLabel === true) return isDragging || isFocused;
      return false;
    }, [thumbLabel, isDragging, isFocused]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const stopDrag = useCallback(() => {
      setIsDragging(false);
    }, []);

    const updateValueFromPosition = useCallback((clientX) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      let percent = (clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));
      let rawValue = min + percent * (max - min);
      const steppedValue = roundToStep(Math.round(rawValue / step) * step, step);
      
      if (steppedValue !== currentValue) {
        setCurrentValue(steppedValue);
        onChange?.(steppedValue);
      }
    }, [min, max, step, roundToStep, currentValue, onChange]);

    const handleMouseMove = useCallback(
      e => updateValueFromPosition(e.clientX),
      [updateValueFromPosition]
    );

    const handleTouchMove = useCallback(
      e => updateValueFromPosition(e.touches[0].clientX),
      [updateValueFromPosition]
    );

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseUp = () => stopDrag();
      const handleTouchEnd = () => stopDrag();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }, [isDragging, handleMouseMove, handleTouchMove, stopDrag]);

    const startDrag = useCallback(
      (e) => {
        if (disabled || readonly) return;
        e.preventDefault();
        e.stopPropagation();

        // Update position immediately on start
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        updateValueFromPosition(clientX);

        // Set dragging state after position update
        setIsDragging(true);
      },
      [disabled, readonly, updateValueFromPosition]
    );

    const handleTrackClick = useCallback(
      e => {
        if (disabled || readonly) return;
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        updateValueFromPosition(clientX);
      },
      [disabled, readonly, updateValueFromPosition]
    );

    const onKeydown = useCallback(
      e => {
        if (disabled || readonly) return;

        let newValue = currentValue;

        if (e.key === 'ArrowRight') {
          newValue = Math.min(max, currentValue + step);
        } else if (e.key === 'ArrowLeft') {
          newValue = Math.max(min, currentValue - step);
        } else {
          return;
        }

        const steppedValue = roundToStep(newValue, step);
        if (steppedValue !== currentValue) {
          setCurrentValue(steppedValue);
          onChange?.(steppedValue);
        }

        e.preventDefault();
      },
      [disabled, readonly, min, max, step, roundToStep, currentValue, onChange]
    );

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['basic-slider-input-wrapper', size];
      
      // Add color class for new system
      if (color && color !== 'default') {
        classes.push(`color-${color}`);
      }
      
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (label) classes.push('has-label');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [size, color, disabled, readonly, label, className]);

    // Legacy style support for backward compatibility
    const trackStyle = useMemo(
      () => {
        const style = {};
        // Only apply legacy styles if using old color system
        if (color === 'black' || color === 'default') {
          style['--track-color'] = trackColor;
        }
        return style;
      },
      [trackColor, color]
    );

    const filledStyle = useMemo(
      () => {
        const style = {
          width: fillPercent + '%',
        };
        // Only apply legacy styles if using old color system
        if (color === 'black' || color === 'default') {
          style.backgroundColor = color === 'black' ? color : thumbColor;
        }
        return style;
      },
      [fillPercent, color, thumbColor]
    );

    const thumbStyle = useMemo(
      () => {
        const style = {
          left: fillPercent + '%',
        };
        // Only apply legacy styles if using old color system
        if (color === 'black' || color === 'default') {
          style.backgroundColor = thumbColor;
        }
        return style;
      },
      [fillPercent, thumbColor, color]
    );

    const labelStyle = useMemo(
      () => ({
        left: fillPercent + '%',
      }),
      [fillPercent]
    );

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderLabel = useMemo(() => {
      if (label) {
        return <label className={`slider-label ${labelClasses.join(' ')}`}>{label}</label>;
      }
      return null;
    }, [label, labelClasses]);

    const renderThumbLabel = useMemo(() => {
      if (!showThumbLabel) return null;

      return (
        <div className={`thumb-label ${thumbLabelClasses.join(' ')}`} style={labelStyle}>
          {currentValue === 0 || currentValue === 100 ? currentValue : displayValue}
        </div>
      );
    }, [showThumbLabel, thumbLabelClasses, labelStyle, currentValue, displayValue]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div className={containerClass} style={style} {...props}>
        {renderLabel}
        <div
          className={`slider-track ${isDragging ? 'dragging' : ''}`}
          ref={trackRef}
          tabIndex={disabled || readonly ? -1 : 0}
          onMouseDown={handleTrackClick}
          onTouchStart={handleTrackClick}
          onKeyDown={onKeydown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          aria-readonly={readonly}
          style={trackStyle}
        >
          <div className="slider-filled" style={filledStyle} />
          <div
            className={`slider-thumb ${isDragging ? 'dragging' : ''}`}
            style={thumbStyle}
            onMouseDown={e => startDrag(e)}
            onTouchStart={e => startDrag(e)}
          />
          {renderThumbLabel}
        </div>
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicSlider.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  step: PropTypes.number,
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  thumbColor: PropTypes.string,
  trackColor: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  thumbLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  thumbLabelClasses: PropTypes.array,
  labelClasses: PropTypes.array,
  value: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

BasicSlider.displayName = 'BasicSlider';

export default BasicSlider;
