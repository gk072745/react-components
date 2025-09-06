import React, { useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

const BasicChip = memo(
  ({
    chip,
    textKey = 'text',
    valueKey = 'value',
    closable = false,
    onDeleteChip,
    children,
    prepend,
    append,
    close,
    variant = 'default',
    variantType = 'solid',
    disabled = false,
    className = '',
    style = {},
    onClick,
  }) => {
    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const displayText = useMemo(() => {
      if (typeof chip === 'string') {
        return chip;
      }
      return chip[textKey] || '';
    }, [chip, textKey]);

    const chipValue = useMemo(() => {
      if (typeof chip === 'string') {
        return chip;
      }
      return chip[valueKey] || chip;
    }, [chip, valueKey]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleDelete = useCallback(
      event => {
        if (event && event.stopPropagation) {
          event.stopPropagation();
        }
        if (onDeleteChip && !disabled) {
          onDeleteChip(chipValue, event);
        }
      },
      [onDeleteChip, chipValue, disabled]
    );

    const handleClick = useCallback(
      event => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (onClick) onClick(event);
      },
      [disabled, onClick]
    );

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['basic-chip'];

      // Handle variant type and variant combination
      if (variantType === 'outlined') {
        classes.push(`outlined-${variant}`);
      } else if (variantType === 'filled') {
        classes.push(`filled-${variant}`);
      } else {
        classes.push(variant);
      }

      if (disabled) classes.push('disabled');
      if (className) classes.push(className);
      return classes.join(' ');
    }, [variant, variantType, disabled, className]);

    const chipStyle = useMemo(
      () => ({
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }),
      [style, disabled]
    );

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderPrepend = useMemo(() => {
      if (!prepend) return null;

      return (
        <div className="chip-prepend">
          {typeof prepend === 'function' ? prepend({ chip, isDisabled: disabled }) : prepend}
        </div>
      );
    }, [prepend, chip, disabled]);

    const renderContent = useMemo(() => {
      return (
        <div className="chip-content">
          {children
            ? typeof children === 'function'
              ? children({ chip, isDisabled: disabled })
              : children
            : displayText}
        </div>
      );
    }, [children, chip, disabled, displayText]);

    const renderAppend = useMemo(() => {
      if (!append) return null;

      return (
        <div className="chip-append">
          {typeof append === 'function' ? append({ chip, isDisabled: disabled }) : append}
        </div>
      );
    }, [append, chip, disabled]);

    const renderClose = useMemo(() => {
      if (close) {
        return typeof close === 'function'
          ? close({ chip, chipValue, isDisabled: disabled, onDelete: handleDelete })
          : close;
      }

      if (closable) {
        return (
          <button
            className="chip-close"
            onClick={handleDelete}
            aria-label="Remove chip"
            type="button"
            disabled={disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        );
      }

      return null;
    }, [close, closable, disabled, chip, chipValue, handleDelete]);

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div
        className={containerClass}
        style={chipStyle}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {renderPrepend}
        {renderContent}
        {renderAppend}
        {renderClose}
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicChip.propTypes = {
  chip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  textKey: PropTypes.string,
  valueKey: PropTypes.string,
  closable: PropTypes.bool,
  onDeleteChip: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  prepend: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  append: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  close: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info']),
  variantType: PropTypes.oneOf(['solid', 'outlined', 'filled']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

BasicChip.displayName = 'BasicChip';

export default BasicChip;
