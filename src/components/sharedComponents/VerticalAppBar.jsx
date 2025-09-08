import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const VerticalAppBar = ({
  width = '20rem',
  height = '100%',
  elevation = true,
  floating = true,
  sticky = true,
  logo = '',
  roundedLogo = false,
  title = '',
  showCloseButton = true,
  prependHeight = '4rem',
  navigationLogoSize = '2.5rem',
  logoSize = '2.5rem',
  titleColor = '#111',
  backgroundColor = '#f2f2f2',
  modelValue = false,
  persistIconsOnHide = true,
  expandOnHover = false,
  expandOnClick = true,
  overlay = true,
  position = 'left',
  transitionDuration = '0.3s',
  items = [],
  activeItem = '',
  showChevron = true,
  multiExpand = true,
  // Render props (optional). If not provided, sensible defaults are rendered
  prepend,
  content,
  append,
  // Event callbacks
  onLogoClick,
  onCloseClick,
  onTitleClick,
  onModelValueChange,
  onActiveItemChange,
  className = '',
  style = {},
  ...rest
}) => {
  // =============================================================================
  // STATE
  // =============================================================================
  const [expandedItems, setExpandedItems] = useState([]);

  // =============================================================================
  // HANDLERS
  // =============================================================================
  const handleLogoClick = useCallback(() => {
    onLogoClick?.();
  }, [onLogoClick]);

  const handleCloseClick = useCallback(() => {
    onModelValueChange?.(false);
    onCloseClick?.();
  }, [onModelValueChange, onCloseClick]);

  const handleTitleClick = useCallback(() => {
    onTitleClick?.();
  }, [onTitleClick]);

  const handleExpandClick = useCallback(() => {
    if (expandOnClick && !modelValue) onModelValueChange?.(true);
  }, [expandOnClick, modelValue, onModelValueChange]);

  const findParent = useCallback((list, targetValue) => {
    for (const item of list) {
      if (item?.children?.some(child => child?.value === targetValue)) {
        return item;
      }
      if (item?.children?.length > 0) {
        const found = findParent(item.children, targetValue);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const checkExpandIncluded = useCallback((item) => {
    if (expandedItems.includes(item?.value)) return true;
    if (item?.children?.length > 0) {
      return item.children.some(child => checkExpandIncluded(child));
    }
    return false;
  }, [expandedItems]);

  const iterateItems = useMemo(() => {
    const flat = [];

    const iterateFunction = (item, level, parentExpanded) => {
      const isRoot = level === 0;
      const isVisible = isRoot || parentExpanded;

      if (isVisible) {
        flat.push({ ...item, level });

        const isExpanded = checkExpandIncluded(item);
        if (item?.children?.length > 0) {
          item.children.forEach(child => iterateFunction(child, level + 1, isExpanded));
        }
      }
    };

    items.forEach(item => iterateFunction(item, 0, true));
    return flat;
  }, [items, checkExpandIncluded]);

  const checkItemActive = useCallback((item) => {
    if (item?.value === activeItem) return true;
    if (item?.children?.length > 0) {
      return item.children.some(child => checkItemActive(child));
    }
    return false;
  }, [activeItem]);

  const handleItemClick = useCallback((item) => {
    if (item?.children?.length > 0) {
      const index = expandedItems.indexOf(item.value);
      const isExpanded = index !== -1;

      if (multiExpand) {
        if (isExpanded) {
          const next = expandedItems.slice();
          next.splice(index, 1);
          setExpandedItems(next);
        } else {
          setExpandedItems(prev => [...prev, item.value]);
        }
      } else {
        if (item?.level > 1) {
          const parentItem = findParent(items, item.value);
          if (parentItem) {
            setExpandedItems(isExpanded ? [] : [parentItem.value]);
          }
        } else {
          setExpandedItems(isExpanded ? [] : [item.value]);
        }
      }
    } else {
      onActiveItemChange?.(item.value);
    }
  }, [expandedItems, multiExpand, findParent, items, onActiveItemChange]);

  // =============================================================================
  // COMPUTED STYLES/CLASSES
  // =============================================================================
  const positionStyles = useMemo(() => ({
    '--logo-size': logoSize,
    '--width': width,
    '--transition-duration': transitionDuration,
    '--navigation-logo-size': navigationLogoSize,
  }), [logoSize, width, transitionDuration, navigationLogoSize]);

  const containerClasses = useMemo(() => {
    const classes = ['vertical-app-bar'];
    if (elevation) classes.push('elevation');
    if (floating) classes.push('floating');
    if (!modelValue) classes.push('hidePanel');
    if (persistIconsOnHide) classes.push('persistIconsOnHide');
    if (expandOnHover) classes.push('expandOnHover');
    if (position === 'left') classes.push('position-left');
    if (position === 'right') classes.push('position-right');
    if (sticky) classes.push('sticky');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [elevation, floating, modelValue, persistIconsOnHide, expandOnHover, position, sticky, className]);

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================
  const renderLogo = useCallback(() => {
    if (!logo) return null;

    const wrapperStyle = { width: logoSize, height: logoSize };
    const wrapperClass = `logo-wrapper ${roundedLogo ? 'rounded' : ''}`;

    const isInlineSvg = typeof logo === 'string' && logo.trim().startsWith('<svg');

    return (
      <div className={wrapperClass} onClick={handleLogoClick} style={wrapperStyle}>
        {isInlineSvg ? (
          <div className="logo-svg" dangerouslySetInnerHTML={{ __html: logo }} />
        ) : (
          <img src={logo} alt="logo" className="logo-image" />
        )}
      </div>
    );
  }, [logo, logoSize, roundedLogo, handleLogoClick]);

  const renderTitle = useCallback(() => {
    if (!title) return null;
    return (
      <div className="title" style={{ color: titleColor }} onClick={handleTitleClick}>
        {title}
      </div>
    );
  }, [title, titleColor, handleTitleClick]);

  const renderCloseBtn = useCallback(() => {
    if (!showCloseButton) return null;
    return (
      <div className="close-btn" onClick={e => { e.stopPropagation(); handleCloseClick(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="close-icon">
          <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
        </svg>
      </div>
    );
  }, [showCloseButton, handleCloseClick]);

  const renderDefaultPrepend = useCallback(() => {
    return (
      <div className="prepend" style={{ height: prependHeight }}>
        {renderLogo()}
        {renderTitle()}
        {renderCloseBtn()}
      </div>
    );
  }, [prependHeight, renderLogo, renderTitle, renderCloseBtn]);

  const renderItemIcon = useCallback((icon) => {
    if (!icon) return null;
    const isInlineSvg = typeof icon === 'string' && icon.trim().startsWith('<svg');
    return (
      <div className="item-icon-wrapper">
        {isInlineSvg ? (
          <div className="item-icon" dangerouslySetInnerHTML={{ __html: icon }} />
        ) : (
          <img src={icon} alt="icon" className="item-icon" />
        )}
      </div>
    );
  }, []);

  const renderDefaultContent = useCallback(() => {
    return (
      <div className="content">
        {iterateItems.map(item => (
          <div
            key={item?.value ?? item?.label}
            className={`item ${checkItemActive(item) ? 'active' : ''} ${checkExpandIncluded(item) ? 'expanded' : ''} item-${item.level}`}
            style={{ marginLeft: item.level * 1.5 + 'rem' }}
            onClick={e => { e.stopPropagation(); handleItemClick(item); }}
          >
            {renderItemIcon(item.icon)}
            <div className="item-label">{item.label}</div>
            {showChevron && item?.children?.length > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="chevron-icon">
                <path fill="currentColor" d="M12 15.41L16.59 10L18 11.41L12 17.41L6 11.41L7.41 10z" />
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  }, [iterateItems, checkItemActive, checkExpandIncluded, handleItemClick, showChevron, renderItemIcon]);

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <>
      {overlay && modelValue && (
        <div className="vertical-app-bar-overlay" onClick={handleCloseClick} />
      )}

      <div
        className={containerClasses}
        style={{
          height,
          backgroundColor,
          ...positionStyles,
          ...style,
        }}
        onClick={handleExpandClick}
        {...rest}
      >
        {prepend
          ? prepend({ handleLogoClick, handleTitleClick, handleCloseClick })
          : renderDefaultPrepend()}

        {content ? content({ iterateItems, handleItemClick }) : renderDefaultContent()}

        {append ? append() : null}
      </div>
    </>
  );
};

VerticalAppBar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  elevation: PropTypes.bool,
  floating: PropTypes.bool,
  sticky: PropTypes.bool,
  logo: PropTypes.string,
  roundedLogo: PropTypes.bool,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  prependHeight: PropTypes.string,
  navigationLogoSize: PropTypes.string,
  logoSize: PropTypes.string,
  titleColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  modelValue: PropTypes.bool,
  persistIconsOnHide: PropTypes.bool,
  expandOnHover: PropTypes.bool,
  expandOnClick: PropTypes.bool,
  overlay: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  transitionDuration: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  })),
  activeItem: PropTypes.string,
  showChevron: PropTypes.bool,
  multiExpand: PropTypes.bool,
  prepend: PropTypes.func,
  content: PropTypes.func,
  append: PropTypes.func,
  onLogoClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  onTitleClick: PropTypes.func,
  onModelValueChange: PropTypes.func,
  onActiveItemChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default VerticalAppBar;



