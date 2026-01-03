import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BasicMenu from './BasicMenu';

const BasicTimePicker = memo(
  forwardRef(function BasicTimePicker(
    {
      modelValue = '',
      label = '',
      placeholder = 'Select time',
      disabled = false,
      use12HourFormat: propUse12HourFormat = true,
      minuteStep = 1,
      className = '',
      onModelValueChange,
      onChange,
    },
    ref,
  ) {
    // =============================================================================
    // REFS
    // =============================================================================
    const menuRef = useRef(null);
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [use12HourFormat, setUse12HourFormat] = useState(propUse12HourFormat);

    // =============================================================================
    // STATE
    // =============================================================================
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('AM');

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const displayValue = useMemo(() => {
      if (!modelValue) return placeholder;

      try {
        const [hours, minutes] = modelValue.split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);

        if (use12HourFormat) {
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        } else {
          return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
      } catch (e) {
        return modelValue;
      }
    }, [modelValue, placeholder, use12HourFormat]);

    const availableHours = useMemo(() => {
      if (use12HourFormat) {
        return Array.from({ length: 12 }, (_, i) => ({
          value: i === 0 ? 12 : i,
          display: (i === 0 ? 12 : i).toString(),
        }));
      } else {
        return Array.from({ length: 24 }, (_, i) => ({
          value: i,
          display: i.toString().padStart(2, '0'),
        }));
      }
    }, [use12HourFormat]);

    const availableMinutes = useMemo(() => {
      return Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => i * minuteStep);
    }, [minuteStep]);

    // =============================================================================
    // METHODS
    // =============================================================================
    const parseTimeValue = useCallback(
      (timeString) => {
        if (!timeString) return;

        try {
          const [hours, minutes] = timeString.split(':');
          const hour = parseInt(hours, 10);
          const minute = parseInt(minutes, 10);

          if (use12HourFormat) {
            setSelectedPeriod(hour >= 12 ? 'PM' : 'AM');
            setSelectedHour(hour === 0 ? 12 : hour > 12 ? hour - 12 : hour);
          } else {
            setSelectedHour(hour);
          }

          setSelectedMinute(minute);
        } catch (e) {
          console.error('Error parsing time:', e);
        }
      },
      [use12HourFormat],
    );

    const formatTimeValue = useCallback(() => {
      let hour = selectedHour;

      if (use12HourFormat) {
        if (selectedPeriod === 'PM' && hour !== 12) {
          hour += 12;
        } else if (selectedPeriod === 'AM' && hour === 12) {
          hour = 0;
        }
      }

      return `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    }, [selectedHour, selectedMinute, selectedPeriod, use12HourFormat]);

    const emitValue = useCallback(() => {
      const timeValue = formatTimeValue();
      onModelValueChange?.(timeValue);
      onChange?.(timeValue);
    }, [formatTimeValue, onModelValueChange, onChange]);

    const selectHour = useCallback(
      (hour) => {
        setSelectedHour(hour);
        emitValue();
      },
      [emitValue],
    );

    const selectMinute = useCallback(
      (minute) => {
        setSelectedMinute(minute);
        emitValue();
      },
      [emitValue],
    );

    const selectPeriod = useCallback(
      (period) => {
        setSelectedPeriod(period);
        emitValue();
      },
      [emitValue],
    );

    const selectNow = useCallback(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      if (use12HourFormat) {
        setSelectedPeriod(hour >= 12 ? 'PM' : 'AM');
        setSelectedHour(hour === 0 ? 12 : hour > 12 ? hour - 12 : hour);
      } else {
        setSelectedHour(hour);
      }

      setSelectedMinute(Math.floor(minute / minuteStep) * minuteStep);
      emitValue();
      menuRef.current?.closeMenu();
    }, [use12HourFormat, minuteStep, emitValue]);

    const clearTime = useCallback(() => {
      onModelValueChange?.('');
      onChange?.('');
      menuRef.current?.closeMenu();
    }, [onModelValueChange, onChange]);

    const toggleFormat = useCallback(() => {
      setUse12HourFormat((prev) => {
        const newFormat = !prev;
        if (modelValue) {
          // Re-parse the time with new format
          setTimeout(() => {
            parseTimeValue(modelValue);
          }, 0);
        }
        return newFormat;
      });
    }, [modelValue, parseTimeValue]);

    const handleMenuOpen = useCallback(() => {
      setIsMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
      setIsMenuOpen(false);
    }, []);

    // =============================================================================
    // WATCH FOR MODEL VALUE CHANGES
    // =============================================================================
    useEffect(() => {
      if (modelValue) {
        parseTimeValue(modelValue);
      }
    }, [modelValue, parseTimeValue]);

    useEffect(() => {
      setUse12HourFormat(propUse12HourFormat);
      if (modelValue) {
        parseTimeValue(modelValue);
      }
    }, [propUse12HourFormat, modelValue, parseTimeValue]);

    // =============================================================================
    // SCROLL TO SELECTED ITEMS
    // =============================================================================
    useEffect(() => {
      if (isMenuOpen && hoursRef.current) {
        const selectedElement = hoursRef.current.querySelector(`.time-item.selected`);
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }, [isMenuOpen, selectedHour, use12HourFormat]);

    useEffect(() => {
      if (isMenuOpen && minutesRef.current) {
        const selectedElement = minutesRef.current.querySelector(`.time-item.selected`);
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }, [isMenuOpen, selectedMinute]);

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================
    useImperativeHandle(ref, () => ({
      focus: () => {
        // Focus the trigger element
        const trigger = document.querySelector('.time-input');
        if (trigger) {
          trigger.focus();
        }
      },
      blur: () => {
        menuRef.current?.closeMenu();
      },
      openMenu: () => menuRef.current?.openMenu(),
      closeMenu: () => menuRef.current?.closeMenu(),
    }));

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderTrigger = useCallback(() => {
      return (
        <div
          className={`time-input ${disabled ? 'disabled' : ''} ${isMenuOpen ? 'focused' : ''}`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              menuRef.current?.openMenu();
            }
          }}
        >
          <span className="time-value">{displayValue}</span>
          <span className="time-icon">🕐</span>
        </div>
      );
    }, [disabled, isMenuOpen, displayValue]);

    const renderContent = useCallback(() => {
      return (
        <div className="time-picker-content">
          {/* 12/24 Hour Toggle */}
          <div className="format-toggle">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFormat();
              }}
              className={`format-btn ${use12HourFormat ? 'active' : ''}`}
            >
              {use12HourFormat ? '12H' : '24H'}
            </button>
          </div>

          {/* Time Selectors */}
          <div className="time-selectors">
            {/* Hours */}
            <div className="time-column">
              <div className="column-header">Hours</div>
              <div className="time-list" ref={hoursRef}>
                {availableHours.map((hour) => (
                  <div
                    key={hour.value}
                    className={`time-item ${hour.value === selectedHour ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectHour(hour.value);
                    }}
                  >
                    {hour.display}
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="time-column">
              <div className="column-header">Minutes</div>
              <div className="time-list" ref={minutesRef}>
                {availableMinutes.map((minute) => (
                  <div
                    key={minute}
                    className={`time-item ${minute === selectedMinute ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectMinute(minute);
                    }}
                  >
                    {minute.toString().padStart(2, '0')}
                  </div>
                ))}
              </div>
            </div>

            {/* AM/PM for 12-hour format */}
            {use12HourFormat && (
              <div className="time-column">
                <div className="column-header">Period</div>
                <div className="time-list">
                  <div
                    className={`time-item ${selectedPeriod === 'AM' ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPeriod('AM');
                    }}
                  >
                    AM
                  </div>
                  <div
                    className={`time-item ${selectedPeriod === 'PM' ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPeriod('PM');
                    }}
                  >
                    PM
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectNow();
              }}
              className="quick-btn"
            >
              Now
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearTime();
              }}
              className="quick-btn"
            >
              Clear
            </button>
          </div>
        </div>
      );
    }, [
      use12HourFormat,
      toggleFormat,
      availableHours,
      selectedHour,
      selectHour,
      availableMinutes,
      selectedMinute,
      selectMinute,
      selectedPeriod,
      selectPeriod,
      selectNow,
      clearTime,
    ]);

    // =============================================================================
    // RENDER
    // =============================================================================
    const containerClass = useMemo(() => ['time-picker-container', className].filter(Boolean).join(' '), [className]);

    return (
      <div className={containerClass}>
        {label && <div className="label">{label}</div>}
        <BasicMenu
          ref={menuRef}
          triggerType="click"
          placement="bottom-start"
          width='17.5rem'
          closeOnOutsideClick={true}
          disabled={disabled}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
        >
          {({ name }) => {
            if (name === 'trigger') {
              return renderTrigger();
            }
            if (name === 'content') {
              return renderContent();
            }
            return null;
          }}
        </BasicMenu>
      </div>
    );
  }),
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicTimePicker.propTypes = {
  modelValue: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  use12HourFormat: PropTypes.bool,
  minuteStep: PropTypes.number,
  className: PropTypes.string,
  onModelValueChange: PropTypes.func,
  onChange: PropTypes.func,
};

BasicTimePicker.displayName = 'BasicTimePicker';

export default BasicTimePicker;

