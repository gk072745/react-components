import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BasicMenu from './BasicMenu';
import BasicChip from './BasicChip';

const BasicComboBox = memo(
  forwardRef(function BasicComboBox(
    {
      items = [],
      modelValue = null,
      multiple = false,
      itemText = 'text',
      itemValue = 'value',
      itemDisabled = 'disabled',
      filterFunction = null,
      selectedOnTop = false,
      placement = 'bottom',
      offset = [0, 0.125],
      menuWidth = null,
      matchTriggerWidth = true,
      placeholder = '',
      disabled = false,
      loading = false,
      clearable = false,
      readonly = false,
      className = '',
      onModelValueChange,
      onChange,
      onSelect,
      onRemove,
      onSearch,
      onCreate,
      children,
    },
    ref,
  ) {
    // =============================================================================
    // REFS
    // =============================================================================
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [customItems, setCustomItems] = useState([]);

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const getItemText = useCallback(
      (item) => {
        if (!item) return '';
        if (typeof item === 'string' || typeof item === 'number') {
          return item.toString();
        }
        return item[itemText] || '';
      },
      [itemText],
    );

    const getItemValue = useCallback(
      (item) => {
        if (!item) return null;
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        }
        return item[itemValue] !== undefined ? item[itemValue] : item;
      },
      [itemValue],
    );

    const isDisabled = useCallback(
      (item) => {
        if (!item) return false;
        if (typeof item === 'string' || typeof item === 'number') return false;
        return Boolean(item[itemDisabled]);
      },
      [itemDisabled],
    );

    const isSelected = useCallback(
      (item) => {
        const itemValue = getItemValue(item);
        if (multiple) {
          return Array.isArray(modelValue) && modelValue.includes(itemValue);
        }
        return modelValue === itemValue;
      },
      [modelValue, multiple, getItemValue],
    );

    const createCustomItem = useCallback(
      (value) => {
        // Check if custom item already exists
        const existing = customItems.find((item) => getItemValue(item) === value);
        if (existing) return existing;

        const customItem = {
          [itemText]: value,
          [itemValue]: value,
          __isCustom: true,
        };

        setCustomItems((prev) => [...prev, customItem]);
        return customItem;
      },
      [customItems, itemText, itemValue, getItemValue],
    );

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const allItems = useMemo(() => {
      return [...items, ...customItems];
    }, [items, customItems]);

    const selectedItems = useMemo(() => {
      if (!multiple) {
        if (modelValue == null) return [];
        const selected = allItems.find((item) => getItemValue(item) === modelValue);
        return selected ? [selected] : [];
      }

      if (!Array.isArray(modelValue)) return [];

      return modelValue
        .map((value) => {
          return allItems.find((item) => getItemValue(item) === value);
        })
        .filter(Boolean);
    }, [allItems, modelValue, multiple, getItemValue]);

    const selectedItem = useMemo(() => {
      if (multiple) return null;
      return selectedItems[0] || null;
    }, [multiple, selectedItems]);

    const hasSelection = useMemo(() => {
      return multiple ? selectedItems.length > 0 : modelValue != null;
    }, [multiple, selectedItems, modelValue]);

    const sortedItems = useMemo(() => {
      // Filter out custom items - only show original items from props.items
      let filteredItems = items.filter((item) => !isDisabled(item));

      if (!searchText.trim()) {
        // No search - just sort by selected if needed
        if (!selectedOnTop) {
          return filteredItems;
        }

        const selected = [];
        const unselected = [];

        filteredItems.forEach((item) => {
          if (isSelected(item)) {
            selected.push(item);
          } else {
            unselected.push(item);
          }
        });

        return [...selected, ...unselected];
      }

      // With search - filter and sort by relevance
      const search = searchText.toLowerCase().trim();

      const scoredItems = filteredItems.map((item) => {
        const text = getItemText(item).toLowerCase();
        let score = 0;

        // First check if item passes custom filter (if provided)
        if (filterFunction && !filterFunction(item, searchText)) {
          return { item, score: 0 }; // Item doesn't pass custom filter
        }

        // Apply default scoring system
        if (text === search) {
          score = 100; // Exact match
        } else if (text.startsWith(search)) {
          score = 50; // Starts with search
        } else if (text.includes(search)) {
          score = 25; // Contains search
        } else {
          score = 0; // No match
        }

        // Boost score for selected items if selectedOnTop is true
        if (selectedOnTop && isSelected(item)) {
          score += 1000;
        }

        return { item, score };
      });

      // Filter out items with score 0 (no match) and sort by score (highest first)
      return scoredItems
        .filter((scored) => scored.score > 0)
        .sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          }
          // Maintain original order for items with same score
          return filteredItems.indexOf(a.item) - filteredItems.indexOf(b.item);
        })
        .map((scored) => scored.item);
    }, [items, searchText, selectedOnTop, isDisabled, isSelected, getItemText, filterFunction]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleMenuOpen = useCallback(() => {
      setIsMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
      setIsMenuOpen(false);

      // Single mode: whatever is typed becomes the value
      if (!multiple) {
        const trimmedText = searchText.trim();
        if (trimmedText) {
          // Always use the typed text, regardless of previous selection
          const customItem = createCustomItem(trimmedText);
          const itemValue = getItemValue(customItem);
          onModelValueChange?.(itemValue);
          onChange?.(itemValue);
          onCreate?.(customItem, itemValue);
          setSearchText(trimmedText);
        } else if (hasSelection && selectedItem) {
          // Only restore previous selection if input is empty
          setSearchText(getItemText(selectedItem));
        }
      } else {
        // Multiple mode: just clear search text
        // (chip creation happens in blur or enter handler)
        setSearchText('');
      }
    }, [multiple, searchText, hasSelection, selectedItem, getItemText, createCustomItem, getItemValue, onModelValueChange, onChange, onCreate]);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
      if (!disabled && !isMenuOpen) {
        menuRef.current?.openMenu();
      }
    }, [disabled, isMenuOpen]);

    const toggleMenu = useCallback(() => {
      if (isMenuOpen) {
        menuRef.current?.closeMenu();
      } else {
        menuRef.current?.openMenu();
      }
    }, [isMenuOpen]);

    const handleSearchInput = useCallback(
      (value) => {
        setSearchText(value);
        onSearch?.(value);

        // Keep menu open while focused and has input
        if (isFocused && !isMenuOpen) {
          menuRef.current?.openMenu();
        }
      },
      [isFocused, isMenuOpen, onSearch],
    );

    const handleOptionClick = useCallback(
      (item) => {
        if (isDisabled(item)) return;

        const itemValue = getItemValue(item);

        if (multiple) {
          let newValue = Array.isArray(modelValue) ? [...modelValue] : [];

          if (isSelected(item)) {
            // Remove item
            newValue = newValue.filter((val) => val !== itemValue);
            onRemove?.(item, itemValue);
          } else {
            // Add item
            newValue.push(itemValue);
            onSelect?.(item, itemValue);
          }

          onModelValueChange?.(newValue);
          onChange?.(newValue);

          // Clear search after selection in multiple mode
          setSearchText('');
        } else {
          onModelValueChange?.(itemValue);
          onChange?.(itemValue);
          onSelect?.(item, itemValue);

          // Set display text and close menu
          setSearchText(getItemText(item));
          menuRef.current?.closeMenu();
        }
      },
      [multiple, modelValue, isDisabled, getItemValue, isSelected, onModelValueChange, onChange, onSelect, onRemove, getItemText],
    );

    const handleClear = useCallback(() => {
      const newValue = multiple ? [] : null;
      onModelValueChange?.(newValue);
      onChange?.(newValue);
      setSearchText('');
    }, [multiple, onModelValueChange, onChange]);

    const removeItem = useCallback(
      (itemValue) => {
        if (!multiple || disabled) return;

        const item = allItems.find((item) => getItemValue(item) === itemValue);
        const newValue = Array.isArray(modelValue) ? modelValue.filter((val) => val !== itemValue) : [];

        onModelValueChange?.(newValue);
        onChange?.(newValue);
        if (item) {
          onRemove?.(item, itemValue);
        }
      },
      [multiple, disabled, allItems, modelValue, getItemValue, onModelValueChange, onChange, onRemove],
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (disabled) return;

        // Handle Enter key in multiple mode
        if (event.key === 'Enter' && multiple) {
          event.preventDefault();
          const trimmedText = searchText.trim();
          if (trimmedText) {
            // Capture text before clearing
            const textToAdd = trimmedText;

            const customItem = createCustomItem(textToAdd);
            const itemValue = getItemValue(customItem);

            // Check if already selected
            if (!Array.isArray(modelValue) || !modelValue.includes(itemValue)) {
              const newValue = Array.isArray(modelValue) ? [...modelValue, itemValue] : [itemValue];
              onModelValueChange?.(newValue);
              onChange?.(newValue);
              onCreate?.(customItem, itemValue);
            }

            // Clear search text after emitting
            setSearchText('');
          }
          return;
        }

        // Handle Enter key in single mode
        if (event.key === 'Enter' && !multiple) {
          event.preventDefault();
          const trimmedText = searchText.trim();
          if (trimmedText) {
            const customItem = createCustomItem(trimmedText);
            const itemValue = getItemValue(customItem);
            onModelValueChange?.(itemValue);
            onChange?.(itemValue);
            onCreate?.(customItem, itemValue);
            setSearchText(trimmedText);
            menuRef.current?.closeMenu();
          }
          return;
        }

        if (!multiple) return;

        // Handle backspace in multiple mode
        if (event.key === 'Backspace') {
          // Remove all if Shift/Ctrl/Cmd is pressed
          if (event.shiftKey || event.ctrlKey || event.metaKey) {
            if (selectedItems.length > 0) {
              event.preventDefault();
              onModelValueChange?.([]);
              onChange?.([]);
              setSearchText('');
            }
            return;
          }

          // Remove one item at a time if input is empty and there are selected items
          if (!searchText && selectedItems.length > 0) {
            event.preventDefault();
            const lastItem = selectedItems[selectedItems.length - 1];
            const lastValue = getItemValue(lastItem);
            removeItem(lastValue);
          }
        }
      },
      [disabled, multiple, searchText, selectedItems, modelValue, getItemValue, createCustomItem, removeItem, onModelValueChange, onChange, onCreate],
    );

    // =============================================================================
    // WATCH FOR MODEL VALUE CHANGES
    // =============================================================================
    useEffect(() => {
      if (!multiple && !isFocused && !isMenuOpen) {
        const selected = allItems.find((item) => getItemValue(item) === modelValue);
        setSearchText(selected ? getItemText(selected) : '');
      } else if (multiple && !isFocused && !isMenuOpen) {
        // In multiple mode, clear search when not focused
        setSearchText('');
      }
    }, [modelValue, multiple, isFocused, isMenuOpen, allItems, getItemValue, getItemText]);

    // Clear search text when menu closes in multiple mode
    useEffect(() => {
      if (!isMenuOpen && multiple) {
        setSearchText('');
      }
    }, [isMenuOpen, multiple]);

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      blur: () => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      },
      openMenu: () => menuRef.current?.openMenu(),
      closeMenu: () => menuRef.current?.closeMenu(),
      search: (value) => {
        setSearchText(value);
      },
    }));

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderTrigger = useCallback(() => {
      // Support slot-based API (children function)
      if (typeof children === 'function') {
        const triggerSlot = children({
          name: 'trigger',
          isOpen: isMenuOpen,
          selectedItems,
          searchText,
          isFocused,
        });
        if (triggerSlot) return triggerSlot;
      }

      return (
        <div
          className={`trigger-container ${multiple && selectedItems.length > 0 ? 'has-selected-items' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main container with chips and input */}
          <div className="main-container">
            {/* Chips display */}
            {multiple &&
              selectedItems.map((item) => (
                <BasicChip
                  key={getItemValue(item)}
                  chip={item}
                  textKey={itemText}
                  valueKey={itemValue}
                  closable={!disabled}
                  onDeleteChip={(chipValue) => removeItem(chipValue)}
                />
              ))}

            <input
              ref={inputRef}
              type="text"
              value={searchText}
              placeholder={multiple && selectedItems.length > 0 ? '' : placeholder}
              disabled={disabled || loading}
              readOnly={readonly}
              className="combobox-input"
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Append wrapper with loading, clear, and arrow */}
          <div className="append-wrapper">
            {loading ? (
              <div className="loading-indicator">
                <svg className="spinner" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                </svg>
              </div>
            ) : clearable && (hasSelection || searchText) ? (
              <div className="clear-button" onClick={(e) => { e.stopPropagation(); handleClear(); }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : null}
            <div className={`select-arrow ${isMenuOpen ? 'rotated' : ''}`} onClick={(e) => { e.stopPropagation(); toggleMenu(); }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      );
    }, [
      children,
      isMenuOpen,
      selectedItems,
      searchText,
      isFocused,
      multiple,
      disabled,
      loading,
      clearable,
      hasSelection,
      placeholder,
      itemText,
      itemValue,
      getItemValue,
      removeItem,
      handleSearchInput,
      handleInputFocus,
      handleKeyDown,
      handleClear,
      toggleMenu,
    ]);

    const renderContent = useCallback(() => {
      // Support slot-based API for content
      if (typeof children === 'function') {
        const contentSlot = children({ name: 'content' });
        if (contentSlot) return contentSlot;
      }

      return (
        <div className="combobox-dropdown">
          {/* Options list */}
          {sortedItems.length > 0 ? (
            sortedItems.map((item) => {
              const itemValue = getItemValue(item);
              const isItemSelected = isSelected(item);
              const isItemDisabled = isDisabled(item);

              // Support slot-based API for item
              if (typeof children === 'function') {
                const itemSlot = children({
                  name: 'item',
                  item,
                  selected: isItemSelected,
                  disabled: isItemDisabled,
                  toggle: () => handleOptionClick(item),
                });
                if (itemSlot) {
                  return (
                    <div
                      key={itemValue}
                      className={`select-option ${isItemSelected ? 'selected' : ''} ${isItemDisabled ? 'disabled' : ''}`}
                      onClick={() => handleOptionClick(item)}
                    >
                      {itemSlot}
                    </div>
                  );
                }
              }

              return (
                <div
                  key={itemValue}
                  className={`select-option ${isItemSelected ? 'selected' : ''} ${isItemDisabled ? 'disabled' : ''}`}
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="option-content">
                    {/* Checkbox for multiple selection */}
                    {multiple && (
                      <div className="option-checkbox">
                        {isItemSelected && (
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <span className="option-text">{getItemText(item)}</span>
                  </div>
                </div>
              );
            })
          ) : loading ? (
            <div className="select-loading">
              <div className="loading-spinner">
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                </svg>
              </div>
              <span>Loading...</span>
            </div>
          ) : (
            <div className="select-empty">
              {typeof children === 'function' ? (
                children({ name: 'no-data' })
              ) : (
                <span className="empty-text">{searchText ? 'No matching options found' : 'No options available'}</span>
              )}
            </div>
          )}
        </div>
      );
    }, [children, sortedItems, loading, searchText, multiple, getItemValue, isSelected, isDisabled, getItemText, handleOptionClick]);

    // =============================================================================
    // RENDER
    // =============================================================================
    const containerClass = useMemo(() => ['combobox', className].filter(Boolean).join(' '), [className]);

    return (
      <div className={containerClass}>
        <BasicMenu
          ref={menuRef}
          triggerType="click"
          placement={placement}
          offset={offset}
          width={menuWidth}
          matchTriggerWidth={matchTriggerWidth}
          disabled={disabled || readonly}
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
BasicComboBox.propTypes = {
  items: PropTypes.array,
  modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  multiple: PropTypes.bool,
  itemText: PropTypes.string,
  itemValue: PropTypes.string,
  itemDisabled: PropTypes.string,
  filterFunction: PropTypes.func,
  selectedOnTop: PropTypes.bool,
  placement: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-top',
    'left-bottom',
    'right-top',
    'right-bottom',
  ]),
  offset: PropTypes.arrayOf(PropTypes.number),
  menuWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  matchTriggerWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  readonly: PropTypes.bool,
  className: PropTypes.string,
  onModelValueChange: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  onSearch: PropTypes.func,
  onCreate: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

BasicComboBox.displayName = 'BasicComboBox';

export default BasicComboBox;

