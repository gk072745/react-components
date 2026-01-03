import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ScrollObserver from './ScrollObserver';
import BasicMenu from './BasicMenu';
import BasicCheckbox from './BasicCheckbox';
import { useDeepCompareEffect } from 'use-deep-compare';

/**
 * BasicTable - A clean and reliable table component with horizontal/vertical scrolling
 */
const BasicTable = ({
  headers = [],
  tableData = [],
  enableHover = true,
  enableInfiniteScroll = true,
  defaultCellWidth = '1fr',
  async = false,
  sort: externalSort = null,
  filters: externalFilters = {},
  allowSelect = false,
  selected: externalSelected = [],
  rowKey = '_id',
  onCellClicked,
  onScrolledToEndInTable,
  onSort,
  onFilter,
  onSelect,
  renderHeader,
  renderCell,
  renderFilter,
  renderFooter,
  className = '',
  style = {},
  ...props
}) => {
  // =============================================================================
  // STATE
  // =============================================================================
  const [sortState, setSortState] = useState({
    sortBy: externalSort?.sortBy || null,
    sortOrder: externalSort?.sortOrder || null, // 'asc' | 'desc' | null
  });

  const [filterState, setFilterState] = useState({ ...externalFilters });
  const [openFilterMenu, setOpenFilterMenu] = useState(null);
  const filterMenuRefs = useRef({});

  const [selectedRows, setSelectedRows] = useState([...externalSelected]);
  // Ref to track if selection change was internal (user action)
  const isInternalSelectionChangeRef = useRef(false);

  // =============================================================================
  // SYNC EXTERNAL PROPS
  // =============================================================================
  // Use refs to track previous values and prevent unnecessary updates
  const prevSortRef = useRef(externalSort);
  const prevFiltersRef = useRef(externalFilters);
  const prevSelectedRef = useRef(externalSelected);

  useEffect(() => {
    // Only update if sort actually changed
    const sortByChanged = externalSort?.sortBy !== prevSortRef.current?.sortBy;
    const sortOrderChanged = externalSort?.sortOrder !== prevSortRef.current?.sortOrder;
    const sortNullChanged = !externalSort && (prevSortRef.current?.sortBy || prevSortRef.current?.sortOrder);

    if (sortByChanged || sortOrderChanged || sortNullChanged) {
      if (externalSort) {
        setSortState(prev => {
          // Only update if values actually changed
          if (
            prev.sortBy === externalSort.sortBy &&
            prev.sortOrder === externalSort.sortOrder
          ) {
            return prev;
          }
          return {
            sortBy: externalSort.sortBy,
            sortOrder: externalSort.sortOrder,
          };
        });
      } else {
        setSortState(prev => {
          if (prev.sortBy === null && prev.sortOrder === null) {
            return prev;
          }
          return { sortBy: null, sortOrder: null };
        });
      }
      prevSortRef.current = externalSort;
    }
  }, [externalSort?.sortBy, externalSort?.sortOrder]);

  useDeepCompareEffect(() => {
    // Only update if filters actually changed (deep comparison)
    const filtersStr = JSON.stringify(externalFilters);
    const prevFiltersStr = JSON.stringify(prevFiltersRef.current);
    
    if (filtersStr !== prevFiltersStr) {
      setFilterState({ ...externalFilters });
      prevFiltersRef.current = externalFilters;
    }
  }, [externalFilters]);

  useDeepCompareEffect(() => {
    // Only update if selected actually changed (deep comparison)
    const selectedStr = JSON.stringify(externalSelected);
    const prevSelectedStr = JSON.stringify(prevSelectedRef.current);
    
    if (selectedStr !== prevSelectedStr) {
      isInternalSelectionChangeRef.current = false; // Mark as external change
      setSelectedRows([...externalSelected]);
      prevSelectedRef.current = externalSelected;
    }
  }, [externalSelected]);

  // Call onSelect after internal selection changes
  useEffect(() => {
    if (isInternalSelectionChangeRef.current && onSelect) {
      isInternalSelectionChangeRef.current = false; // Reset flag
      onSelect(selectedRows);
    }
  }, [selectedRows, onSelect]);

  // =============================================================================
  // COMPUTED: DISPLAY DATA
  // =============================================================================
  const displayData = useMemo(() => {
    // If async mode, parent handles sorting/filtering - just return tableData
    if (async) {
      return tableData;
    }

    // Internal mode: handle sorting and filtering
    let data = [...tableData];

    // Internal sorting
    if (sortState.sortBy) {
      data = data.sort((a, b) => {
        let aValue = a[sortState.sortBy];
        let bValue = b[sortState.sortBy];

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) aValue = '';
        if (bValue === null || bValue === undefined) bValue = '';

        // Check if both values are numbers (including string numbers)
        const aIsNumber = !isNaN(aValue) && aValue !== '';
        const bIsNumber = !isNaN(bValue) && bValue !== '';

        if (aIsNumber && bIsNumber) {
          // Numerical comparison
          return sortState.sortOrder === 'asc'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        } else {
          // String comparison (case-insensitive)
          const comparison = String(aValue)
            .toLowerCase()
            .localeCompare(String(bValue).toLowerCase());
          return sortState.sortOrder === 'asc' ? comparison : -comparison;
        }
      });
    }

    // Internal filtering
    const activeFilters = Object.keys(filterState).filter(
      key =>
        filterState[key] &&
        Array.isArray(filterState[key]) &&
        filterState[key].length > 0
    );
    if (activeFilters.length > 0) {
      data = data.filter(row => {
        return activeFilters.every(filterKey => {
          const filterValues = filterState[filterKey];
          const rowValue = row[filterKey];
          return filterValues.includes(rowValue);
        });
      });
    }

    return data;
  }, [tableData, sortState, filterState, async]);

  // =============================================================================
  // GRID TEMPLATE
  // =============================================================================
  const gridTemplate = useMemo(() => {
    const headerWidths = headers.map(h => h.width || defaultCellWidth);
    if (allowSelect) {
      return ['auto', ...headerWidths].join(' ');
    }
    return headerWidths.join(' ');
  }, [headers, defaultCellWidth, allowSelect]);

  // =============================================================================
  // HELPER FUNCTIONS
  // =============================================================================
  const getRowId = useCallback(
    rowData => {
      return rowData[rowKey] || rowData.id || null;
    },
    [rowKey]
  );

  const isRowSelected = useCallback(
    rowData => {
      const rowId = getRowId(rowData);
      if (!rowId) return false;
      return selectedRows.some(selected => {
        const selectedId =
          typeof selected === 'object' ? selected[rowKey] || selected.id : selected;
        return selectedId === rowId;
      });
    },
    [selectedRows, getRowId, rowKey]
  );

  const isAllSelected = useMemo(() => {
    if (!allowSelect || tableData.length === 0) return false;
    return tableData.every(row => isRowSelected(row));
  }, [allowSelect, tableData, isRowSelected]);

  const isIndeterminate = useMemo(() => {
    if (!allowSelect || tableData.length === 0) return false;
    const selectedCount = tableData.filter(row => isRowSelected(row)).length;
    return selectedCount > 0 && selectedCount < tableData.length;
  }, [allowSelect, tableData, isRowSelected]);

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================
  const handleCellClick = useCallback(
    (rowData, cell) => {
      onCellClicked?.(rowData, cell);
    },
    [onCellClicked]
  );

  const handleLoadMoreData = useCallback(() => {
    onScrolledToEndInTable?.();
  }, [onScrolledToEndInTable]);

  const handleSort = useCallback(
    header => {
      if (!header.sortable) return;

      let newSortOrder = 'asc';

      // If clicking the same header, toggle between asc, desc, and none
      if (sortState.sortBy === header.key) {
        if (sortState.sortOrder === 'asc') {
          newSortOrder = 'desc';
        } else if (sortState.sortOrder === 'desc') {
          // Reset to no sort
          setSortState({ sortBy: null, sortOrder: null });

          // Emit only in async mode
          if (async) {
            onSort?.({
              header,
              sortBy: null,
              sortOrder: null,
            });
          }
          return;
        }
      }

      const newSortState = {
        sortBy: header.key,
        sortOrder: newSortOrder,
      };
      setSortState(newSortState);

      // Emit only in async mode
      if (async) {
        onSort?.({
          header,
          sortBy: header.key,
          sortOrder: newSortOrder,
        });
      }
    },
    [sortState, async, onSort]
  );

  const getSortIconState = useCallback(
    header => {
      if (!header.sortable) return null;
      if (sortState.sortBy !== header.key) return 'none';
      return sortState.sortOrder; // 'asc' | 'desc'
    },
    [sortState]
  );

  const hasFilter = useCallback(header => {
    return header.filterable === true;
  }, []);

  const isFilterActive = useCallback(
    header => {
      const filterValues = filterState[header.key];
      return filterValues && Array.isArray(filterValues) && filterValues.length > 0;
    },
    [filterState]
  );

  const getSelectedFilterValues = useCallback(
    header => {
      return filterState[header.key] || [];
    },
    [filterState]
  );

  const isFilterOptionSelected = useCallback(
    (header, optionValue) => {
      const selectedValues = getSelectedFilterValues(header);
      return selectedValues.includes(optionValue);
    },
    [getSelectedFilterValues]
  );

  const toggleFilterMenu = useCallback(
    header => {
      if (filterMenuRefs.current[header.key]) {
        filterMenuRefs.current[header.key].toggleMenu();
      }
    },
    []
  );

  const handleFilterMenuOpen = useCallback(header => {
    setOpenFilterMenu(header.key);
  }, []);

  const handleFilterMenuClose = useCallback(
    header => {
      if (openFilterMenu === header.key) {
        setOpenFilterMenu(null);
      }
    },
    [openFilterMenu]
  );

  const closeFilterMenu = useCallback(
    header => {
      if (header && filterMenuRefs.current[header.key]) {
        filterMenuRefs.current[header.key].closeMenu();
      } else {
        // Close all menus
        Object.values(filterMenuRefs.current).forEach(menuRef => {
          if (menuRef) {
            menuRef.closeMenu();
          }
        });
        setOpenFilterMenu(null);
      }
    },
    []
  );

  const handleFilterValuesChange = useCallback(
    (header, newValues) => {
      // Update filter state - header.key as object key, values as array
      const newFilterState = { ...filterState };
      if (newValues && Array.isArray(newValues) && newValues.length > 0) {
        newFilterState[header.key] = newValues;
      } else {
        // Remove the key if no values selected
        delete newFilterState[header.key];
      }
      setFilterState(newFilterState);

      // Emit filter change only in async mode
      if (async) {
        onFilter?.(newFilterState);
      }
    },
    [filterState, async, onFilter]
  );

  const clearHeaderFilters = useCallback(
    header => {
      const newFilterState = { ...filterState };
      delete newFilterState[header.key];
      setFilterState(newFilterState);
      // Emit updated filter state only in async mode
      if (async) {
        onFilter?.(newFilterState);
      }
    },
    [filterState, async, onFilter]
  );

  const handleSelectAll = useCallback(
    (newValues, value, event) => {
      // BasicCheckbox returns array of selected IDs when using selectAll
      let newSelectedRows;
      if (Array.isArray(newValues)) {
        // Convert array of IDs to array of row objects
        if (newValues.length === 0) {
          newSelectedRows = [];
        } else {
          newSelectedRows = tableData.filter(row => {
            const rowId = getRowId(row);
            return newValues.includes(rowId);
          });
        }
      } else {
        // Fallback: toggle manually
        setSelectedRows(prev => {
          const allSelected = prev.length === tableData.length && 
            tableData.every(row => prev.some(selected => {
              const selectedId = typeof selected === 'object' ? selected[rowKey] || selected.id : selected;
              return selectedId === getRowId(row);
            }));
          return allSelected ? [] : [...tableData];
        });
        isInternalSelectionChangeRef.current = true;
        return;
      }
      
      // Check if selection actually changed before updating
      setSelectedRows(prev => {
        const prevIds = prev.map(row => getRowId(row)).sort();
        const newIds = newSelectedRows.map(row => getRowId(row)).sort();
        if (prevIds.length === newIds.length && 
            prevIds.every((id, idx) => id === newIds[idx])) {
          return prev; // No change
        }
        isInternalSelectionChangeRef.current = true;
        return newSelectedRows;
      });
    },
    [tableData, getRowId, rowKey]
  );

  // Get selected IDs for checkbox (memoized)
  const selectedIds = useMemo(() => {
    return selectedRows.map(row => {
      const rowId = getRowId(row);
      return rowId || row;
    });
  }, [selectedRows, getRowId]);

  const createRowSelectHandler = useCallback(
    rowData => {
      return (newValues, value, event) => {
        // BasicCheckbox returns array of selected values
        if (Array.isArray(newValues)) {
          // Convert array of IDs to array of row objects
          const newSelectedRows = tableData.filter(row => {
            const rId = getRowId(row);
            return newValues.includes(rId);
          });
          
          // Only update if selection actually changed
          setSelectedRows(prev => {
            const prevIds = prev.map(row => getRowId(row)).sort();
            const newIds = newSelectedRows.map(row => getRowId(row)).sort();
            if (prevIds.length === newIds.length && 
                prevIds.every((id, idx) => id === newIds[idx])) {
              return prev; // No change
            }
            isInternalSelectionChangeRef.current = true;
            return newSelectedRows;
          });
        }
      };
    },
    [tableData, getRowId]
  );

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================
  const renderSortIcon = useCallback(
    header => {
      const iconState = getSortIconState(header);
      if (!header.sortable) return null;

      return (
        <span
          className={`sort-icon ${
            iconState === 'none' || iconState === null
              ? 'sort-none'
              : iconState === 'asc'
                ? 'sort-asc'
                : 'sort-desc'
          }`}
          onClick={e => {
            e.stopPropagation();
            handleSort(header);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              className="sort-arrow-up"
              d="M2 10.6665L4.66667 13.3332M4.66667 13.3332L7.33333 10.6665M4.66667 13.3332V2.6665"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="sort-arrow-down"
              d="M14 5.33317L11.3333 2.6665M11.3333 2.6665L8.66667 5.33317M11.3333 2.6665V13.3332"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    },
    [getSortIconState, handleSort]
  );

  const renderFilterIcon = useCallback(
    header => {
      if (!hasFilter(header)) return null;

      return (
        <BasicMenu
          ref={el => {
            if (el) filterMenuRefs.current[header.key] = el;
          }}
          trigger={
            <span
              className={`filter-icon ${isFilterActive(header) ? 'filter-active' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
              >
                <path
                  d="M13.8333 0.5H0.5L5.83333 6.80667V11.1667L8.5 12.5V6.80667L13.8333 0.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          triggerType="click"
          placement="bottom-end"
          offset={[0, 0.5]}
          matchTriggerWidth={false}
          width="10rem"
          closeOnOutsideClick={true}
          closeOnEsc={true}
          onOpen={() => handleFilterMenuOpen(header)}
          onClose={() => handleFilterMenuClose(header)}
        >
          {renderFilter ? (
            renderFilter({
              header,
              selectedValues: getSelectedFilterValues(header),
              onFilterToggle: value => {
                const currentValues = getSelectedFilterValues(header);
                const newValues = currentValues.includes(value)
                  ? currentValues.filter(v => v !== value)
                  : [...currentValues, value];
                handleFilterValuesChange(header, newValues);
              },
              isOptionSelected: value => isFilterOptionSelected(header, value),
              clearFilters: () => clearHeaderFilters(header),
              closeMenu: () => closeFilterMenu(header),
            })
          ) : (
            <div className="filter-menu-content">
              <div className="filter-menu-body">
                {header.filter &&
                Array.isArray(header.filter) &&
                header.filter.length > 0 ? (
                  <div>
                    {header.filter.map((option, index) => (
                      <div key={index} className="filter-checkbox-item">
                        <BasicCheckbox
                          value={option.value}
                          label={option.text}
                          selected={getSelectedFilterValues(header)}
                          size="sm"
                          onChange={values => handleFilterValuesChange(header, values)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-filters-text">No filter options available</p>
                )}
                {isFilterActive(header) && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      clearHeaderFilters(header);
                    }}
                    className="clear-all-btn"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </BasicMenu>
      );
    },
    [
      hasFilter,
      isFilterActive,
      getSelectedFilterValues,
      isFilterOptionSelected,
      handleFilterValuesChange,
      clearHeaderFilters,
      closeFilterMenu,
      handleFilterMenuOpen,
      handleFilterMenuClose,
      renderFilter,
    ]
  );

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div className={`basic-table-wrapper ${className}`} style={style} {...props}>
      <div className="basic-table-scroll-container">
        <div className="basic-table-content">
          {/* Table Header - Sticky */}
          <div className="table-header" style={{ gridTemplateColumns: gridTemplate }}>
            {/* Checkbox column header */}
            {allowSelect && (
              <div
                className="table-header-cell checkbox-header-cell"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <BasicCheckbox
                  value="selectAll"
                  selected={selectedIds}
                  allItems={tableData}
                  valueKey={rowKey}
                  size="sm"
                  onChange={handleSelectAll}
                />
              </div>
            )}

            {headers.map((header, index) => (
              <div
                key={`header-${index}`}
                className={`table-header-cell ${header.headerClasses || ''} ${
                  header.sortable ? 'sortable' : ''
                } ${
                  sortState.sortBy === header.key && sortState.sortOrder === 'asc'
                    ? 'sorted-asc'
                    : ''
                } ${
                  sortState.sortBy === header.key && sortState.sortOrder === 'desc'
                    ? 'sorted-desc'
                    : ''
                }`}
                onClick={() => header.sortable && handleSort(header)}
              >
                {renderHeader ? (
                  renderHeader({
                    header,
                    sortState,
                    filterState,
                  })
                ) : (
                  <div className="header-content">
                    <span className="header-text">{header.text}</span>
                    <div className="header-actions">
                      {renderSortIcon(header)}
                      {renderFilterIcon(header)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="table-body">
            {displayData.map((rowData, rowIndex) => {
              const rowId = getRowId(rowData) || `row-${rowIndex}`;
              return (
                <div
                  key={rowId}
                  className={`table-row ${enableHover ? 'hover-enabled' : ''}`}
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  {/* Checkbox column cell */}
                  {allowSelect && (
                    <div
                      className="table-cell checkbox-cell"
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      <BasicCheckbox
                        value={getRowId(rowData)}
                        selected={selectedIds}
                        valueKey={rowKey}
                        size="sm"
                        onChange={createRowSelectHandler(rowData)}
                      />
                    </div>
                  )}

                  {headers.map((header, cellIndex) => (
                    <div
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`table-cell ${header.classes || ''} ${
                        allowSelect && cellIndex === 0 ? 'first-data-cell' : ''
                      }`}
                      onClick={() => handleCellClick(rowData, header)}
                    >
                      {renderCell ? (
                        renderCell({
                          rowData,
                          cell: header,
                        })
                      ) : (
                        <div className="cell-content">
                          {header.render && typeof header.render === 'function' ? (
                            header.render(rowData)
                          ) : (
                            rowData[header.key] !== undefined
                              ? rowData[header.key]
                              : '-'
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Infinite Scroll Observer */}
            {enableInfiniteScroll && (
              <ScrollObserver onScrolledToEnd={handleLoadMoreData} />
            )}
          </div>
        </div>
      </div>

      {/* Table Footer */}
      {renderFooter && <div className="table-footer">{renderFooter()}</div>}
    </div>
  );
};

// =============================================================================
// PROP TYPES
// =============================================================================
BasicTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      classes: PropTypes.string,
      headerClasses: PropTypes.string,
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      filter: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
          ]).isRequired,
        })
      ),
      width: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  tableData: PropTypes.array.isRequired,
  enableHover: PropTypes.bool,
  enableInfiniteScroll: PropTypes.bool,
  defaultCellWidth: PropTypes.string,
  async: PropTypes.bool,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    sortOrder: PropTypes.oneOf(['asc', 'desc']),
  }),
  filters: PropTypes.object,
  allowSelect: PropTypes.bool,
  selected: PropTypes.array,
  rowKey: PropTypes.string,
  onCellClicked: PropTypes.func,
  onScrolledToEndInTable: PropTypes.func,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  onSelect: PropTypes.func,
  renderHeader: PropTypes.func,
  renderCell: PropTypes.func,
  renderFilter: PropTypes.func,
  renderFooter: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

BasicTable.displayName = 'BasicTable';

export default BasicTable;
