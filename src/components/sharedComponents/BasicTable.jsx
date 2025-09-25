import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const BasicTable = ({
  headers = [],
  tableData = [],
  enableHover = true,
  enableInfiniteScroll = true,
  enablePagination = false,
  itemsPerPage = 10,
  currentPage = 1,
  totalItems = 0,
  async = false,
  isAlternateRowColored = false,
  defaultCellWidth = "1fr",
  isAlternateColumnColored = false,
  onCellClicked,
  onScrolledToEndInTable,
  onTableCellKeyDown,
  onTableCellBlur,
  onSort,
  onPageChange,
  className = '',
  ...props
}) => {
  // Internal state for sorting
  const [sortState, setSortState] = useState({
    key: null,
    direction: 'asc'
  });

  // Computed properties for sorting and pagination
  const sortedData = useMemo(() => {
    if (!sortState.key || async) {
      return tableData;
    }

    return [...tableData].sort((a, b) => {
      let aValue = a[sortState.key];
      let bValue = b[sortState.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';

      // Check if both values are numbers (including string numbers)
      const aIsNumber = !isNaN(aValue) && aValue !== '';
      const bIsNumber = !isNaN(bValue) && bValue !== '';

      if (aIsNumber && bIsNumber) {
        // Numerical comparison
        return sortState.direction === 'asc' 
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      } else {
        // String comparison (case-insensitive)
        const comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
        return sortState.direction === 'asc' ? comparison : -comparison;
      }
    });
  }, [tableData, sortState, async]);

  const paginatedData = useMemo(() => {
    if (!enablePagination || async) {
      return sortedData;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, enablePagination, async, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    if (!enablePagination) return 1;
    return Math.ceil(totalItems / itemsPerPage);
  }, [enablePagination, totalItems, itemsPerPage]);

  const gridTemplate = useMemo(() => 
    headers.map(h => h.width || defaultCellWidth).join(" "),
    [headers, defaultCellWidth]
  );

  // Methods for handling sorting and pagination
  const handleSort = useCallback((header) => {
    if (!header.sortable) return;

    if (async) {
      let direction = sortState.key === header.key && sortState.direction === 'asc' ? 'desc' : 'asc';
      onSort?.({
        key: header.key,
        direction,
      });
      setSortState({ key: header.key, direction });
      return;
    }

    if (sortState.key === header.key) {
      setSortState(prev => ({
        ...prev,
        direction: prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setSortState({
        key: header.key,
        direction: 'asc'
      });
    }
  }, [sortState, async, onSort]);

  const handlePageChange = useCallback((page) => {
    onPageChange?.(page);
  }, [onPageChange]);

  /**
   * Handles cell click events and emits data
   */
  const tableCellClicked = useCallback((data, cell) => {
    onCellClicked?.(data, cell);
  }, [onCellClicked]);

  /**
   * Handles reaching the end of the table for infinite scroll
   */
  const handleLoadMoreData = useCallback(() => {
    onScrolledToEndInTable?.();
  }, [onScrolledToEndInTable]);

  /**
   * Handles keydown events on table cells
   */
  const handleTableCellKeyDown = useCallback((event, rowData, cell) => {
    onTableCellKeyDown?.(event, rowData, cell);
  }, [onTableCellKeyDown]);

  /**
   * Handles blur events on table cells
   */
  const handleTableCellBlur = useCallback((event, rowData, cell) => {
    onTableCellBlur?.(rowData, cell);
  }, [onTableCellBlur]);

  const copyValue = useCallback((rowData, cell) => {
    navigator.clipboard.writeText(rowData[cell.key]);
  }, []);

  // Sort icon component
  const SortIcon = ({ header }) => {
    if (!header.sortable) return null;

    if (sortState.key !== header.key) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
        </svg>
      );
    }

    if (sortState.direction === 'asc') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 15l5 5 5-5"/>
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 9l5-5 5 5"/>
      </svg>
    );
  };

  return (
    <div className={`table-wrapper ${className}`} {...props}>
      <div className="table-container">
        <div className="table-body">
          {/* Header Row */}
          <div className="table-body-row table-header" style={{ gridTemplateColumns: gridTemplate }}>
            {headers.map((header, index) => (
              <div
                key={index}
                className={`table-header-cell ${header.headerClasses || ''} ${
                  header.sortable ? 'sortable' : ''
                } ${
                  sortState.key === header.key && sortState.direction === 'asc' ? 'sorted-asc' : ''
                } ${
                  sortState.key === header.key && sortState.direction === 'desc' ? 'sorted-desc' : ''
                }`}
                onClick={() => header.sortable && handleSort(header)}
              >
                <div className="header-content">
                  {header.text}
                  <span className="sort-icon">
                    <SortIcon header={header} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {paginatedData.map((rowData, rowIndex) => (
            <div
              key={rowIndex}
              className={`table-body-row ${
                enableHover ? 'hover-enabled' : ''
              } ${
                isAlternateRowColored ? 'alternate-row-colored' : ''
              } ${
                isAlternateColumnColored ? 'alternate-column-colored' : ''
              }`}
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {headers.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`table-body-cell ${cell.classes || ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    tableCellClicked(rowData, cell);
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => handleTableCellKeyDown(e, rowData, cell)}
                  onBlur={(e) => handleTableCellBlur(e, rowData, cell)}
                >
                  <div className={`cell-content ${cell.enableCopy ? 'copy-enabled' : ''}`}>
                    <div className="cell-content-text">
                      {cell.domFunc
                        ? cell.domFunc(rowData[cell.key] !== undefined ? rowData[cell.key] : "-")
                        : rowData[cell.key]
                      }
                    </div>
                    {cell.enableCopy && (
                      <svg
                        onClick={(e) => {
                          e.stopPropagation();
                          copyValue(rowData, cell);
                        }}
                        className="copy-icon"
                        fill="#555"
                        viewBox="0 0 36 36"
                        version="1.1"
                        preserveAspectRatio="xMidYMid meet"
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
                            d="M27,3.56A1.56,1.56,0,0,0,25.43,2H5.57A1.56,1.56,0,0,0,4,3.56V28.44A1.56,1.56,0,0,0,5.57,30h.52V4.07H27Z"
                            className="clr-i-solid clr-i-solid-path-1"
                          ></path>
                          <rect
                            x="8"
                            y="6"
                            width="23"
                            height="28"
                            rx="1.5"
                            ry="1.5"
                            className="clr-i-solid clr-i-solid-path-2"
                          ></rect>
                          <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

BasicTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    classes: PropTypes.string,
    headerClasses: PropTypes.string,
    sortable: PropTypes.bool,
    width: PropTypes.string,
    enableCopy: PropTypes.bool,
    domFunc: PropTypes.func
  })).isRequired,
  tableData: PropTypes.array.isRequired,
  enableHover: PropTypes.bool,
  enableInfiniteScroll: PropTypes.bool,
  enablePagination: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  async: PropTypes.bool,
  isAlternateRowColored: PropTypes.bool,
  defaultCellWidth: PropTypes.string,
  isAlternateColumnColored: PropTypes.bool,
  onCellClicked: PropTypes.func,
  onScrolledToEndInTable: PropTypes.func,
  onTableCellKeyDown: PropTypes.func,
  onTableCellBlur: PropTypes.func,
  onSort: PropTypes.func,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

export default BasicTable;
