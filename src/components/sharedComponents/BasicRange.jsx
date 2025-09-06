import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect } from 'use-deep-compare';

const BasicRange = memo(
  ({
    size = 'md',
    disabled = false,
    readonly = false,
    step = 0.1,
    color = 'black',
    thumbColor = 'black',
    trackColor = 'grey',
    label = '',
    min = 0,
    max = 100,
    thumbLabel = false,
    thumbLabelClasses = [],
    labelClasses = [],
    value = [0, 0],
    className = '',
    style = {},
    onChange,
    ...props
  }) => {
    // =============================================================================
    // REFS AND STATE
    // =============================================================================
    const trackRef = useRef(null);
    const [currentValues, setCurrentValues] = useState(() => value);
    const [isDragging, setIsDragging] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [activeThumb, setActiveThumb] = useState(null); // 'min' or 'max'

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
      const minPercent = ((currentValues[0] - min) / (max - min)) * 100;
      const maxPercent = ((currentValues[1] - min) / (max - min)) * 100;
      return {
        min: Math.min(100, Math.max(0, minPercent)),
        max: Math.min(100, Math.max(0, maxPercent)),
      };
    }, [currentValues, min, max]);

    const displayValues = useMemo(() => {
      const stepStr = step.toString();
      const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
      return currentValues.map(value => value.toFixed(decimalPlaces));
    }, [currentValues, step]);

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
      setActiveThumb(null);
    }, []);

    // Memoized drag handlers to prevent recreation on every render
    const handleMouseMove = useCallback(
      e => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        let rawValue = min + percent * (max - min);
        const steppedValue = roundToStep(Math.round(rawValue / step) * step, step);

        setCurrentValues(prevValues => {
          const newValues = [...prevValues];

          if (activeThumb === 'min') {
            if (steppedValue > prevValues[1]) return prevValues;
            if (steppedValue === prevValues[0]) return prevValues;
            newValues[0] = steppedValue;
          } else {
            if (steppedValue < prevValues[0]) return prevValues;
            if (steppedValue === prevValues[1]) return prevValues;
            newValues[1] = steppedValue;
          }

          return newValues;
        });
      },
      [min, max, step, roundToStep, activeThumb]
    );

    const handleTouchMove = useCallback(
      e => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        let percent = (e.touches[0].clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        let rawValue = min + percent * (max - min);
        const steppedValue = roundToStep(Math.round(rawValue / step) * step, step);

        setCurrentValues(prevValues => {
          const newValues = [...prevValues];

          if (activeThumb === 'min') {
            if (steppedValue > prevValues[1]) return prevValues;
            if (steppedValue === prevValues[0]) return prevValues;
            newValues[0] = steppedValue;
          } else {
            if (steppedValue < prevValues[0]) return prevValues;
            if (steppedValue === prevValues[1]) return prevValues;
            newValues[1] = steppedValue;
          }

          return newValues;
        });
      },
      [min, max, step, roundToStep, activeThumb]
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
      (e, thumb) => {
        if (disabled || readonly) return;
        e.preventDefault();
        e.stopPropagation();

        // Update position immediately on start first
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        let rawValue = min + percent * (max - min);
        const steppedValue = roundToStep(Math.round(rawValue / step) * step, step);

        setCurrentValues(prevValues => {
          const newValues = [...prevValues];

          if (thumb === 'min') {
            if (steppedValue > prevValues[1]) return prevValues;
            if (steppedValue === prevValues[0]) return prevValues;
            newValues[0] = steppedValue;
          } else {
            if (steppedValue < prevValues[0]) return prevValues;
            if (steppedValue === prevValues[1]) return prevValues;
            newValues[1] = steppedValue;
          }

          return newValues;
        });

        // Set dragging state after position update
        setIsDragging(true);
        setActiveThumb(thumb);
      },
      [disabled, readonly, min, max, step, roundToStep]
    );

    const handleTrackClick = useCallback(
      e => {
        if (disabled || readonly) return;

        const rect = trackRef.current.getBoundingClientRect();
        const clickX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const percent = (clickX - rect.left) / rect.width;
        const clickedValue = min + percent * (max - min);
        const steppedValue = roundToStep(Math.round(clickedValue / step) * step, step);

        setCurrentValues(prevValues => {
          const newValues = [...prevValues];
          const midpoint = (prevValues[0] + prevValues[1]) / 2;

          if (steppedValue <= midpoint) {
            if (steppedValue !== prevValues[0]) {
              newValues[0] = steppedValue;
            }
          } else {
            if (steppedValue !== prevValues[1]) {
              newValues[1] = steppedValue;
            }
          }

          return newValues;
        });
      },
      [disabled, readonly, min, max, step, roundToStep]
    );

    const onKeydown = useCallback(
      e => {
        if (disabled || readonly) return;

        const isMinThumb = document.activeElement === trackRef.current;
        const isMaxThumb = document.activeElement === trackRef.current;

        if (!isMinThumb && !isMaxThumb) return;

        const thumb = isMinThumb ? 'min' : 'max';
        const index = thumb === 'min' ? 0 : 1;

        setCurrentValues(prevValues => {
          let newValue = prevValues[index];

          if (e.key === 'ArrowRight') {
            newValue = Math.min(max, prevValues[index] + step);
          } else if (e.key === 'ArrowLeft') {
            newValue = Math.max(min, prevValues[index] - step);
          } else {
            return prevValues;
          }

          if (thumb === 'min' && newValue > prevValues[1]) return prevValues;
          if (thumb === 'max' && newValue < prevValues[0]) return prevValues;

          const steppedValue = roundToStep(newValue, step);
          if (steppedValue !== prevValues[index]) {
            const newValues = [...prevValues];
            newValues[index] = steppedValue;
            return newValues;
          }

          return prevValues;
        });

        e.preventDefault();
      },
      [disabled, readonly, min, max, step, roundToStep]
    );

    // =============================================================================
    // EFFECTS FOR EMITTING CHANGES
    // =============================================================================

    useDeepCompareEffect(() => {
      onChange?.(currentValues);
    }, [currentValues]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleTouchStart = useCallback(
      e => {
        e.preventDefault();
        handleTrackClick(e);
      },
      [handleTrackClick]
    );

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['basic-range-input-wrapper', size];
      if (disabled) classes.push('disabled');
      if (readonly) classes.push('readonly');
      if (label) classes.push('has-label');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [size, disabled, readonly, label, className]);

    const trackStyle = useMemo(
      () => ({
        '--track-color': trackColor,
      }),
      [trackColor]
    );

    const filledStyle = useMemo(
      () => ({
        left: fillPercent.min + '%',
        width: fillPercent.max - fillPercent.min + '%',
        backgroundColor: color,
      }),
      [fillPercent, color]
    );

    const minThumbStyle = useMemo(
      () => ({
        left: fillPercent.min + '%',
        backgroundColor: thumbColor,
      }),
      [fillPercent.min, thumbColor]
    );

    const maxThumbStyle = useMemo(
      () => ({
        left: fillPercent.max + '%',
        backgroundColor: thumbColor,
      }),
      [fillPercent.max, thumbColor]
    );

    const minLabelStyle = useMemo(
      () => ({
        left: fillPercent.min + '%',
      }),
      [fillPercent.min]
    );

    const maxLabelStyle = useMemo(
      () => ({
        left: fillPercent.max + '%',
      }),
      [fillPercent.max]
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

    const renderThumbLabels = useMemo(() => {
      if (!showThumbLabel) return null;

      return (
        <>
          <div className={`thumb-label min-label ${thumbLabelClasses.join(' ')}`} style={minLabelStyle}>
            {displayValues[0]}
          </div>
          <div className={`thumb-label max-label ${thumbLabelClasses.join(' ')}`} style={maxLabelStyle}>
            {displayValues[1]}
          </div>
        </>
      );
    }, [showThumbLabel, thumbLabelClasses, minLabelStyle, maxLabelStyle, displayValues]);

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
          onTouchStart={handleTouchStart}
          onKeyDown={onKeydown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValues[0]}
          aria-disabled={disabled}
          aria-readonly={readonly}
          style={trackStyle}
        >
          <div className="slider-filled" style={filledStyle} />
          <div
            className={`slider-thumb min-thumb ${isDragging ? 'dragging' : ''}`}
            style={minThumbStyle}
            onMouseDown={e => startDrag(e, 'min')}
            onTouchStart={e => startDrag(e, 'min')}
          />
          <div
            className={`slider-thumb max-thumb ${isDragging ? 'dragging' : ''}`}
            style={maxThumbStyle}
            onMouseDown={e => startDrag(e, 'max')}
            onTouchStart={e => startDrag(e, 'max')}
          />
          {renderThumbLabels}
        </div>
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicRange.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  step: PropTypes.number,
  color: PropTypes.string,
  thumbColor: PropTypes.string,
  trackColor: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  thumbLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  thumbLabelClasses: PropTypes.array,
  labelClasses: PropTypes.array,
  value: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

BasicRange.displayName = 'BasicRange';

export default BasicRange;
