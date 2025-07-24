import React, { useState, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const BasicAccordion = memo(
  ({ prepend, title, append, children, initialIsOpen = false, onToggle, disabled = false }) => {
    // =============================================================================
    // STATE MANAGEMENT
    // =============================================================================
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleToggle = useCallback(() => {
      if (disabled) return;

      setIsOpen(prevIsOpen => {
        const newIsOpen = !prevIsOpen;
        onToggle?.(newIsOpen);
        return newIsOpen;
      });
    }, [onToggle, disabled]);

    const handleKeyDown = useCallback(
      e => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      },
      [handleToggle, disabled]
    );

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const accordionContentClass = useMemo(() => `accordion-content-slot ${isOpen ? 'open' : ''}`, [isOpen]);

    const accordionHeaderClass = useMemo(() => 'accordion-header', []);

    const accordionContainerClass = useMemo(() => `basic-accordion ${disabled ? 'disabled' : ''}`, [disabled]);

    const defaultAppendIconClass = useMemo(() => `default-append-icon ${isOpen ? 'rotated' : ''}`, [isOpen]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderPrepend = useMemo(
      () => (prepend ? prepend({ isOpen, handleToggle, disabled }) : null),
      [prepend, isOpen, handleToggle, disabled]
    );

    const renderAppend = useMemo(() => {
      if (append) {
        return append({ isOpen, handleToggle, disabled });
      }

      return (
        <div className={defaultAppendIconClass}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" fill="currentColor" />
          </svg>
        </div>
      );
    }, [append, isOpen, handleToggle, disabled, defaultAppendIconClass]);

    // =============================================================================
    // ACCESSIBILITY ATTRIBUTES
    // =============================================================================
    const accessibilityProps = useMemo(
      () => ({
        role: 'button',
        tabIndex: disabled ? -1 : 0,
        'aria-expanded': isOpen,
        'aria-disabled': disabled,
      }),
      [disabled, isOpen]
    );

    // =============================================================================
    // RENDER
    // =============================================================================
    return (
      <div className={accordionContainerClass}>
        <div className={accordionHeaderClass} onClick={handleToggle} onKeyDown={handleKeyDown} {...accessibilityProps}>
          {renderPrepend}
          <div className="accordion-title">{title || 'Accordion Title'}</div>
          <div className="append-slot">{renderAppend}</div>
        </div>

        <div className={accordionContentClass}>{children}</div>
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicAccordion.propTypes = {
  prepend: PropTypes.func,
  title: PropTypes.string,
  append: PropTypes.func,
  children: PropTypes.node,
  initialIsOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
};

BasicAccordion.displayName = 'BasicAccordion';

export default BasicAccordion;
