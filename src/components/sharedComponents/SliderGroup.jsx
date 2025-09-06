import React, { useMemo, useCallback, memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SliderGroup = memo(
  ({
    arrowsPosition = 'bottom',
    showArrowsAlways = true,
    showDots = true,
    items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    canSelectCard = true,
    selectedCard: initialSelectedCard = -1,
    cardWidth = 20,
    className = '',
    style = {},
    onCardClick,
    children,
    ...props
  }) => {
    // =============================================================================
    // REFS AND STATE
    // =============================================================================
    const sliderContainerRef = useRef(null);
    const [currentDot, setCurrentDot] = useState(1);
    const [selectedCard, setSelectedCard] = useState(initialSelectedCard);
    const [totalDots, setTotalDots] = useState(0);

    // =============================================================================
    // COMPUTED VALUES (using useMemo)
    // =============================================================================
    const disablePrevBtn = useMemo(() => {
      return currentDot === 1;
    }, [currentDot]);

    const disableNextBtn = useMemo(() => {
      return currentDot === totalDots;
    }, [currentDot, totalDots]);

    // =============================================================================
    // FUNCTIONS
    // =============================================================================
    const calculateTotalDots = useCallback(() => {
      if (!sliderContainerRef.current) return 0;

      const containerWidth = sliderContainerRef.current.clientWidth;
      const totalWidth = sliderContainerRef.current.scrollWidth;

      // Calculate how many full container widths we can fit
      const dots = Math.ceil(totalWidth / containerWidth);
      setTotalDots(dots);
      return dots;
    }, []);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleDotClick = useCallback((dot) => {
      setCurrentDot(dot);
      if (sliderContainerRef.current) {
        sliderContainerRef.current.scrollLeft = (dot - 1) * sliderContainerRef.current.clientWidth;
      }
    }, []);

    const handlePrevBtnClick = useCallback(() => {
      if (disablePrevBtn) return;
      handleDotClick(currentDot - 1);
    }, [disablePrevBtn, currentDot, handleDotClick]);

    const handleNextBtnClick = useCallback(() => {
      if (disableNextBtn) return;
      handleDotClick(currentDot + 1);
    }, [disableNextBtn, currentDot, handleDotClick]);

    const handleCardClick = useCallback((index) => {
      const itemIndex = index - 1;
      onCardClick?.(items[itemIndex]);
      
      const totalCards = items.length;

      if (canSelectCard) {
        setSelectedCard(index);
      }

      // Handle edge cases
      if (index === 1) {
        setCurrentDot(1);
        if (sliderContainerRef.current) {
          sliderContainerRef.current.scrollLeft = 0;
        }
      } else if (index === totalCards) {
        setCurrentDot(totalDots);
        if (sliderContainerRef.current) {
          const cardWidth = sliderContainerRef.current.scrollWidth / totalCards;
          const targetScroll = (totalCards - 1) * cardWidth - 
            sliderContainerRef.current.clientWidth / 2 + 
            cardWidth / 2;
          sliderContainerRef.current.scrollLeft = Math.max(0, targetScroll);
        }
      } else {
        // Handle middle cases
        const cardsPerDot = Math.ceil(totalCards / totalDots);
        const targetDot = Math.ceil(index / cardsPerDot);
        setCurrentDot(targetDot);
        if (sliderContainerRef.current) {
          const cardWidth = sliderContainerRef.current.scrollWidth / totalCards;
          const targetScroll = (index - 1) * cardWidth - 
            sliderContainerRef.current.clientWidth / 2 + 
            cardWidth / 2;
          sliderContainerRef.current.scrollLeft = Math.max(0, targetScroll);
        }
      }
    }, [items, onCardClick, canSelectCard, totalDots]);

    const handleResize = useCallback(() => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current.scrollLeft = 0;
      }
      setCurrentDot(1);
      calculateTotalDots();
    }, [calculateTotalDots]);

    // =============================================================================
    // EFFECTS
    // =============================================================================
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    // =============================================================================
    // COMPUTED STYLES
    // =============================================================================
    const containerClass = useMemo(() => {
      const classes = ['slider-group-container', arrowsPosition];
      
      if (showArrowsAlways) {
        classes.push('show-arrows-always');
      }
      
      if (className) {
        classes.push(className);
      }
      
      return classes.join(' ');
    }, [arrowsPosition, showArrowsAlways, className]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderArrowButton = useCallback((direction, onClick, disabled) => {
      const isPrev = direction === 'prev';
      const buttonClass = `${isPrev ? 'prev' : 'next'}-slider-btn`;
      
      return (
        <svg
          className={`${buttonClass} ${disabled ? 'disabled' : ''}`}
          onClick={onClick}
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d={isPrev 
                ? "M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                : "M7.82051 3.26875C8.21103 2.87823 8.84419 2.87823 9.23472 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.8801 14.155L9.30966 20.7304C8.91914 21.121 8.28598 21.121 7.89546 20.7304C7.50493 20.3399 7.50493 19.7067 7.89546 19.3162L14.4675 12.7442C14.858 12.3536 14.858 11.7205 14.4675 11.33L7.82051 4.68297C7.43 4.29244 7.43 3.65928 7.82051 3.26875Z"
              }
              fill="#0F0F0F"
            ></path>
          </g>
        </svg>
      );
    }, []);

    const renderDots = useCallback(() => {
      if (!showDots) return null;

      return (
        <div className="slider-group-dots">
          {Array.from({ length: totalDots }, (_, index) => {
            const dot = index + 1;
            return (
              <div
                key={dot}
                className={`slider-group-dot ${currentDot === dot ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDotClick(dot);
                }}
              />
            );
          })}
        </div>
      );
    }, [showDots, totalDots, currentDot, handleDotClick]);

    const renderArrows = useCallback((position) => {
      if (position === 'top') {
        return (
          <div className="slider-group-arrows slider-group-arrows-top">
            {renderArrowButton('prev', handlePrevBtnClick, disablePrevBtn)}
            {renderDots()}
            {renderArrowButton('next', handleNextBtnClick, disableNextBtn)}
          </div>
        );
      }

      if (position === 'center') {
        return (
          <div className="slider-group-arrows slider-group-arrows-center">
            {renderArrowButton('prev', handlePrevBtnClick, disablePrevBtn)}
            {renderArrowButton('next', handleNextBtnClick, disableNextBtn)}
          </div>
        );
      }

      // bottom (default)
      return (
        <div className="slider-group-arrows slider-group-arrows-bottom">
          {renderArrowButton('prev', handlePrevBtnClick, disablePrevBtn)}
          {renderDots()}
          {renderArrowButton('next', handleNextBtnClick, disableNextBtn)}
        </div>
      );
    }, [renderArrowButton, handlePrevBtnClick, handleNextBtnClick, disablePrevBtn, disableNextBtn, renderDots]);

    const renderCards = useCallback(() => {
      return (
        <div className="slider-group-items" ref={sliderContainerRef}>
          {items.map((item, index) => {
            const cardIndex = index + 1;
            const isSelected = selectedCard === cardIndex;
            
            return (
              <div
                key={index}
                className={`card ${isSelected ? 'selected' : ''} ${canSelectCard ? 'canSelectCard' : ''}`}
                onClick={() => handleCardClick(cardIndex)}
                style={{ width: `${cardWidth}rem` }}
              >
                {children ? children({ item, index, isSelected }) : cardIndex}
              </div>
            );
          })}
        </div>
      );
    }, [items, selectedCard, canSelectCard, cardWidth, children, handleCardClick]);

    // =============================================================================
    // RENDER
    // =============================================================================
    if (arrowsPosition === 'center-outside') {
      return (
        <div className={containerClass} style={style} {...props}>
          {renderArrowButton('prev', handlePrevBtnClick, disablePrevBtn)}
          {renderCards()}
          {renderArrowButton('next', handleNextBtnClick, disableNextBtn)}
        </div>
      );
    }

    return (
      <div className={containerClass} style={style} {...props}>
        {arrowsPosition === 'top' && renderArrows('top')}
        {arrowsPosition === 'center' && renderArrows('center')}
        
        {renderCards()}
        
        {arrowsPosition === 'bottom' && renderArrows('bottom')}
      </div>
    );
  }
);

// =============================================================================
// PROP TYPES
// =============================================================================
SliderGroup.propTypes = {
  arrowsPosition: PropTypes.oneOf(['top', 'bottom', 'center', 'center-outside']),
  showArrowsAlways: PropTypes.bool,
  showDots: PropTypes.bool,
  items: PropTypes.array,
  canSelectCard: PropTypes.bool,
  selectedCard: PropTypes.number,
  cardWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  onCardClick: PropTypes.func,
  children: PropTypes.func,
};

SliderGroup.displayName = 'SliderGroup';

export default SliderGroup;