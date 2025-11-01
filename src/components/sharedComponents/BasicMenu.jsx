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
  'left-start',
  'left-center',
  'left-end',
  'right-start',
  'right-center',
  'right-end',
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
    case 'left-start':
      top = triggerRect.top + viewport.scrollTop + offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'left-center':
      top = triggerRect.top + viewport.scrollTop + (triggerRect.height - menuRect.height) / 2 + offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'left-end':
      top = triggerRect.bottom + viewport.scrollTop - menuRect.height - offsetY;
      left = triggerRect.left + viewport.scrollLeft - menuRect.width - offsetX;
      break;
    case 'right-start':
      top = triggerRect.top + viewport.scrollTop + offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
      break;
    case 'right-center':
      top = triggerRect.top + viewport.scrollTop + (triggerRect.height - menuRect.height) / 2 + offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
      break;
    case 'right-end':
      top = triggerRect.bottom + viewport.scrollTop - menuRect.height - offsetY;
      left = triggerRect.right + viewport.scrollLeft + offsetX;
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

  if (left < viewport.scrollLeft) {
    left = viewport.scrollLeft + 8;
  } else if (left + menuRect.width > viewport.scrollLeft + viewport.width) {
    left = viewport.scrollLeft + viewport.width - menuRect.width - 8;
  }

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
      trigger,
      children,
      triggerType = 'click',
      placement = 'bottom',
      offset = [0, 0.125],
      closeOnOutsideClick = true,
      closeOnEsc = true,
      width = null,
      matchTriggerWidth = true,
      className = '',
      onOpen,
      onClose,
    },
    ref
  ) {
    const menuContainerRef = useRef(null);
    const triggerElRef = useRef(null);
    const menuElRef = useRef(null);
    const hoverTimeoutIdRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: '0px', left: '0px', width: 'auto' });
    const [actualPlacement, setActualPlacement] = useState(placement);

    useEffect(() => {
      setActualPlacement(placement);
    }, [placement]);

    const clearHoverTimeout = useCallback(() => {
      if (hoverTimeoutIdRef.current) {
        clearTimeout(hoverTimeoutIdRef.current);
        hoverTimeoutIdRef.current = null;
      }
    }, []);

    const calculatePosition = useCallback(() => {
      if (!triggerElRef.current || !menuElRef.current) {
        return { top: '0px', left: '0px', width: 'auto', flippedPlacement: placement };
      }

      const triggerRect = triggerElRef.current.getBoundingClientRect();
      const menuRect = menuElRef.current.getBoundingClientRect();
      const viewport = getViewportBounds();

      const offsetX = remToPixels(offset[0]);
      const offsetY = remToPixels(offset[1]);

      let calculatedWidth = 'auto';
      if (width) {
        calculatedWidth = typeof width === 'number' ? `${width}px` : width;
      } else if (matchTriggerWidth) {
        calculatedWidth = `${triggerRect.width}px`;
      }

      let position = calculateInitialPosition(triggerRect, menuRect, placement, offsetX, offsetY, viewport);

      const collisions = detectCollisions(position, menuRect);
      const flippedPlacement = getFlippedPlacement(placement, collisions);

      if (flippedPlacement !== placement) {
        position = calculateInitialPosition(triggerRect, menuRect, flippedPlacement, offsetX, offsetY, viewport);
      }

      position = adjustForViewportBounds(position, menuRect, viewport);

      return {
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: calculatedWidth,
        flippedPlacement,
      };
    }, [placement, offset, matchTriggerWidth, width]);

    const updatePosition = useCallback(() => {
      if (menuElRef.current && isOpen && triggerElRef.current) {
        const newPosition = calculatePosition();
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
        // Update actual placement only if it changed
        setActualPlacement(prev => (prev !== newPosition.flippedPlacement ? newPosition.flippedPlacement : prev));
      }
    }, [isOpen, calculatePosition]);

    const openMenu = useCallback(() => {
      if (isOpen) return;
      setIsOpen(true);
      onOpen?.();
      // Position will be updated by useEffect when isOpen changes
    }, [isOpen, onOpen]);

    const closeMenu = useCallback(() => {
      if (!isOpen) return;
      setIsOpen(false);
      onClose?.();
    }, [isOpen, onClose]);

    const toggleMenu = useCallback(() => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }, [isOpen, openMenu, closeMenu]);

    const handleTriggerClick = useCallback(
      event => {
        event.preventDefault();
        event.stopPropagation();
        if (triggerType === 'click') {
          toggleMenu();
        }
      },
      [triggerType, toggleMenu]
    );

    const handleMouseEnter = useCallback(() => {
      if (triggerType === 'hover') {
        clearHoverTimeout();
        openMenu();
      }
    }, [triggerType, clearHoverTimeout, openMenu]);

    const handleMouseLeave = useCallback(() => {
      if (triggerType === 'hover') {
        if (hoverTimeoutIdRef.current) {
          clearTimeout(hoverTimeoutIdRef.current);
        }
        hoverTimeoutIdRef.current = setTimeout(() => {
          closeMenu();
        }, 100);
      }
    }, [triggerType, closeMenu]);

    const handleMenuMouseLeave = useCallback(() => {
      if (triggerType === 'hover') {
        if (hoverTimeoutIdRef.current) {
          clearTimeout(hoverTimeoutIdRef.current);
        }
        hoverTimeoutIdRef.current = setTimeout(() => {
          closeMenu();
        }, 100);
      }
    }, [triggerType, closeMenu]);

    const handleOutsideClick = useCallback(
      event => {
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
      [closeOnOutsideClick, isOpen, closeMenu]
    );

    const handleKeyDown = useCallback(
      event => {
        if (closeOnEsc && isOpen && event.key === 'Escape') {
          closeMenu();
        }
      },
      [closeOnEsc, isOpen, closeMenu]
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

    useEffect(() => {
      if (isOpen) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          updatePosition();
        });
      }
    }, [isOpen, placement, updatePosition]);

    useImperativeHandle(
      ref,
      () => ({
        isOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        actualPlacement,
      }),
      [isOpen, openMenu, closeMenu, toggleMenu, actualPlacement]
    );

    const menuStyle = useMemo(
      () => ({
        position: 'absolute',
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 1000,
        visibility: isOpen ? 'visible' : 'hidden',
      }),
      [menuPosition, isOpen]
    );

    const containerClass = useMemo(() => ['custom-menu-container', className].filter(Boolean).join(' '), [className]);

    return (
      <div className={containerClass} ref={menuContainerRef}>
        <div
          ref={triggerElRef}
          onClick={handleTriggerClick}
          onMouseEnter={triggerType === 'hover' ? handleMouseEnter : null}
          onMouseLeave={triggerType === 'hover' ? handleMouseLeave : null}
        >
          {trigger}
        </div>

        {typeof window !== 'undefined'
          ? createPortal(
              <div
                className={`menu-content ${isOpen ? 'menu-content-open' : ''}`}
                ref={menuElRef}
                style={menuStyle}
                onMouseEnter={triggerType === 'hover' ? clearHoverTimeout : null}
                onMouseLeave={triggerType === 'hover' ? handleMenuMouseLeave : null}
                onClick={e => e.stopPropagation()}
              >
                {children}
              </div>,
              document.body
            )
          : null}
      </div>
    );
  })
);

BasicMenu.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  triggerType: PropTypes.oneOf(TRIGGER_TYPES),
  placement: PropTypes.oneOf(PLACEMENT_CLASSES),
  offset: PropTypes.arrayOf(PropTypes.number),
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  matchTriggerWidth: PropTypes.bool,
  className: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

BasicMenu.displayName = 'BasicMenu';

export default BasicMenu;
