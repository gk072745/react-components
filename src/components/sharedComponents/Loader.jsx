import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const Loader = memo(
  ({
    size = 40,
    width = 4,
    variant = 'default',
    isLocalLoader = true,
    src = '',
    className = '',
    style = {},
    children,
    ...props
  }) => {
    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerStyle = useMemo(
      () => ({
        ...style,
      }),
      [style]
    );

    const imageStyle = useMemo(
      () => ({
        width: `${size}px`,
        height: `${size}px`,
      }),
      [size]
    );

    const svgStyle = useMemo(
      () => ({
        width: size,
        height: size,
      }),
      [size]
    );

    const containerClass = useMemo(() => {
      const classes = ['loader-wrapper', variant];
      if (isLocalLoader) classes.push('local-loader');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [variant, isLocalLoader, className]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div className={containerClass} style={containerStyle} {...props}>
        {children || (
          <>
            {src ? (
              <img
                src={src}
                alt="loader"
                className="custom-loader-img"
                style={imageStyle}
              />
            ) : (
              <svg
                className="indeterminate-loader"
                style={svgStyle}
                viewBox="25 25 50 50"
              >
                <circle
                  className="track"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  strokeWidth={width}
                />
                <circle
                  className="arc"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  strokeWidth={width}
                  strokeLinecap="round"
                />
              </svg>
            )}
          </>
        )}
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
Loader.propTypes = {
  size: PropTypes.number,
  width: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  isLocalLoader: PropTypes.bool,
  src: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

Loader.defaultProps = {
  size: 40,
  width: 4,
  variant: 'default',
  isLocalLoader: true,
  src: '',
  className: '',
  style: {},
  children: null,
};

Loader.displayName = 'Loader';

export default Loader;
