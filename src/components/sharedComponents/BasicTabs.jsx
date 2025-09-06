import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const BasicTabs = ({
  tabItems = [],
  selected = null,
  multiple = false,
  isLabeli18String = true,
  singlePacked = false,
  tabClasses = [],
  bottomLineStyle = false,
  onItemClicked,
  children,
  ...props
}) => {
  const [internalSelected, setInternalSelected] = useState(selected);
  const tabsContainerRef = useRef(null);
  const bottomLineRef = useRef(null);

  // Sync internal state with prop changes
  useEffect(() => {
    setInternalSelected(selected);
  }, [selected]);

  // Convert pixels to rem utility function
  const convertPixelsToRem = useCallback((pixels) => {
    return pixels / 16; // Assuming 16px = 1rem
  }, []);

  // Handle tab item click
  const handleTabItemClick = useCallback((item) => {
    if (onItemClicked) {
      onItemClicked(item);
    }
    
    if (bottomLineStyle) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        updateBottomLinePosition();
      }, 0);
    }
  }, [onItemClicked, bottomLineStyle]);

  // Update bottom line position
  const updateBottomLinePosition = useCallback(() => {
    if (!bottomLineStyle || !tabsContainerRef.current || !bottomLineRef.current) return;
    
    const selectedTab = tabsContainerRef.current.querySelector('.tab.selected');
    if (selectedTab) {
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const tabRect = selectedTab.getBoundingClientRect();
      const offsetLeft = tabRect.left - containerRect.left;
      const width = tabRect.width;
      
      bottomLineRef.current.style.transform = `translateX(${convertPixelsToRem(offsetLeft)}rem)`;
      bottomLineRef.current.style.width = `${convertPixelsToRem(width)}rem`;
    }
  }, [bottomLineStyle, convertPixelsToRem]);

  // Update bottom line on mount and when selected changes
  useEffect(() => {
    if (bottomLineStyle) {
      setTimeout(() => {
        updateBottomLinePosition();
      }, 0);
    }
  }, [bottomLineStyle, updateBottomLinePosition, internalSelected]);

  // Check if tab is selected
  const isTabSelected = useCallback((item) => {
    if (multiple) {
      return Array.isArray(internalSelected) && internalSelected.includes(item.value);
    }
    return internalSelected === item.value;
  }, [multiple, internalSelected]);

  // Render prepend slot
  const renderPrepend = useCallback((item) => {
    if (children && typeof children === 'function') {
      const prependSlot = children({ name: 'prepend', item });
      if (prependSlot) return prependSlot;
    }
    
    if (item && item.prepend) {
      return <div className="prepend-icon" dangerouslySetInnerHTML={{ __html: item.prepend }} />;
    }
    return null;
  }, [children]);

  // Render tab content
  const renderTabContent = useCallback((item) => {
    if (children && typeof children === 'function') {
      const tabIconSlot = children({ name: 'tab-icon', item });
      if (tabIconSlot) return tabIconSlot;
    }
    
    if (isLabeli18String && item.name) {
      // In a real app, you'd use i18n here: return t(item.name);
      return item.name;
    } else if (item.name) {
      return item.name;
    } else if (item.icon) {
      return <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />;
    }
    return null;
  }, [children, isLabeli18String]);

  // Render append slot
  const renderAppend = useCallback((item) => {
    if (children && typeof children === 'function') {
      const appendSlot = children({ name: 'append', item });
      if (appendSlot) return appendSlot;
    }
    
    if (item && item.append) {
      return <div className="append-icon" dangerouslySetInnerHTML={{ __html: item.append }} />;
    }
    return null;
  }, [children]);

  // Container classes
  const containerClasses = useMemo(() => {
    const classes = ['overflow-container'];
    
    if (singlePacked) classes.push('single-packed');
    if (bottomLineStyle) classes.push('bottom-line-style');
    
    return [...classes, ...tabClasses].join(' ');
  }, [singlePacked, bottomLineStyle, tabClasses]);

  return (
    <div className="basic-tabs-wrapper" {...props}>
      <div ref={tabsContainerRef} className={containerClasses}>
        {tabItems.map((item) => (
          <div
            key={item.value}
            className={`tab ${isTabSelected(item) ? 'selected' : ''}`}
            onClick={() => handleTabItemClick(item)}
          >
            {renderPrepend(item)}
            {renderTabContent(item)}
            {renderAppend(item)}
          </div>
        ))}
        
        {/* Moving bottom line for bottomLineStyle */}
        {bottomLineStyle && (
          <div className="bottom-line-container">
            <div ref={bottomLineRef} className="bottom-line" />
          </div>
        )}
      </div>
    </div>
  );
};

BasicTabs.propTypes = {
  tabItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    icon: PropTypes.string,
    prepend: PropTypes.string,
    append: PropTypes.string,
  })),
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  multiple: PropTypes.bool,
  isLabeli18String: PropTypes.bool,
  singlePacked: PropTypes.bool,
  tabClasses: PropTypes.arrayOf(PropTypes.string),
  bottomLineStyle: PropTypes.bool,
  onItemClicked: PropTypes.func,
  children: PropTypes.func, // For slot-like functionality
};

export default BasicTabs;
