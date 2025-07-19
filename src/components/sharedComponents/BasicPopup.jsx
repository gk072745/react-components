import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/components/_basic-popup.scss';

const BasicPopup = memo(({ children, height = 27.75, width = 27.75, onPopupOutsideClick }) => {
  const containerStyle = useMemo(
    () => ({
      height: `${height}rem`,
      width: `${width}rem`,
    }),
    [height, width]
  );

  const handleOutsideClick = useCallback(() => {
    onPopupOutsideClick?.();
  }, [onPopupOutsideClick]);

  const handleContainerClick = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <div className="popup-component-wrapper" onClick={handleOutsideClick}>
      <div className="popup-component-container" style={containerStyle} onClick={handleContainerClick}>
        {children}
      </div>
    </div>
  );
});

BasicPopup.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
  onPopupOutsideClick: PropTypes.func,
};

export default BasicPopup;
