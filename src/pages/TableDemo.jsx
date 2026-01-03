import React, { useState, useMemo } from 'react';
import BasicTable from '../components/sharedComponents/BasicTable';
import '@/assets/scss/pages/_table-demo.scss';

const TableDemo = () => {
  // =============================================================================
  // DATA
  // =============================================================================
  const basicData = [
    { _id: 1, name: 'John Doe', age: 30, city: 'New York', country: 'United States', email: 'john@example.com', salary: 100000 },
    { _id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles', country: 'United States', email: 'jane@example.com', salary: 80000 },
    { _id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago', country: 'United States', email: 'bob@example.com', salary: 60000 },
    { _id: 4, name: 'Alice Brown', age: 28, city: 'Houston', country: 'United States', email: 'alice@example.com', salary: 95000 },
    { _id: 5, name: 'Charlie Wilson', age: 32, city: 'Phoenix', country: 'United States', email: 'charlie@example.com', salary: 75000 },
    { _id: 6, name: 'Diana Davis', age: 27, city: 'Philadelphia', country: 'United States', email: 'diana@example.com', salary: 85000 },
    { _id: 7, name: 'Eve Anderson', age: 29, city: 'San Antonio', country: 'United States', email: 'eve@example.com', salary: 70000 },
    { _id: 8, name: 'Frank Miller', age: 31, city: 'San Diego', country: 'United States', email: 'frank@example.com', salary: 90000 },
  ];

  // Generate more data for pagination and infinite scroll
  const generateData = (count) => {
    const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kelly', 'Leo', 'Mia'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Support'];
    const statuses = ['Active', 'Inactive', 'Pending', 'On Leave'];
    
    return Array.from({ length: count }, (_, i) => ({
      _id: i + 1,
      name: `${names[i % names.length]} ${names[(i + 1) % names.length]}`,
      email: `${names[i % names.length].toLowerCase()}${i}@example.com`,
      city: cities[i % cities.length],
      department: departments[i % departments.length],
      salary: Math.floor(Math.random() * 50000) + 50000,
      experience: `${Math.floor(Math.random() * 10) + 1} years`,
      status: statuses[i % statuses.length],
      score: Math.floor(Math.random() * 40) + 60,
    }));
  };

  const paginatedData = generateData(25);
  const infiniteScrollData = generateData(50);
  const filterableData = generateData(20);

  // =============================================================================
  // STATE
  // =============================================================================
  const [infiniteData, setInfiniteData] = useState(infiniteScrollData.slice(0, 10));
  const [asyncSortState, setAsyncSortState] = useState({ sortBy: null, sortOrder: null });
  const [asyncFilterState, setAsyncFilterState] = useState({});
  const [asyncData, setAsyncData] = useState([
    { _id: 1, name: 'Alice', score: 95, category: 'A' },
    { _id: 2, name: 'Bob', score: 87, category: 'B' },
    { _id: 3, name: 'Charlie', score: 92, category: 'A' },
    { _id: 4, name: 'Diana', score: 78, category: 'C' },
    { _id: 5, name: 'Eve', score: 88, category: 'B' },
    { _id: 6, name: 'Frank', score: 91, category: 'A' },
    { _id: 7, name: 'Grace', score: 83, category: 'B' },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);

  // =============================================================================
  // HEADERS
  // =============================================================================
  const basicHeaders = [
    { text: 'Name', key: 'name', sortable: true },
    { text: 'Age', key: 'age', classes: 'right-align', headerClasses: 'right-align', sortable: true },
    { text: 'City', key: 'city', sortable: true },
    { text: 'Country', key: 'country' },
    { text: 'Email', key: 'email', width: '15rem' },
    { text: 'Salary', key: 'salary', classes: 'right-align', headerClasses: 'right-align', sortable: true },
  ];

  const filterableHeaders = [
    { 
      text: 'Name', 
      key: 'name', 
      sortable: true,
      filterable: true,
      filter: [
        { text: 'John', value: 'John' },
        { text: 'Jane', value: 'Jane' },
        { text: 'Bob', value: 'Bob' },
        { text: 'Alice', value: 'Alice' },
      ]
    },
    { 
      text: 'City', 
      key: 'city', 
      sortable: true,
      filterable: true,
      filter: [
        { text: 'New York', value: 'New York' },
        { text: 'Los Angeles', value: 'Los Angeles' },
        { text: 'Chicago', value: 'Chicago' },
        { text: 'Houston', value: 'Houston' },
        { text: 'Phoenix', value: 'Phoenix' },
      ]
    },
    { 
      text: 'Department', 
      key: 'department', 
      sortable: true,
      filterable: true,
      filter: [
        { text: 'Engineering', value: 'Engineering' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Sales', value: 'Sales' },
        { text: 'HR', value: 'HR' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Operations', value: 'Operations' },
        { text: 'IT', value: 'IT' },
        { text: 'Support', value: 'Support' },
      ]
    },
    { text: 'Email', key: 'email', width: '15rem' },
    { text: 'Salary', key: 'salary', classes: 'right-align', headerClasses: 'right-align', sortable: true },
    { text: 'Experience', key: 'experience' },
  ];

  const selectableHeaders = [
    { text: 'ID', key: '_id', width: '4rem' },
    { text: 'Name', key: 'name', sortable: true },
    { text: 'Email', key: 'email', width: '15rem' },
    { text: 'City', key: 'city', sortable: true },
    { text: 'Department', key: 'department', sortable: true },
    { text: 'Salary', key: 'salary', classes: 'right-align', headerClasses: 'right-align', sortable: true },
  ];

  const asyncHeaders = [
    { text: 'Name', key: 'name', sortable: true },
    { text: 'Score', key: 'score', sortable: true, classes: 'right-align', headerClasses: 'right-align' },
    { text: 'Category', key: 'category', sortable: true },
  ];

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================
  const handleCellClick = (rowData, cell) => {
    console.log('Cell clicked:', { rowData, cell });
  };

  const handleInfiniteScroll = () => {
    console.log('Scrolled to end, loading more data...');
    setTimeout(() => {
      const currentLength = infiniteData.length;
      const newData = infiniteScrollData.slice(0, currentLength + 10);
      setInfiniteData(newData);
    }, 500);
  };

  const handleAsyncSort = (sortData) => {
    console.log('Async sort triggered:', sortData);
    setAsyncSortState({ sortBy: sortData.sortBy, sortOrder: sortData.sortOrder });
    
    setTimeout(() => {
      const sorted = [...asyncData].sort((a, b) => {
        const aVal = a[sortData.sortBy];
        const bVal = b[sortData.sortBy];
        if (sortData.sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      setAsyncData(sorted);
    }, 300);
  };

  const handleAsyncFilter = (filters) => {
    console.log('Async filter triggered:', filters);
    setAsyncFilterState(filters);
  };

  const handleSelect = (selected) => {
    console.log('Rows selected:', selected);
    setSelectedRows(selected);
  };

  const handleSelect2 = (selected) => {
    console.log('Rows selected (table 2):', selected);
    setSelectedRows2(selected);
  };

  // =============================================================================
  // RENDER PROPS
  // =============================================================================
  const renderCustomCell = ({ rowData, cell }) => {
    if (cell.key === 'department') {
      const colors = {
        Engineering: '#007bff',
        Marketing: '#28a745',
        Sales: '#ffc107',
        HR: '#dc3545',
        Finance: '#17a2b8',
        Operations: '#6f42c1',
        IT: '#fd7e14',
        Support: '#20c997',
      };
      return (
        <div
          className="cell-content"
          style={{
            background: colors[rowData.department] || '#ccc',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {rowData.department}
        </div>
      );
    }
    if (cell.key === 'salary') {
      return (
        <div className="cell-content" style={{ textAlign: 'right' }}>
          <span style={{ fontWeight: 'bold', color: '#28a745' }}>
            ${rowData.salary.toLocaleString()}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="table-demo">
      <h1>Basic Table Component Demo</h1>

      {/* Basic Table with Sorting */}
      <section className="demo-section">
        <h2>1. Basic Table with Sorting</h2>
        <div className="demo-card">
          <BasicTable
            headers={basicHeaders}
            tableData={basicData}
            enableHover={true}
            enableInfiniteScroll={false}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Basic table with sortable columns. Click column headers to sort. Click again to reverse, click third time to clear sort.</p>
      </section>

      {/* Table with Filters */}
      <section className="demo-section">
        <h2>2. Table with Filters</h2>
        <div className="demo-card">
          <BasicTable
            headers={filterableHeaders}
            tableData={filterableData}
            enableHover={true}
            enableInfiniteScroll={false}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Table with filterable columns. Click the filter icon (funnel) next to column headers to open filter menu. Select multiple values to filter rows.</p>
      </section>

      {/* Table with Row Selection */}
      <section className="demo-section">
        <h2>3. Table with Row Selection</h2>
        <div className="demo-card">
          <BasicTable
            headers={selectableHeaders}
            tableData={paginatedData.slice(0, 10)}
            enableHover={true}
            enableInfiniteScroll={false}
            allowSelect={true}
            selected={selectedRows}
            onSelect={handleSelect}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table with row selection. Use checkbox in header to select/deselect all. Currently {selectedRows.length} row(s) selected.
        </p>
      </section>

      {/* Table with Filters and Selection */}
      <section className="demo-section">
        <h2>4. Table with Filters and Selection</h2>
        <div className="demo-card">
          <BasicTable
            headers={filterableHeaders}
            tableData={filterableData}
            enableHover={true}
            enableInfiniteScroll={false}
            allowSelect={true}
            selected={selectedRows2}
            onSelect={handleSelect2}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table combining filters and row selection. Filter data first, then select rows. Currently {selectedRows2.length} row(s) selected.
        </p>
      </section>

      {/* Table with Infinite Scroll */}
      <section className="demo-section">
        <h2>5. Table with Infinite Scroll</h2>
        <div className="demo-card" style={{ height: '400px' }}>
          <BasicTable
            headers={selectableHeaders}
            tableData={infiniteData}
            enableHover={true}
            enableInfiniteScroll={true}
            onScrolledToEndInTable={handleInfiniteScroll}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table with infinite scroll. Scroll to the bottom to automatically load more data. Currently showing{' '}
          {infiniteData.length} items out of {infiniteScrollData.length} total.
        </p>
      </section>

      {/* Table with Async Sorting */}
      <section className="demo-section">
        <h2>6. Table with Async Sorting</h2>
        <div className="demo-card">
          <BasicTable
            headers={asyncHeaders}
            tableData={asyncData}
            enableHover={true}
            enableInfiniteScroll={false}
            async={true}
            sort={asyncSortState}
            onSort={handleAsyncSort}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table with async sorting. Sort state is managed externally. Current sort:{' '}
          {asyncSortState.sortBy || 'None'} ({asyncSortState.sortOrder || ''})
        </p>
      </section>

      {/* Table with Async Filtering */}
      <section className="demo-section">
        <h2>7. Table with Async Filtering</h2>
        <div className="demo-card">
          <BasicTable
            headers={filterableHeaders.slice(0, 3)}
            tableData={filterableData}
            enableHover={true}
            enableInfiniteScroll={false}
            async={true}
            filters={asyncFilterState}
            onFilter={handleAsyncFilter}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table with async filtering. Filter state is managed externally. Active filters:{' '}
          {Object.keys(asyncFilterState).length > 0
            ? Object.entries(asyncFilterState)
                .map(([key, values]) => `${key}: [${values.join(', ')}]`)
                .join(', ')
            : 'None'}
        </p>
      </section>

      {/* Table with Custom Cell Rendering */}
      <section className="demo-section">
        <h2>8. Table with Custom Cell Rendering</h2>
        <div className="demo-card">
          <BasicTable
            headers={filterableHeaders}
            tableData={filterableData.slice(0, 5)}
            enableHover={true}
            enableInfiniteScroll={false}
            renderCell={renderCustomCell}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>
          Table with custom cell rendering using renderCell prop. Department column has colored badges, salary column is formatted with currency.
        </p>
      </section>

      {/* Table with All Features */}
      <section className="demo-section">
        <h2>9. Table with All Features Combined</h2>
        <div className="demo-card" style={{ height: '400px' }}>
          <BasicTable
            headers={filterableHeaders}
            tableData={filterableData}
            enableHover={true}
            enableInfiniteScroll={true}
            allowSelect={true}
            selected={selectedRows2}
            onSelect={handleSelect2}
            onScrolledToEndInTable={handleInfiniteScroll}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Table combining all features: sorting, filtering, row selection, infinite scroll, and hover effects.</p>
      </section>

      {/* Features List */}
      <section className="demo-section">
        <h2>Table Features</h2>
        <div className="features-list">
          <ul>
            <li>
              ✅ <strong>Sorting:</strong> Click column headers to sort data (internal or async mode). Click again to reverse, third click clears sort.
            </li>
            <li>
              ✅ <strong>Filtering:</strong> Click filter icon (funnel) to open filter menu. Select multiple values to filter rows. Blue dot indicates active filters.
            </li>
            <li>
              ✅ <strong>Row Selection:</strong> Use checkboxes to select individual rows or select all from header checkbox.
            </li>
            <li>
              ✅ <strong>Infinite Scroll:</strong> Automatically load more data when scrolling to end using ScrollObserver.
            </li>
            <li>
              ✅ <strong>Hover Effects:</strong> Row hover highlighting for better UX.
            </li>
            <li>
              ✅ <strong>Async Mode:</strong> External control of sorting and filtering with async prop.
            </li>
            <li>
              ✅ <strong>Custom Rendering:</strong> Custom cell content with render function or renderCell prop.
            </li>
            <li>
              ✅ <strong>Render Props:</strong> Custom header, cell, and filter rendering with renderHeader, renderCell, and renderFilter props.
            </li>
            <li>
              ✅ <strong>Event Handling:</strong> Cell clicks, sorting, filtering, selection, infinite scroll events.
            </li>
            <li>
              ✅ <strong>Text Alignment:</strong> Left, center, and right alignment for headers and cells.
            </li>
            <li>
              ✅ <strong>Flexible Layout:</strong> Customizable column widths with grid template.
            </li>
            <li>
              ✅ <strong>Accessibility:</strong> Keyboard navigation, tabindex, and ARIA support.
            </li>
            <li>
              ✅ <strong>Sticky Header:</strong> Table header stays visible while scrolling.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TableDemo;
