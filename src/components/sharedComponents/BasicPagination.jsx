import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const BasicPagination = ({
  currentPage = 1,
  totalPages,
  totalVisible = 7,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  size = 'default',
  rounded = false,
  color = 'primary',
  onPageChange,
  onFirst,
  onPrev,
  onNext,
  onLast,
  className = '',
  ...props
}) => {
  // Default icon components
  const defaultFirstIcon = useCallback(() => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z" />
    </svg>
  ), []);

  const defaultPrevIcon = useCallback(() => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M15.41,16.58L10.83,12L15.41,7.42L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
  ), []);

  const defaultNextIcon = useCallback(() => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M8.59,16.58L13.17,12L8.59,7.42L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  ), []);

  const defaultLastIcon = useCallback(() => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z" />
    </svg>
  ), []);

  // Computed properties for button states
  const isFirstDisabled = useMemo(() => disabled || currentPage <= 1, [disabled, currentPage]);
  const isPrevDisabled = useMemo(() => disabled || currentPage <= 1, [disabled, currentPage]);
  const isNextDisabled = useMemo(() => disabled || currentPage >= totalPages, [disabled, currentPage, totalPages]);
  const isLastDisabled = useMemo(() => disabled || currentPage >= totalPages, [disabled, currentPage, totalPages]);

  // Generate visible page numbers with ellipsis
  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= totalVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(totalVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + totalVisible - 1);

    // Adjust if we're near the beginning
    if (end - start + 1 < totalVisible) {
      start = Math.max(1, end - totalVisible + 1);
    }

    const pages = [];

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, totalVisible, currentPage]);

  // CSS classes
  const paginationClasses = useMemo(() => {
    const classes = ['pagination'];
    if (size !== 'default') classes.push(`pagination--${size}`);
    if (disabled) classes.push('pagination--disabled');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [size, disabled, className]);

  const getButtonClasses = useCallback((active = false) => {
    const classes = ['pagination-button'];
    if (size !== 'default') classes.push(`pagination-button--${size}`);
    if (active) classes.push(`pagination-button--${color}`, 'pagination-button--active');
    if (disabled) classes.push('pagination-button--disabled');
    if (rounded) classes.push('pagination-button--rounded');
    return classes.join(' ');
  }, [size, color, disabled, rounded]);

  const getPageButtonClasses = useCallback((page) => getButtonClasses(page === currentPage), [getButtonClasses, currentPage]);

  // Event handlers
  const handleFirstClick = useCallback((e) => {
    if (isFirstDisabled) return;
    onFirst?.(1);
    onPageChange?.(1);
  }, [isFirstDisabled, onFirst, onPageChange]);

  const handlePrevClick = useCallback((e) => {
    if (isPrevDisabled) return;
    const prevPage = currentPage - 1;
    onPrev?.(prevPage);
    onPageChange?.(prevPage);
  }, [isPrevDisabled, currentPage, onPrev, onPageChange]);

  const handleNextClick = useCallback((e) => {
    if (isNextDisabled) return;
    const nextPage = currentPage + 1;
    onNext?.(nextPage);
    onPageChange?.(nextPage);
  }, [isNextDisabled, currentPage, onNext, onPageChange]);

  const handleLastClick = useCallback((e) => {
    if (isLastDisabled) return;
    onLast?.(totalPages);
    onPageChange?.(totalPages);
  }, [isLastDisabled, totalPages, onLast, onPageChange]);

  const handlePageClick = useCallback((page) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange?.(page);
  }, [disabled, totalPages, currentPage, onPageChange]);

  // Don't render if no pages
  if (totalPages <= 0) {
    return null;
  }

  return (
    <nav className={paginationClasses} {...props}>
      {/* First page button */}
      {showFirstLast && totalPages > 0 && (
        <button
          className={`pagination-button pagination-button--icon ${getButtonClasses()}`}
          disabled={isFirstDisabled}
          aria-label="Go to first page"
          aria-disabled={isFirstDisabled}
          onClick={handleFirstClick}
          type="button"
        >
          {defaultFirstIcon()}
        </button>
      )}

      {/* Previous page button */}
      {showPrevNext && (
        <button
          className={`pagination-button pagination-button--icon ${getButtonClasses()}`}
          disabled={isPrevDisabled}
          aria-label="Go to previous page"
          aria-disabled={isPrevDisabled}
          onClick={handlePrevClick}
          type="button"
        >
          {defaultPrevIcon()}
        </button>
      )}

      {/* Page numbers */}
      {visiblePageNumbers.map((pageItem, pageIndex) => (
        <React.Fragment key={`pagination-item-${pageIndex}`}>
          {/* Ellipsis */}
          {pageItem === '...' ? (
            <span className="pagination-ellipsis">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
              </svg>
            </span>
          ) : (
            /* Page number button */
            <button
              className={`pagination-button pagination-button--page ${getPageButtonClasses(pageItem)}`}
              aria-label={`Go to page ${pageItem}`}
              aria-current={pageItem === currentPage ? 'page' : undefined}
              onClick={() => handlePageClick(pageItem)}
              type="button"
            >
              {pageItem}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next page button */}
      {showPrevNext && (
        <button
          className={`pagination-button pagination-button--icon ${getButtonClasses()}`}
          disabled={isNextDisabled}
          aria-label="Go to next page"
          aria-disabled={isNextDisabled}
          onClick={handleNextClick}
          type="button"
        >
          {defaultNextIcon()}
        </button>
      )}

      {/* Last page button */}
      {showFirstLast && totalPages > 0 && (
        <button
          className={`pagination-button pagination-button--icon ${getButtonClasses()}`}
          disabled={isLastDisabled}
          aria-label="Go to last page"
          aria-disabled={isLastDisabled}
          onClick={handleLastClick}
          type="button"
        >
          {defaultLastIcon()}
        </button>
      )}
    </nav>
  );
};

BasicPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  totalVisible: PropTypes.number,
  showFirstLast: PropTypes.bool,
  showPrevNext: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  rounded: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary']),
  onPageChange: PropTypes.func,
  onFirst: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onLast: PropTypes.func,
  className: PropTypes.string,
};

export default BasicPagination;
