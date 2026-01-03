import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { remToPixels } from '../../customHooks/useRemToPixels';

const PLACEMENT_CLASSES = [
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
];

const TRIGGER_TYPES = ['click', 'hover'];

const getViewportBounds = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  scrollTop: window.pageYOffset || document.documentElement.scrollTop,
  scrollLeft: window.pageXOffset || document.documentElement.scrollLeft,
});

const detectCollisions = (position, menuRect) => {
  const viewport = getViewportBounds();
  return {
    top: position.top < viewport.scrollTop,
    bottom: position.top + menuRect.height > viewport.scrollTop + viewport.height,
    left: position.left < viewport.scrollLeft,
    right: position.left + menuRect.width > viewport.scrollLeft + viewport.width,
  };
};

const getFlippedPlacement = (placement, collisions) => {
  // Only flip if there's a collision and flipping would help
  if (placement.includes('bottom') && collisions.bottom && !collisions.top) {
    return placement.replace('bottom', 'top');
  }
  if (placement.includes('top') && collisions.top && !collisions.bottom) {
    return placement.replace('top', 'bottom');
  }
  if (placement.includes('right') && collisions.right && !collisions.left) {
    return placement.replace('right', 'left');
  }
  if (placement.includes('left') && collisions.left && !collisions.right) {
    return placement.replace('left', 'right');
  }
  return placement;
};

const calculateInitialPosition = (triggerRect, menuRect, placement, offsetX, offsetY, viewport) => {
  let top, left;

  switch (placement) {
    case 'bottom-start':
      top = triggerRect.bottom + viewport.scrollTop + offsetY;
      left = triggerRect.left + viewport.scrollLeft + offsetX;
      break;
    case 'bottom-end':
      top = triggerRect.bottom + viewport.scrollTop + offsetY;
      left = triggerRect.right + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'top-start':
      top = triggerRect.top + viewport.scrollTop - menuRect.height - offsetY;
      left = triggerRect.left + viewport.scrollLeft + offsetX;
      break;
    case 'top-end':
      top = triggerRect.top + viewport.scrollTop - menuRect.height - offsetY;
      left = triggerRect.right + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'left-top':
      top = triggerRect.top + viewport.scrollTop + offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'left-bottom':
      top = triggerRect.bottom + viewport.scrollTop - menuRect.height + offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'right-top':
      top = triggerRect.top + viewport.scrollTop + offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
      break;
    case 'right-bottom':
      top = triggerRect.bottom + viewport.scrollTop - menuRect.height + offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
      break;
    case 'top':
      top = triggerRect.top + viewport.scrollTop - menuRect.height - offsetY;
      left = triggerRect.left + viewport.scrollLeft + (triggerRect.width - menuRect.width) / 2 + offsetX;
      break;
    case 'right':
      top = triggerRect.top + viewport.scrollTop + (triggerRect.height - menuRect.height) / 2 + offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
      break;
    case 'left':
      top = triggerRect.top + viewport.scrollTop + (triggerRect.height - menuRect.height) / 2 + offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'bottom':
    default:
      top = triggerRect.bottom + viewport.scrollTop + offsetY;
      left = triggerRect.left + viewport.scrollLeft + (triggerRect.width - menuRect.width) / 2 + offsetX;
      break;
  }

  return { top, left };
};

const adjustForViewportBounds = (position, menuRect, viewport) => {
  let { top, left } = position;

  // Adjust horizontal position
  if (left < viewport.scrollLeft) {
    left = viewport.scrollLeft + 8; // 8px padding from edge
  } else if (left + menuRect.width > viewport.scrollLeft + viewport.width) {
    left = viewport.scrollLeft + viewport.width - menuRect.width - 8;
  }

  // Adjust vertical position
  if (top < viewport.scrollTop) {
    top = viewport.scrollTop + 8;
  } else if (top + menuRect.height > viewport.scrollTop + viewport.height) {
    top = viewport.scrollTop + viewport.height - menuRect.height - 8;
  }

  return { top, left };
};

