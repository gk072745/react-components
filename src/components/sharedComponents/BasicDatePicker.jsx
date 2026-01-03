import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  parse,
  isValid,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  isWithinInterval,
  getDay,
  startOfDay,
  endOfDay,
  addDays,
} from 'date-fns';
import BasicMenu from './BasicMenu';
import BasicInput from './BasicInput';
import BasicTimePicker from './BasicTimePicker';

const BasicDatePicker = memo(function BasicDatePicker({
  // Core props
  modelValue = null,
  type = 'date', // 'date' | 'time' | 'datetime'

  // Format props
  format: formatProp = null,
  displayFormat = null,
  outputFormat = null,

  // Selection modes
  range = false,
  multiDates = false,
  multiDatesLimit = null,

  // Constraints
  minDate = null,
  maxDate = null,
  disabledDates = [],
  disabledWeekDays = [],

  // Display props
  placeholder = null,
  label = '',
  disabled = false,
  readonly = false,
  clearable = true,
  hideCalendarIcon = false,
  textInput = false,

  // Calendar props
  weekStart = 0, // 0 = Sunday, 1 = Monday
  sixWeeks = true,
  noToday = false,

  // Time props (for datetime)
  is24Hour = true,
  minuteStep = 1,

  // Behavior props
  autoApply = true,
  closeOnAutoApply = true,

  // Validation
  rules = [],
  hideDetails = false,
  hint = '',

  // Events
  onModelValueChange,
  onChange,
  onOpen,
  onClose,
  onCleared,

  // Slots (via render props)
  renderHeader,
  renderFooter,

  className = '',

  // React 19: ref as regular prop
  ref,
}) {
    // =============================================================================
    // REFS & STATE
    // =============================================================================
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);
    const [timeValue, setTimeValue] = useState('');
    const [hoveredDate, setHoveredDate] = useState(null); // For range selection preview
    const isSelectingRef = useRef(false); // Track if user is actively selecting (to prevent modelValue watcher interference)
    const previousValidRangeRef = useRef(null); // Store the last valid range for reverting incomplete selections

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const isTimePicker = type === 'time';
    const isDateTimePicker = type === 'datetime';

    // Default formats
    const defaultFormat = useMemo(() => {
      if (formatProp) return formatProp;
      switch (type) {
        case 'time':
          return 'HH:mm';
        case 'datetime':
          return 'dd/MM/yyyy HH:mm';
        case 'date':
        default:
          return 'dd/MM/yyyy';
      }
    }, [formatProp, type]);

    const displayFormatStr = useMemo(() => displayFormat || defaultFormat, [displayFormat, defaultFormat]);

    // Calendar grid
    const calendarDays = useMemo(() => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: weekStart });
      const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: weekStart });

      // If sixWeeks is true, extend to 6 weeks
      if (sixWeeks) {
        const daysInView = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
        const totalDays = daysInView.length;
        if (totalDays < 42) {
          const additionalDays = 42 - totalDays;
          return [
            ...eachDayOfInterval({ start: calendarStart, end: calendarEnd }),
            ...Array.from({ length: additionalDays }, (_, i) => addDays(calendarEnd, i + 1)),
          ];
        }
      }

      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    }, [currentMonth, weekStart, sixWeeks]);

    // Week day headers
    const weekDays = useMemo(() => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return [...days.slice(weekStart), ...days.slice(0, weekStart)];
    }, [weekStart]);

    // =============================================================================
    // DATE UTILITY FUNCTIONS
    // =============================================================================
    
    // Helper to sort two dates in chronological order [start, end]
    const sortDatesAsc = useCallback((dates) => {
      if (!dates || dates.length !== 2) return dates;
      const [first, second] = dates;
      if (!first || !second) return dates;
      return isBefore(first, second) ? [first, second] : [second, first];
    }, []);

    const parseDate = useCallback(
      (value) => {
        if (!value) return null;
        if (value instanceof Date) return isValid(value) ? value : null;
        if (typeof value === 'string') {
          try {
            const parsed = parse(value, displayFormatStr, new Date());
            return isValid(parsed) ? parsed : null;
          } catch {
            return null;
          }
        }
        if (typeof value === 'number') {
          return isValid(new Date(value)) ? new Date(value) : null;
        }
        return null;
      },
      [displayFormatStr],
    );

    const formatDate = useCallback(
      (date, formatStr = displayFormatStr) => {
        if (!date || !isValid(date)) return '';
        try {
          return format(date, formatStr);
        } catch {
          return '';
        }
      },
      [displayFormatStr],
    );

    const isDateDisabled = useCallback(
      (date) => {
        if (minDate) {
          const min = parseDate(minDate);
          if (min && isBefore(date, startOfDay(min))) return true;
        }
        if (maxDate) {
          const max = parseDate(maxDate);
          if (max && isAfter(date, endOfDay(max))) return true;
        }
        if (disabledDates.some((d) => isSameDay(date, parseDate(d)))) return true;
        if (disabledWeekDays.includes(getDay(date))) return true;
        return false;
      },
      [minDate, maxDate, disabledDates, disabledWeekDays, parseDate],
    );

    // =============================================================================
    // SELECTION HANDLERS
    // =============================================================================
    const handleDateClick = useCallback(
      (date) => {
        if (isDateDisabled(date)) return;

        if (range) {
          // Range selection logic
          if (selectedDates.length === 0 || selectedDates.length === 2) {
            // Start new range selection
            isSelectingRef.current = true;
            setSelectedDates([date]);
            setHoveredDate(null);
          } else if (selectedDates.length === 1) {
            // Complete range selection - sort dates so start < end
            const newRange = sortDatesAsc([selectedDates[0], date]);
            setSelectedDates(newRange);
            setHoveredDate(null);
            isSelectingRef.current = false; // Selection complete
            // Store as valid range for future revert
            previousValidRangeRef.current = newRange;
            if (autoApply && closeOnAutoApply) {
              menuRef.current?.closeMenu();
            }
          }
        } else if (multiDates) {
          // Multi-date selection logic
          const index = selectedDates.findIndex((d) => isSameDay(d, date));
          if (index > -1) {
            setSelectedDates(selectedDates.filter((_, i) => i !== index));
          } else {
            if (multiDatesLimit && selectedDates.length >= multiDatesLimit) {
              return; // Limit reached
            }
            setSelectedDates([...selectedDates, date]);
          }
        } else {
          // Single date selection
          setSelectedDates([date]);
          if (autoApply && closeOnAutoApply && !isDateTimePicker) {
            menuRef.current?.closeMenu();
          }
        }
      },
      [
        range,
        multiDates,
        multiDatesLimit,
        selectedDates,
        autoApply,
        closeOnAutoApply,
        isDateTimePicker,
        isDateDisabled,
        sortDatesAsc,
      ],
    );

    // =============================================================================
    // VALUE MANAGEMENT
    // =============================================================================
    const updateDisplayValue = useCallback(() => {
      // Format selected dates for display
      if (range) {
        if (selectedDates.length === 2) {
          // Sort for display
          const sortedDates = sortDatesAsc(selectedDates);
          return `${formatDate(sortedDates[0])} - ${formatDate(sortedDates[1])}`;
        } else if (selectedDates.length === 1 && isSelectingRef.current) {
          // Show single date while selecting (temporary display)
          return formatDate(selectedDates[0]);
        }
        // Otherwise show empty for range mode
        return '';
      } else if (multiDates && selectedDates.length > 0) {
        return selectedDates.map((d) => formatDate(d)).join(', ');
      } else if (selectedDates.length === 1) {
        const dateStr = formatDate(selectedDates[0]);
        if (isDateTimePicker && timeValue) {
          return `${dateStr} ${timeValue}`;
        }
        return dateStr;
      }
      return '';
    }, [selectedDates, range, multiDates, isDateTimePicker, timeValue, formatDate, sortDatesAsc]);

    const emitValue = useCallback(() => {
      let outputValue = null;

      if (isTimePicker) {
        outputValue = timeValue;
      } else if (range && selectedDates.length === 2) {
        // Ensure dates are sorted
        const sortedDates = sortDatesAsc(selectedDates);
        outputValue = {
          start: sortedDates[0],
          end: sortedDates[1],
        };
      } else if (multiDates && selectedDates.length > 0) {
        outputValue = selectedDates;
      } else if (selectedDates.length === 1 && !range) {
        // Only emit single date if NOT in range mode (range mode needs 2 dates)
        if (isDateTimePicker && timeValue) {
          const [hours, minutes] = timeValue.split(':');
          const date = new Date(selectedDates[0]);
          date.setHours(parseInt(hours, 10) || 0);
          date.setMinutes(parseInt(minutes, 10) || 0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          outputValue = date;
        } else {
          outputValue = selectedDates[0];
        }
      }

      // Format output if needed
      if (outputFormat && outputValue) {
        if (Array.isArray(outputValue)) {
          outputValue = outputValue.map((d) => formatDate(d, outputFormat));
        } else if (outputValue instanceof Date) {
          outputValue = formatDate(outputValue, outputFormat);
        } else if (typeof outputValue === 'object' && 'start' in outputValue) {
          outputValue = {
            start: formatDate(outputValue.start, outputFormat),
            end: formatDate(outputValue.end, outputFormat),
          };
        }
      }

      onModelValueChange?.(outputValue);
      onChange?.(outputValue);
    }, [
      selectedDates,
      timeValue,
      range,
      multiDates,
      isTimePicker,
      isDateTimePicker,
      outputFormat,
      formatDate,
      sortDatesAsc,
      onModelValueChange,
      onChange,
    ]);

    // =============================================================================
    // MENU HANDLERS
    // =============================================================================
    const handleMenuOpen = useCallback(() => {
      onOpen?.();
    }, [onOpen]);

    const handleMenuClose = useCallback(() => {
      setHoveredDate(null); // Reset hover on close
      isSelectingRef.current = false; // Reset selection flag

      // Handle incomplete range selection
      if (range) {
        if (selectedDates.length === 1) {
          // User selected only one date - revert to previous valid range or clear
          if (previousValidRangeRef.current && previousValidRangeRef.current.length === 2) {
            setSelectedDates([...previousValidRangeRef.current]);
            // Don't emit, keep the previous value
          } else {
            // No previous valid range, clear everything
            setSelectedDates([]);
            onModelValueChange?.(null);
            onChange?.(null);
          }
        } else if (selectedDates.length === 2) {
          // Complete range - emit value (already sorted)
          emitValue();
        } else {
          // No dates selected
          onModelValueChange?.(null);
          onChange?.(null);
        }
      } else {
        // Non-range mode - emit normally
        emitValue();
      }

      onClose?.();
    }, [range, selectedDates, emitValue, onClose, onModelValueChange, onChange]);

    const handleClear = useCallback(() => {
      setSelectedDates([]);
      setTimeValue('');
      setHoveredDate(null);
      isSelectingRef.current = false;
      // Clear previous valid range so it doesn't revert on next incomplete selection
      previousValidRangeRef.current = null;
      onModelValueChange?.(null);
      onChange?.(null);
      onCleared?.();
    }, [onModelValueChange, onChange, onCleared]);

    // =============================================================================
    // NAVIGATION
    // =============================================================================
    const goToPreviousMonth = useCallback(() => {
      setCurrentMonth((prev) => subMonths(prev, 1));
    }, []);

    const goToNextMonth = useCallback(() => {
      setCurrentMonth((prev) => addMonths(prev, 1));
    }, []);

    const goToToday = useCallback(() => {
      const today = new Date();
      setCurrentMonth(today);
      if (!isTimePicker) {
        handleDateClick(today);
      }
    }, [isTimePicker, handleDateClick]);

    // =============================================================================
    // EMIT VALUE WHEN RANGE IS COMPLETE
    // =============================================================================
    useEffect(() => {
      // Emit value immediately when range selection is complete (2 dates selected)
      if (range && selectedDates.length === 2 && !isTimePicker) {
        // Dates should already be sorted from handleDateClick, but ensure order
        const sortedDates = sortDatesAsc(selectedDates);
        
        const rangeValue = {
          start: sortedDates[0],
          end: sortedDates[1],
        };

        // Format output if needed
        let outputValue = rangeValue;
        if (outputFormat) {
          outputValue = {
            start: formatDate(rangeValue.start, outputFormat),
            end: formatDate(rangeValue.end, outputFormat),
          };
        }

        onModelValueChange?.(outputValue);
        onChange?.(outputValue);
      }
    }, [selectedDates, range, isTimePicker, outputFormat, formatDate, onModelValueChange, onChange, sortDatesAsc]);

    // =============================================================================
    // WATCH MODEL VALUE
    // =============================================================================
    useEffect(() => {
      // Don't update from modelValue if user is actively selecting a new range
      if (isSelectingRef.current && range) {
        return;
      }

      if (modelValue) {
        if (isTimePicker) {
          if (typeof modelValue === 'string') {
            setTimeValue(modelValue);
          } else if (modelValue instanceof Date) {
            setTimeValue(formatDate(modelValue, 'HH:mm'));
          }
        } else if (range && typeof modelValue === 'object' && 'start' in modelValue) {
          const start = parseDate(modelValue.start);
          const end = parseDate(modelValue.end);
          if (start && end) {
            // Sort dates to ensure start < end
            const sortedDates = sortDatesAsc([start, end]);
            setSelectedDates(sortedDates);
            setCurrentMonth(sortedDates[0]);
            // Store as previous valid range
            previousValidRangeRef.current = sortedDates;
          }
        } else if (multiDates && Array.isArray(modelValue)) {
          const dates = modelValue.map(parseDate).filter(Boolean);
          setSelectedDates(dates);
          if (dates.length > 0) {
            setCurrentMonth(dates[0]);
          }
        } else {
          const date = parseDate(modelValue);
          if (date) {
            setSelectedDates([date]);
            setCurrentMonth(date);
            if (isDateTimePicker && modelValue instanceof Date) {
              setTimeValue(formatDate(modelValue, 'HH:mm'));
            }
          }
        }
      } else {
        setSelectedDates([]);
        setTimeValue('');
        setHoveredDate(null);
        // Clear previous valid range when value is cleared
        if (range) {
          previousValidRangeRef.current = null;
        }
      }
    }, [modelValue, isTimePicker, range, multiDates, isDateTimePicker, parseDate, formatDate, sortDatesAsc]);

    // =============================================================================
    // React 19: Direct ref assignment (no useImperativeHandle needed)
    // =============================================================================
    useEffect(() => {
      if (ref) {
        const api = {
          focus: () => inputRef.current?.focus(),
          blur: () => inputRef.current?.blur(),
          openMenu: () => menuRef.current?.openMenu(),
          closeMenu: () => menuRef.current?.closeMenu(),
          validate: () => inputRef.current?.validate(),
        };

        if (typeof ref === 'function') {
          ref(api);
        } else if (ref.current !== undefined) {
          ref.current = api;
        }
      }
    }, [ref]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderCalendarIcon = useCallback(() => {
      if (hideCalendarIcon) return null;

      return (
        <svg
          className="calendar-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => {
            e.stopPropagation();
            menuRef.current?.openMenu();
          }}
        >
          <path
            d="M7 2V5M17 2V5M3 8H21M5 4H19C20.1046 4 21 4.89543 21 6V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V6C3 4.89543 3.89543 4 5 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }, [hideCalendarIcon]);

    const handleAppendInnerClick = useCallback(() => {
      if (!disabled && !readonly) {
        menuRef.current?.openMenu();
      }
    }, [disabled, readonly]);

    const renderCalendarContent = useCallback(() => {
      if (isTimePicker) {
        return (
          <div className="date-picker-time-content">
            <BasicTimePicker
              modelValue={timeValue}
              use12HourFormat={!is24Hour}
              minuteStep={minuteStep}
              onModelValueChange={(value) => {
                setTimeValue(value);
                emitValue();
              }}
            />
          </div>
        );
      }

      return (
        <div className="date-picker-content">
          {/* Header */}
          {renderHeader ? (
            renderHeader({ currentMonth, goToPreviousMonth, goToNextMonth, goToToday })
          ) : (
            <div className="date-picker-header">
              <button type="button" onClick={goToPreviousMonth} className="nav-button">
                ‹
              </button>
              <div className="month-year">{format(currentMonth, 'MMMM yyyy')}</div>
              <button type="button" onClick={goToNextMonth} className="nav-button">
                ›
              </button>
            </div>
          )}

          {/* Range selection hint */}
          {range && selectedDates.length === 1 && (
            <div className="range-hint">
              Select end date
            </div>
          )}

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {/* Week day headers */}
            <div className="week-days">
              {weekDays.map((day) => (
                <div key={day} className="week-day">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="calendar-days">
              {calendarDays.map((day, index) => {
                const isSelected = selectedDates.some((d) => isSameDay(d, day));
                const isToday = !noToday && isSameDay(day, new Date());
                const isDisabled = isDateDisabled(day);
                const isOtherMonth = !isSameMonth(day, currentMonth);

                // Range selection logic
                let isStart = false;
                let isEnd = false;
                let isInRange = false;

                if (range && selectedDates.length > 0) {
                  const startDate = selectedDates[0];
                  const endDate = selectedDates.length === 2 ? selectedDates[1] : hoveredDate;

                  if (endDate && !isBefore(endDate, startDate)) {
                    isStart = isSameDay(day, startDate);
                    isEnd = isSameDay(day, endDate);
                    isInRange = isWithinInterval(day, { start: startDate, end: endDate });
                  } else if (endDate && isBefore(endDate, startDate)) {
                    // If end is before start, swap them for display
                    isStart = isSameDay(day, endDate);
                    isEnd = isSameDay(day, startDate);
                    isInRange = isWithinInterval(day, { start: endDate, end: startDate });
                  } else if (selectedDates.length === 1) {
                    // Only start date selected, show preview on hover
                    isStart = isSameDay(day, startDate);
                    if (hoveredDate && !isSameDay(hoveredDate, startDate)) {
                      if (isBefore(hoveredDate, startDate)) {
                        isEnd = isSameDay(day, hoveredDate);
                        isInRange = isWithinInterval(day, { start: hoveredDate, end: startDate });
                      } else {
                        isEnd = isSameDay(day, hoveredDate);
                        isInRange = isWithinInterval(day, { start: startDate, end: hoveredDate });
                      }
                    }
                  }
                }

                return (
                  <div
                    key={index}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isStart ? 'range-start' : ''} ${isEnd ? 'range-end' : ''} ${isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${isOtherMonth ? 'other-month' : ''}`}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => {
                      if (range && selectedDates.length === 1 && !isDisabled) {
                        setHoveredDate(day);
                      }
                    }}
                    onMouseLeave={() => {
                      if (range && selectedDates.length === 1) {
                        setHoveredDate(null);
                      }
                    }}
                  >
                    {format(day, 'd')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time picker for datetime mode */}
          {isDateTimePicker && (
            <div className="date-picker-time-section">
              <BasicTimePicker
                modelValue={timeValue}
                use12HourFormat={!is24Hour}
                minuteStep={minuteStep}
                onModelValueChange={(value) => {
                  setTimeValue(value);
                }}
              />
            </div>
          )}

          {/* Footer */}
          {renderFooter ? (
            renderFooter({ selectedDates, timeValue, handleClear, emitValue })
          ) : (
            <div className="date-picker-footer">
              {!autoApply && (
                <>
                  <button type="button" onClick={handleClear} className="footer-button">
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      emitValue();
                      menuRef.current?.closeMenu();
                    }}
                    className="footer-button primary"
                  >
                    Apply
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      );
    }, [
      isTimePicker,
      isDateTimePicker,
      timeValue,
      is24Hour,
      minuteStep,
      currentMonth,
      weekDays,
      calendarDays,
      selectedDates,
      range,
      noToday,
      isDateDisabled,
      handleDateClick,
      renderHeader,
      renderFooter,
      goToPreviousMonth,
      goToNextMonth,
      goToToday,
      emitValue,
      handleClear,
      hoveredDate,
      autoApply,
    ]);

    // =============================================================================
    // RENDER
    // =============================================================================
    const displayValue = updateDisplayValue();
    const defaultPlaceholder =
      placeholder || (isTimePicker ? 'Select time' : isDateTimePicker ? 'Select date and time' : 'Select date');

    return (
      <div className={`date-picker-wrapper ${className}`}>
        <BasicMenu
          ref={menuRef}
          triggerType="click"
          placement="bottom-start"
          closeOnOutsideClick={true}
          disabled={disabled}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
        >
          {({ name }) => {
            if (name === 'trigger') {
              return (
                <BasicInput
                  ref={inputRef}
                  value={displayValue}
                  placeholder={defaultPlaceholder}
                  label={label}
                  disabled={disabled}
                  readonly={readonly || !textInput}
                  clearable={clearable && displayValue}
                  rules={rules}
                  hideDetails={hideDetails}
                  hint={hint}
                  appendInner={!hideCalendarIcon || (clearable && displayValue)}
                  appendInnerIcon={renderCalendarIcon()}
                  onAppendInnerClick={handleAppendInnerClick}
                  onChange={(value) => {
                    // Handle manual input if textInput is enabled
                    if (textInput) {
                      const parsed = parseDate(value);
                      if (parsed) {
                        setSelectedDates([parsed]);
                        setCurrentMonth(parsed);
                      }
                    }
                  }}
                  onClearClick={handleClear}
                  onClick={() => {
                    if (!textInput && !disabled && !readonly) {
                      menuRef.current?.openMenu();
                    }
                  }}
                />
              );
            }
            if (name === 'content') {
              return renderCalendarContent();
            }
            return null;
          }}
        </BasicMenu>
      </div>
    );
});

BasicDatePicker.propTypes = {
  modelValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.array, PropTypes.object]),
  type: PropTypes.oneOf(['date', 'time', 'datetime']),
  format: PropTypes.string,
  displayFormat: PropTypes.string,
  outputFormat: PropTypes.string,
  range: PropTypes.bool,
  multiDates: PropTypes.bool,
  multiDatesLimit: PropTypes.number,
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  disabledDates: PropTypes.array,
  disabledWeekDays: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  clearable: PropTypes.bool,
  hideCalendarIcon: PropTypes.bool,
  textInput: PropTypes.bool,
  weekStart: PropTypes.number,
  sixWeeks: PropTypes.bool,
  weekNumbers: PropTypes.bool,
  monthPicker: PropTypes.bool,
  yearPicker: PropTypes.bool,
  quarterPicker: PropTypes.bool,
  noToday: PropTypes.bool,
  is24Hour: PropTypes.bool,
  enableSeconds: PropTypes.bool,
  minuteStep: PropTypes.number,
  autoApply: PropTypes.bool,
  closeOnAutoApply: PropTypes.bool,
  rules: PropTypes.array,
  hideDetails: PropTypes.bool,
  hint: PropTypes.string,
  onModelValueChange: PropTypes.func,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onCleared: PropTypes.func,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  className: PropTypes.string,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

BasicDatePicker.displayName = 'BasicDatePicker';

export default BasicDatePicker;

