import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const LinearProgress = memo(
  ({
    absolute = false,
    bgColor = '#e0e0e0',
    color = '#000',
    height = 4,
    indeterminate = false,
    modelValue = 0,
    max = 100,
    rounded = false,
    className = '',
    style = {},
    ...props
  }) => {
    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const percentage = useMemo(() => {
      return Math.min(100, Math.max(0, (modelValue / max) * 100));
    }, [modelValue, max]);

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerStyle = useMemo(
      () => ({
        height: `${height}px`,
        backgroundColor: bgColor,
        ...style,
      }),
      [height, bgColor, style]
    );

    const progressBarStyle = useMemo(
      () => ({
        width: indeterminate ? '40%' : `${percentage}%`,
        backgroundColor: color,
      }),
      [indeterminate, percentage, color]
    );

    const containerClass = useMemo(() => {
      const classes = ['linear-progress-container'];
      if (absolute) classes.push('absolute');
      if (rounded) classes.push('rounded');
      if (indeterminate) classes.push('indeterminate');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [absolute, rounded, indeterminate, className]);

    const progressBarClass = useMemo(() => {
      const classes = ['linear-progress-bar'];
      if (indeterminate) classes.push('indeterminate-bar');
      return classes.join(' ');
    }, [indeterminate]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div className={containerClass} style={containerStyle} {...props}>
        <div className={progressBarClass} style={progressBarStyle} />
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
LinearProgress.propTypes = {
  absolute: PropTypes.bool,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  indeterminate: PropTypes.bool,
  modelValue: PropTypes.number,
  max: PropTypes.number,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

LinearProgress.defaultProps = {
  absolute: false,
  bgColor: '#e0e0e0',
  color: '#000',
  height: 4,
  indeterminate: false,
  modelValue: 0,
  max: 100,
  rounded: false,
  className: '',
  style: {},
};

LinearProgress.displayName = 'LinearProgress';

export default LinearProgress;