const BasicMenu = memo(
  forwardRef(function BasicMenu(
    {
      children,
      trigger,
      triggerType = 'click',
      placement = 'bottom',
      offset = [0, 0.125],
      closeOnOutsideClick = true,
      closeOnEsc = true,
      width = null,
      matchTriggerWidth = true,
      menuContentClass = [],
      disabled = false,
      fixedX = '',
      fixedY = '',
      menuId = '',
      stopPropagation = true,
      onOpen,
      onClose,
      className = '',
    },
    ref,
  ) {
    const menuContainerRef = useRef(null);
    const triggerElRef = useRef(null);
    const menuElRef = useRef(null);
    const hoverTimeoutIdRef = useRef(null);
    const maxRetriesRef = useRef(0);

    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: '0px', left: '0px', width: width || 'auto' });
    const [actualPlacement, setActualPlacement] = useState(placement);
    const [shouldRender, setShouldRender] = useState(false);
    const [transitionState, setTransitionState] = useState(''); // 'entering', 'leaving', ''

    useEffect(() => {
      setActualPlacement(placement);
    }, [placement]);

    useEffect(() => {
      if (width !== null && width !== undefined) {
        setMenuPosition(prev => ({
          ...prev,
          width: typeof width === 'number' ? `${width}px` : width,
        }));
      }
    }, [width]);

    const clearHoverTimeout = useCallback(() => {
      if (hoverTimeoutIdRef.current) {
        clearTimeout(hoverTimeoutIdRef.current);
        hoverTimeoutIdRef.current = null;
      }
    }, []);

    const calculatePosition = useCallback(() => {
      if (!triggerElRef.current || !menuElRef.current) {
        return { top: '0px', left: '0px', width: 'auto', menuRect: null, triggerRect: null };
      }

      const triggerRect = triggerElRef.current.getBoundingClientRect();
      const menuRect = menuElRef.current.getBoundingClientRect();
      const viewport = getViewportBounds();

      const offsetX = remToPixels(offset[0]);
      const offsetY = remToPixels(offset[1]);

      // Calculate width first
      let calculatedWidth = 'auto';
      if (width) {
        calculatedWidth = typeof width === 'number' ? `${width}px` : width;
      } else if (matchTriggerWidth) {
        calculatedWidth = `${triggerRect.width}px`;
      }

      // Calculate initial position based on placement
      let position = calculateInitialPosition(triggerRect, menuRect, placement, offsetX, offsetY, viewport);

      // Detect collisions
      const collisions = detectCollisions(position, menuRect);

      // Get flipped placement if needed
      const flippedPlacement = getFlippedPlacement(placement, collisions);
      setActualPlacement(flippedPlacement);

      // Recalculate with flipped placement if it changed
      if (flippedPlacement !== placement) {
        position = calculateInitialPosition(triggerRect, menuRect, flippedPlacement, offsetX, offsetY, viewport);
      }

      // Final adjustments to keep within viewport bounds
      position = adjustForViewportBounds(position, menuRect, viewport);

      return {
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: calculatedWidth,
        menuRect,
        triggerRect,
      };
    }, [placement, offset, matchTriggerWidth, width]);

    const updatePosition = useCallback(() => {
      if (menuElRef.current && isOpen && triggerElRef.current) {
        const { menuRect, ...newPosition } = calculatePosition();
        setMenuPosition(prev => {
          // Only update if position actually changed to avoid unnecessary re-renders
          if (prev.top !== newPosition.top || prev.left !== newPosition.left || prev.width !== newPosition.width) {
            return {
              top: newPosition.top,
              left: newPosition.left,
              width: newPosition.width,
            };
          }
          return prev;
        });
        // Check if we need to retry position calculation
        if (menuRect) {
          const isInvalid = menuRect.x <= 0 || menuRect.y <= 0 || menuRect.width <= 0 || menuRect.height <= 0;
          if (isInvalid && maxRetriesRef.current < 3) {
            maxRetriesRef.current++;
            requestAnimationFrame(() => {
              updatePosition();
            });
          } else {
            maxRetriesRef.current = 0;
          }
        }
      }
    }, [isOpen, calculatePosition]);

    const openMenu = useCallback(() => {
      if (disabled) return;
      if (isOpen) return;

      setShouldRender(true);
      setIsOpen(true);
      onOpen?.();
      
      // Trigger enter animation - apply enter-from first, then enter-active
      setTransitionState('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionState('');
          updatePosition();
        });
      });
    }, [disabled, isOpen, onOpen, updatePosition]);

    const closeMenu = useCallback(() => {
      if (disabled) return;
      if (!isOpen) return;

      setTransitionState('leaving');
      
      // Wait for transition to complete before removing from DOM
      setTimeout(() => {
        setIsOpen(false);
        setShouldRender(false);
        setTransitionState('');
        onClose?.();
      }, 150); // Match leave transition duration
    }, [disabled, isOpen, onClose]);

    const toggleMenu = useCallback(() => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }, [isOpen, openMenu, closeMenu]);

    const handleTriggerClick = useCallback(
      (event) => {
        event.preventDefault();
        if (stopPropagation) {
          event.stopPropagation();
        }

        if (triggerType === 'click') {
          toggleMenu();
        }
      },
      [triggerType, stopPropagation, toggleMenu],
    );

    const handleMouseEnter = useCallback(() => {
      clearHoverTimeout();
      openMenu();
    }, [clearHoverTimeout, openMenu]);

    const handleMouseLeave = useCallback(() => {
      if (hoverTimeoutIdRef.current) {
        clearTimeout(hoverTimeoutIdRef.current);
      }
      hoverTimeoutIdRef.current = setTimeout(() => {
        closeMenu();
      }, 100);
    }, [closeMenu]);

    const handleMenuMouseLeave = useCallback(() => {
      if (hoverTimeoutIdRef.current) {
        clearTimeout(hoverTimeoutIdRef.current);
      }
      hoverTimeoutIdRef.current = setTimeout(() => {
        closeMenu();
      }, 100);
    }, [closeMenu]);

    const handleMouseToggleEvents = useCallback(
      (type) => {
        if (triggerType === 'hover') {
          switch (type) {
            case 'enter':
              handleMouseEnter();
              break;
            case 'leave':
              handleMouseLeave();
              break;
          }
        }
      },
      [triggerType, handleMouseEnter, handleMouseLeave],
    );

    const handleOutsideClick = useCallback(
      (event) => {
        if (!closeOnOutsideClick || !isOpen) return;

        const target = event.target;
        if (
          menuElRef.current &&
          !menuElRef.current.contains(target) &&
          triggerElRef.current &&
          !triggerElRef.current.contains(target) &&
          menuContainerRef.current &&
          !menuContainerRef.current.contains(target)
        ) {
          closeMenu();
        }
      },
      [closeOnOutsideClick, isOpen, closeMenu],
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (closeOnEsc && isOpen && event.key === 'Escape') {
          closeMenu();
        }
      },
      [closeOnEsc, isOpen, closeMenu],
    );

    const handleResize = useCallback(() => {
      if (isOpen) {
        updatePosition();
      }
    }, [isOpen, updatePosition]);

    const handleScroll = useCallback(() => {
      if (isOpen) {
        updatePosition();
      }
    }, [isOpen, updatePosition]);

    const getMenuTriggerId = useCallback(() => {
      return menuId ? `${menuId}Trigger` : undefined;
    }, [menuId]);

    const getMenuContentId = useCallback(() => {
      return menuId ? `${menuId}Content` : undefined;
    }, [menuId]);

    // Lifecycle
    useEffect(() => {
      document.addEventListener('click', handleOutsideClick, true);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        document.removeEventListener('click', handleOutsideClick, true);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
        clearHoverTimeout();
      };
    }, [handleOutsideClick, handleKeyDown, handleResize, handleScroll, clearHoverTimeout]);

    // Watch for placement changes
    useEffect(() => {
      if (isOpen) {
        updatePosition();
      }
    }, [placement, isOpen, updatePosition]);

    useImperativeHandle(
      ref,
      () => ({
        isOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        actualPlacement,
      }),
      [isOpen, openMenu, closeMenu, toggleMenu, actualPlacement],
    );

    const menuStyle = useMemo(() => {
      const style = {
        position: 'absolute',
        width: menuPosition.width,
        zIndex: 1000,
      };

      if (fixedY && fixedY.trim()) {
        style.top = fixedY;
      } else {
        style.top = menuPosition.top;
      }

      if (fixedX && fixedX.trim()) {
        style.left = fixedX;
      } else {
        style.left = menuPosition.left;
      }

      return style;
    }, [menuPosition, fixedX, fixedY]);

    const containerClass = useMemo(() => ['custom-menu-container', className].filter(Boolean).join(' '), [className]);

    const menuContentClassName = useMemo(() => {
      const classes = ['menu-content'];
      
      if (transitionState === 'entering') {
        classes.push('menu-fade-enter-active', 'menu-fade-enter-from');
      } else if (transitionState === 'leaving') {
        classes.push('menu-fade-leave-active', 'menu-fade-leave-to');
      }
      
      if (Array.isArray(menuContentClass)) {
        classes.push(...menuContentClass.filter(Boolean));
      } else if (menuContentClass) {
        classes.push(menuContentClass);
      }
      return classes.join(' ');
    }, [transitionState, menuContentClass]);

    // Support both slot-based API (children function) and direct children
    const renderTrigger = useCallback(() => {
      if (typeof children === 'function') {
        const triggerSlot = children({ name: 'trigger', isOpen });
        if (triggerSlot) return triggerSlot;
      }
      return trigger || children;
    }, [children, trigger, isOpen]);

    const renderContent = useCallback(() => {
      if (typeof children === 'function') {
        const contentSlot = children({ name: 'content' });
        if (contentSlot) return contentSlot;
      }
      // If children is not a function, it's the content
      if (trigger) {
        return children;
      }
      return children;
    }, [children, trigger]);

    return (
      <div className={containerClass} ref={menuContainerRef}>
        <div
          ref={triggerElRef}
          className="menu-trigger-element"
          id={getMenuTriggerId()}
          onClick={handleTriggerClick}
          onMouseEnter={() => handleMouseToggleEvents('enter')}
          onMouseLeave={() => handleMouseToggleEvents('leave')}
        >
          {renderTrigger()}
        </div>

        {typeof window !== 'undefined' && shouldRender
          ? createPortal(
              <div
                ref={menuElRef}
                className={menuContentClassName}
                id={getMenuContentId()}
                style={menuStyle}
                onMouseEnter={triggerType === 'hover' ? clearHoverTimeout : null}
                onMouseLeave={triggerType === 'hover' ? handleMenuMouseLeave : null}
                onClick={(e) => e.stopPropagation()}
              >
                {renderContent()}
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  }),
);

BasicMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  trigger: PropTypes.node,
  triggerType: PropTypes.oneOf(TRIGGER_TYPES),
  placement: PropTypes.oneOf(PLACEMENT_CLASSES),
  offset: PropTypes.arrayOf(PropTypes.number),
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  matchTriggerWidth: PropTypes.bool,
  menuContentClass: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  disabled: PropTypes.bool,
  fixedX: PropTypes.string,
  fixedY: PropTypes.string,
  menuId: PropTypes.string,
  stopPropagation: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

BasicMenu.displayName = 'BasicMenu';

export default BasicMenu;
