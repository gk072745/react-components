import React, { memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BasicMenu from './BasicMenu';
import BasicChip from './BasicChip';

const BasicDropdown = memo(function BasicDropdown({
  items = [],
  modelValue = null,
  itemText = 'text',
  itemValue = 'value',
  multiple = false,
  disabled = false,
  buttonText = 'Select',
  noDataText = 'No items available',
  selectedOnTop = false,
  triggerType = 'click',
  placement = 'bottom-start',
  offset = [0, 0.125],
  closeOnOutsideClick = true,
  closeOnEsc = true,
  buttonWidth = 'auto',
  width = null,
  className = '',
  onModelValueChange,
  onItemSelect,
  onItemUnselect,
  onMenuOpen,
  onMenuClose,
  trigger,
  triggerContent,
  item: itemSlot,
  noData,
  ref,
}) {
    // =============================================================================
    // REFS
    // =============================================================================
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuWidth, setMenuWidth] = useState('auto');

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const getItemText = useCallback(
      item => {
        if (typeof item === 'string' || typeof item === 'number') {
          return item.toString();
        }
        return item[itemText] || '';
      },
      [itemText]
    );

    const getItemValue = useCallback(
      item => {
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        }
        return item[itemValue] !== undefined ? item[itemValue] : item;
      },
      [itemValue]
    );

    // =============================================================================
    // SELECTION HELPERS
    // =============================================================================
    const isItemSelected = useCallback(
      item => {
        const itemValue = getItemValue(item);
        if (multiple) {
          return Array.isArray(modelValue) && modelValue.includes(itemValue);
        } else {
          return modelValue === itemValue;
        }
      },
      [modelValue, multiple, getItemValue]
    );

    // =============================================================================
    // COMPUTED VALUES
    // =============================================================================
    const selectedItems = useMemo(() => {
      if (!multiple) {
        if (!modelValue) return [];
        const item = items.find(item => getItemValue(item) === modelValue);
        return item ? [item] : [];
      }
      return Array.isArray(modelValue)
        ? items.filter(item => modelValue.includes(getItemValue(item)))
        : [];
    }, [items, modelValue, multiple, getItemValue]);

    const displayItems = useMemo(() => {
      if (!selectedOnTop) {
        return items;
      }

      const selected = [];
      const unselected = [];

      items.forEach(item => {
        if (isItemSelected(item)) {
          selected.push(item);
        } else {
          unselected.push(item);
        }
      });

      return [...selected, ...unselected];
    }, [items, selectedOnTop, isItemSelected]);

    const dropdownWidth = useMemo(() => {
      if (width !== null) {
        if (typeof width === 'number') {
          return `${width}px`;
        }
        return width;
      }
      return menuWidth;
    }, [width, menuWidth]);

    const displayButtonText = useMemo(() => {
      if (selectedItems.length === 0) {
        return buttonText;
      }

      if (!multiple) {
        return getItemText(selectedItems[0]);
      }

      if (selectedItems.length === 1) {
        return getItemText(selectedItems[0]);
      }

      return `${selectedItems.length} items selected`;
    }, [selectedItems, buttonText, multiple, getItemText]);

    // =============================================================================
    // MENU HANDLERS
    // =============================================================================
    const openMenu = useCallback(() => {
      if (disabled) return;
      if (isMenuOpen) return;

      setIsMenuOpen(true);
      if (menuRef.current && !menuRef.current.isOpen) {
        menuRef.current.openMenu();
      }
      onMenuOpen?.();

      // Set dropdown width to match button width if no width prop is provided
      if (width === null && buttonRef.current) {
        setTimeout(() => {
          if (buttonRef.current) {
            setMenuWidth(`${buttonRef.current.getBoundingClientRect().width}px`);
          }
        }, 0);
      }
    }, [disabled, isMenuOpen, width, onMenuOpen]);

    const closeMenu = useCallback(() => {
      if (disabled) return;
      if (!isMenuOpen) return;

      setIsMenuOpen(false);
      if (menuRef.current && menuRef.current.isOpen) {
        menuRef.current.closeMenu();
      }
      onMenuClose?.();
    }, [disabled, isMenuOpen, onMenuClose]);

    const toggleMenu = useCallback(() => {
      if (disabled) return;
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }, [disabled, isMenuOpen, closeMenu, openMenu]);

    const handleMenuOpen = useCallback(() => {
      if (disabled) return;
      setIsMenuOpen(true);
      onMenuOpen?.();
    }, [disabled, onMenuOpen]);

    const handleMenuClose = useCallback(() => {
      if (disabled) return;
      setIsMenuOpen(false);
      onMenuClose?.();
    }, [disabled, onMenuClose]);

    // =============================================================================
    // ITEM HANDLERS
    // =============================================================================
    const removeItem = useCallback(
      item => {
        if (multiple) {
          const itemValue = getItemValue(item);
          const currentValues = Array.isArray(modelValue) ? modelValue : [];
          const newValues = currentValues.filter(value => value !== itemValue);
          onModelValueChange?.(newValues);
          onItemUnselect?.(item);
        }
      },
      [multiple, modelValue, getItemValue, onModelValueChange, onItemUnselect]
    );

    const handleItemClick = useCallback(
      item => {
        const itemValue = getItemValue(item);

        if (multiple) {
          const currentValues = Array.isArray(modelValue) ? [...modelValue] : [];
          const existingIndex = currentValues.indexOf(itemValue);

          if (existingIndex > -1) {
            // Remove item
            currentValues.splice(existingIndex, 1);
            onItemUnselect?.(item);
          } else {
            // Add item
            currentValues.push(itemValue);
            onItemSelect?.(item);
          }

          onModelValueChange?.(currentValues);
        } else {
          // Single select
          if (modelValue === itemValue) {
            // Deselect if same item
            onModelValueChange?.(null);
            onItemUnselect?.(item);
          } else {
            // Select new item
            onModelValueChange?.(itemValue);
            onItemSelect?.(item);
          }
          // Close menu after selection for single select
          setTimeout(() => {
            if (menuRef.current) {
              menuRef.current.closeMenu();
            }
          }, 50);
        }
      },
      [multiple, modelValue, getItemValue, onModelValueChange, onItemSelect, onItemUnselect]
    );

    // =============================================================================
    // IMPERATIVE HANDLE
    // =============================================================================
    useImperativeHandle(ref, () => ({
      openMenu,
      closeMenu,
      toggleMenu,
      isOpen: isMenuOpen,
    }));

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderTrigger = useCallback(() => {
      if (trigger) {
        return typeof trigger === 'function'
          ? trigger({
              isOpen: isMenuOpen,
              selectedItems,
              toggleMenu,
              openMenu,
              closeMenu,
              displayButtonText,
            })
          : trigger;
      }

      return (
        <button
          ref={buttonRef}
          className={`dropdown-button ${isMenuOpen ? 'is-open' : ''}`}
          disabled={disabled}
          style={{ width: buttonWidth }}
          type="button"
          onClick={e => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          {triggerContent ? (
            typeof triggerContent === 'function' ? (
              triggerContent({
                isOpen: isMenuOpen,
                selectedItems,
                toggleMenu,
                openMenu,
                closeMenu,
                displayButtonText,
                multiple,
                disabled,
              })
            ) : (
              triggerContent
            )
          ) : (
            <>
              {multiple && selectedItems.length > 0 ? (
                <div className="chips-container">
                  {selectedItems.map(item => (
                    <BasicChip
                      key={getItemValue(item)}
                      chip={getItemText(item)}
                      closable={!disabled}
                      onDeleteChip={() => removeItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <span className="button-text">{displayButtonText}</span>
              )}

              <svg
                className={`dropdown-icon ${isMenuOpen ? 'rotated' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      );
    }, [
      trigger,
      isMenuOpen,
      selectedItems,
      toggleMenu,
      openMenu,
      closeMenu,
      displayButtonText,
      disabled,
      buttonWidth,
      triggerContent,
      multiple,
      getItemValue,
      getItemText,
      removeItem,
    ]);

    const renderItem = useCallback(
      item => {
        const isSelected = isItemSelected(item);
        const itemValue = getItemValue(item);

        if (itemSlot) {
          return typeof itemSlot === 'function' ? (
            <div key={itemValue} className={`dropdown-item ${isSelected ? 'selected' : ''}`} onClick={() => handleItemClick(item)}>
              {itemSlot({ item, selected: isSelected, toggle: () => handleItemClick(item) })}
            </div>
          ) : (
            itemSlot
          );
        }

        return (
          <div
            key={itemValue}
            className={`dropdown-item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <div className="item-content">
              {multiple && (
                <div className="option-checkbox">
                  {isSelected && (
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
              <span className="item-text">{getItemText(item)}</span>
            </div>
          </div>
        );
      },
      [itemSlot, isItemSelected, getItemValue, handleItemClick, multiple, getItemText]
    );

    const renderContent = useCallback(() => {
      return (
        <div className="dropdown-content">
          <div className="items-wrapper">
            {displayItems.length > 0 ? (
              displayItems.map(item => renderItem(item))
            ) : (
              <div className="no-items">{noData ? (typeof noData === 'function' ? noData() : noData) : noDataText}</div>
            )}
          </div>
        </div>
      );
    }, [displayItems, renderItem, noData, noDataText]);

    // =============================================================================
    // RENDER
    // =============================================================================
    const containerClass = useMemo(() => ['dropdown-container', className].filter(Boolean).join(' '), [className]);

    return (
      <div className={containerClass}>
        <BasicMenu
          ref={menuRef}
          trigger={renderTrigger()}
          triggerType={triggerType}
          placement={placement}
          offset={offset}
          closeOnOutsideClick={closeOnOutsideClick}
          closeOnEsc={closeOnEsc}
          width={dropdownWidth}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
        >
          {renderContent()}
        </BasicMenu>
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
BasicDropdown.propTypes = {
  items: PropTypes.array,
  modelValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  itemText: PropTypes.string,
  itemValue: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
  noDataText: PropTypes.string,
  selectedOnTop: PropTypes.bool,
  triggerType: PropTypes.oneOf(['click', 'hover']),
  placement: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-center',
    'left-end',
    'right-start',
    'right-center',
    'right-end',
  ]),
  offset: PropTypes.arrayOf(PropTypes.number),
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  buttonWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onModelValueChange: PropTypes.func,
  onItemSelect: PropTypes.func,
  onItemUnselect: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  triggerContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  item: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  noData: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  ref: PropTypes.object,
};

BasicDropdown.displayName = 'BasicDropdown';

export default BasicDropdown;

