import React, { useState, useMemo } from 'react';
import BasicTable from '../components/sharedComponents/BasicTable';
import BasicPagination from '../components/sharedComponents/BasicPagination';
import '@/assets/scss/pages/_table-demo.scss';

const TableDemo = () => {
  // Basic table data
  const basicData = [
    { name: 'u John Doe', age: 30, city: 'New York', country: 'United States', zipCode: '10001', phone: '1234567890', email: 'john@example.com', website: 'https://john.com', company: 'ABC Inc.', jobTitle: 'Software-front-end-Engineer', salary: 100000, experience: '5 years', education: 'Bachelor of Science', skills: 'JavaScript, React, Node.js', interests: 'Reading, Traveling, Photography', languages: 'English, Spanish', hobbies: 'Reading, Traveling, Photography', references: 'John Doe, Software Engineer, ABC Inc.' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles', country: 'United States', zipCode: '10002', phone: '1234567891', email: 'jane@example.com', website: 'https://jane.com', company: 'XYZ Inc.', jobTitle: 'Marketing Manager', salary: 80000, experience: '3 years', education: 'Master of Business Administration', skills: 'Marketing, Sales, Branding', interests: 'Reading, Traveling, Photography', languages: 'English, French', hobbies: 'Reading, Traveling, Photography', references: 'Jane Smith, Marketing Manager, XYZ Inc.' },
    { name: 'Bob Johnson', age: 35, city: 'Chicago', country: 'United States', zipCode: '10003', phone: '1234567892', email: 'bob@example.com', website: 'https://bob.com', company: 'DEF Inc.', jobTitle: 'Accountant', salary: 60000, experience: '2 years', education: 'Bachelor of Science in Accounting', skills: 'Accounting, Financial Reporting, Tax Preparation', interests: 'Reading, Traveling, Photography', languages: 'English, German', hobbies: 'Reading, Traveling, Photography', references: 'Bob Johnson, Accountant, DEF Inc.' },
    { name: 'John Doe', age: 30, city: 'New York', country: 'United States', zipCode: '10001', phone: '1234567890', email: 'john@example.com', website: 'https://john.com', company: 'ABC Inc.', jobTitle: 'Software Engineer', salary: 100000, experience: '5 years', education: 'Bachelor of Science', skills: 'JavaScript, React, Node.js', interests: 'Reading, Traveling, Photography', languages: 'English, Spanish', hobbies: 'Reading, Traveling, Photography', references: 'John Doe, Software Engineer, ABC Inc.' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles', country: 'United States', zipCode: '10002', phone: '1234567891', email: 'jane@example.com', website: 'https://jane.com', company: 'XYZ Inc.', jobTitle: 'Marketing Manager', salary: 80000, experience: '3 years', education: 'Master of Business Administration', skills: 'Marketing, Sales, Branding', interests: 'Reading, Traveling, Photography', languages: 'English, French', hobbies: 'Reading, Traveling, Photography', references: 'Jane Smith, Marketing Manager, XYZ Inc.' },
    { name: 'Bob Johnson', age: 35, city: 'Chicago', country: 'United States', zipCode: '10003', phone: '1234567892', email: 'bob@example.com', website: 'https://bob.com', company: 'DEF Inc.', jobTitle: 'Accountant', salary: 60000, experience: '2 years', education: 'Bachelor of Science in Accounting', skills: 'Accounting, Financial Reporting, Tax Preparation', interests: 'Reading, Traveling, Photography', languages: 'English, German', hobbies: 'Reading, Traveling, Photography', references: 'Bob Johnson, Accountant, DEF Inc.' },
    { name: 'John Doe', age: 30, city: 'New York', country: 'United States', zipCode: '10001', phone: '1234567890', email: 'john@example.com', website: 'https://john.com', company: 'ABC Inc.', jobTitle: 'Software Engineer', salary: 100000, experience: '5 years', education: 'Bachelor of Science', skills: 'JavaScript, React, Node.js', interests: 'Reading, Traveling, Photography', languages: 'English, Spanish', hobbies: 'Reading, Traveling, Photography', references: 'John Doe, Software Engineer, ABC Inc.' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles', country: 'United States', zipCode: '10002', phone: '1234567891', email: 'jane@example.com', website: 'https://jane.com', company: 'XYZ Inc.', jobTitle: 'Marketing Manager', salary: 80000, experience: '3 years', education: 'Master of Business Administration', skills: 'Marketing, Sales, Branding', interests: 'Reading, Traveling, Photography', languages: 'English, French', hobbies: 'Reading, Traveling, Photography', references: 'Jane Smith, Marketing Manager, XYZ Inc.' },
    { name: 'Bob Johnson', age: 35, city: 'Chicago', country: 'United States', zipCode: '10003', phone: '1234567892', email: 'bob@example.com', website: 'https://bob.com', company: 'DEF Inc.', jobTitle: 'Accountant', salary: 60000, experience: '2 years', education: 'Bachelor of Science in Accounting', skills: 'Accounting, Financial Reporting, Tax Preparation', interests: 'Reading, Traveling, Photography', languages: 'English, German', hobbies: 'Reading, Traveling, Photography', references: 'Bob Johnson, Accountant, DEF Inc.' },
    { name: 'John Doe', age: 30, city: 'New York', country: 'United States', zipCode: '10001', phone: '1234567890', email: 'john@example.com', website: 'https://john.com', company: 'ABC Inc.', jobTitle: 'Software Engineer', salary: 100000, experience: '5 years', education: 'Bachelor of Science', skills: 'JavaScript, React, Node.js', interests: 'Reading, Traveling, Photography', languages: 'English, Spanish', hobbies: 'Reading, Traveling, Photography', references: 'John Doe, Software Engineer, ABC Inc.' },
    { name: 'Jane Smith', age: 25, city: 'Los Angeles', country: 'United States', zipCode: '10002', phone: '1234567891', email: 'jane@example.com', website: 'https://jane.com', company: 'XYZ Inc.', jobTitle: 'Marketing Manager', salary: 80000, experience: '3 years', education: 'Master of Business Administration', skills: 'Marketing, Sales, Branding', interests: 'Reading, Traveling, Photography', languages: 'English, French', hobbies: 'Reading, Traveling, Photography', references: 'Jane Smith, Marketing Manager, XYZ Inc.' },
    { name: 'Bob Johnson', age: 35, city: 'Chicago', country: 'United States', zipCode: '10003', phone: '1234567892', email: 'bob@example.com', website: 'https://bob.com', company: 'DEF Inc.', jobTitle: 'Accountant', salary: 60000, experience: '2 years', education: 'Bachelor of Science in Accounting', skills: 'Accounting, Financial Reporting, Tax Preparation', interests: 'Reading, Traveling, Photography', languages: 'English, German', hobbies: 'Reading, Traveling, Photography', references: 'Bob Johnson, Accountant, DEF Inc.' }
  ];

  // Custom table data
  const userData = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' }
  ];

  // Sortable table data
  const [sortableData, setSortableData] = useState([
    { name: 'Alice', score: 95, category: 'A' },
    { name: 'Bob', score: 87, category: 'B' },
    { name: 'Charlie', score: 92, category: 'A' }
  ]);

  // Pagination data
  const paginatedData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', city: 'Chicago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', city: 'Houston' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', city: 'Phoenix' },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', city: 'Philadelphia' },
    { id: 7, name: 'Eve Anderson', email: 'eve@example.com', city: 'San Antonio' },
    { id: 8, name: 'Frank Miller', email: 'frank@example.com', city: 'San Diego' },
    { id: 9, name: 'Grace Taylor', email: 'grace@example.com', city: 'Dallas' },
    { id: 10, name: 'Henry Moore', email: 'henry@example.com', city: 'San Jose' },
    { id: 11, name: 'Ivy White', email: 'ivy@example.com', city: 'Austin' },
    { id: 12, name: 'Jack Harris', email: 'jack@example.com', city: 'Jacksonville' },
    { id: 13, name: 'Kelly Martin', email: 'kelly@example.com', city: 'Fort Worth' },
    { id: 14, name: 'Leo Thompson', email: 'leo@example.com', city: 'Columbus' },
    { id: 15, name: 'Mia Garcia', email: 'mia@example.com', city: 'Charlotte' },
    { id: 16, name: 'Noah Rodriguez', email: 'noah@example.com', city: 'San Francisco' },
    { id: 17, name: 'Olivia Lewis', email: 'olivia@example.com', city: 'Indianapolis' },
    { id: 18, name: 'Paul Walker', email: 'paul@example.com', city: 'Seattle' },
    { id: 19, name: 'Quinn Hall', email: 'quinn@example.com', city: 'Denver' },
    { id: 20, name: 'Rachel Allen', email: 'rachel@example.com', city: 'Washington DC' }
  ];

  // Employee data for pagination demo 2
  const employeeData = [
    { id: 1, name: 'John Doe', department: 'Engineering', salary: 95000, experience: '5 years' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 72000, experience: '3 years' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', salary: 68000, experience: '7 years' },
    { id: 4, name: 'Alice Brown', department: 'Engineering', salary: 110000, experience: '8 years' },
    { id: 5, name: 'Charlie Wilson', department: 'HR', salary: 65000, experience: '4 years' },
    { id: 6, name: 'Diana Davis', department: 'Finance', salary: 78000, experience: '6 years' },
    { id: 7, name: 'Eve Anderson', department: 'Engineering', salary: 102000, experience: '5 years' },
    { id: 8, name: 'Frank Miller', department: 'Marketing', salary: 69000, experience: '2 years' },
    { id: 9, name: 'Grace Taylor', department: 'Sales', salary: 71000, experience: '4 years' },
    { id: 10, name: 'Henry Moore', department: 'Engineering', salary: 88000, experience: '3 years' },
    { id: 11, name: 'Ivy White', department: 'Finance', salary: 82000, experience: '7 years' },
    { id: 12, name: 'Jack Harris', department: 'HR', salary: 63000, experience: '2 years' },
    { id: 13, name: 'Kelly Martin', department: 'Engineering', salary: 115000, experience: '9 years' },
    { id: 14, name: 'Leo Thompson', department: 'Marketing', salary: 74000, experience: '3 years' },
    { id: 15, name: 'Mia Garcia', department: 'Sales', salary: 76000, experience: '5 years' },
    { id: 16, name: 'Noah Rodriguez', department: 'Engineering', salary: 98000, experience: '4 years' },
    { id: 17, name: 'Olivia Lewis', department: 'Finance', salary: 79000, experience: '5 years' },
    { id: 18, name: 'Paul Walker', department: 'HR', salary: 67000, experience: '6 years' },
    { id: 19, name: 'Quinn Hall', department: 'Marketing', salary: 73000, experience: '4 years' },
    { id: 20, name: 'Rachel Allen', department: 'Sales', salary: 70000, experience: '3 years' },
    { id: 21, name: 'Sam Wilson', department: 'Engineering', salary: 92000, experience: '4 years' },
    { id: 22, name: 'Tina Brown', department: 'Finance', salary: 85000, experience: '8 years' },
    { id: 23, name: 'Uma Patel', department: 'Marketing', salary: 71000, experience: '2 years' },
    { id: 24, name: 'Victor Chen', department: 'Engineering', salary: 105000, experience: '6 years' },
    { id: 25, name: 'Wendy Liu', department: 'Sales', salary: 74000, experience: '5 years' }
  ];

  // Student data for sortable + paginated demo
  const studentData = [
    { id: 1, name: 'John Doe', subject: 'Math', score: 85, status: 'Active' },
    { id: 2, name: 'Jane Smith', subject: 'Science', score: 92, status: 'Active' },
    { id: 3, name: 'Bob Johnson', subject: 'English', score: 78, status: 'Inactive' },
    { id: 4, name: 'Alice Brown', subject: 'Math', score: 95, status: 'Active' },
    { id: 5, name: 'Charlie Wilson', subject: 'Science', score: 89, status: 'Active' },
    { id: 6, name: 'Diana Davis', subject: 'English', score: 87, status: 'Pending' },
    { id: 7, name: 'Eve Anderson', subject: 'Math', score: 91, status: 'Active' },
    { id: 8, name: 'Frank Miller', subject: 'Science', score: 76, status: 'Inactive' },
    { id: 9, name: 'Grace Taylor', subject: 'English', score: 83, status: 'Active' },
    { id: 10, name: 'Henry Moore', subject: 'Math', score: 88, status: 'Active' },
    { id: 11, name: 'Ivy White', subject: 'Science', score: 94, status: 'Active' },
    { id: 12, name: 'Jack Harris', subject: 'English', score: 79, status: 'Pending' },
    { id: 13, name: 'Kelly Martin', subject: 'Math', score: 96, status: 'Active' },
    { id: 14, name: 'Leo Thompson', subject: 'Science', score: 82, status: 'Active' },
    { id: 15, name: 'Mia Garcia', subject: 'English', score: 86, status: 'Inactive' },
    { id: 16, name: 'Noah Rodriguez', subject: 'Math', score: 90, status: 'Active' },
    { id: 17, name: 'Olivia Lewis', subject: 'Science', score: 93, status: 'Active' },
    { id: 18, name: 'Paul Walker', subject: 'English', score: 81, status: 'Pending' }
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [itemsPerPage2, setItemsPerPage2] = useState(10);
  const [currentSort, setCurrentSort] = useState({ key: '', direction: '' });
  const [currentSort3, setCurrentSort3] = useState({ key: '', direction: '' });

  // Headers configurations
  const basicHeaders = [
    { text: 'Name', key: 'name', enableCopy: true },
    { text: 'Age', key: 'age', classes: 'right-align', headerClasses: 'right-align', sortable: true },
    { text: 'City', key: 'city' },
    { text: 'Country', key: 'country' },
    { text: 'Zip Code', key: 'zipCode', enableCopy: true, classes: 'center-align', headerClasses: 'center-align', sortable: true },
    { text: 'Phone', key: 'phone', enableCopy: true },
    { text: 'Email', key: 'email', width: '15rem' },
    { text: 'Website', key: 'website', enableCopy: true, width: '20rem' },
    { text: 'Company', key: 'company', enableCopy: true },
    { text: 'Job Title', key: 'jobTitle', enableCopy: true },
    { text: 'Salary', key: 'salary' },
    { text: 'Experience', key: 'experience' },
    { text: 'Education', key: 'education' },
    { text: 'Skills', key: 'skills' },
    { text: 'Interests', key: 'interests' },
    { text: 'Languages', key: 'languages' },
    { text: 'Hobbies', key: 'hobbies' },
    { text: 'References', key: 'references' }
  ];

  const customHeaders = [
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
    { text: 'Status', key: 'status' }
  ];

  const sortableHeaders = [
    { text: 'Name', key: 'name', sortable: true },
    { text: 'Score', key: 'score', sortable: true },
    { text: 'Category', key: 'category', sortable: true }
  ];

  const paginatedHeaders = [
    { text: 'ID', key: 'id' },
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
    { text: 'City', key: 'city' }
  ];

  const paginatedHeaders2 = [
    { text: 'ID', key: 'id' },
    { text: 'Employee', key: 'name' },
    { text: 'Department', key: 'department' },
    { text: 'Salary', key: 'salary' },
    { text: 'Experience', key: 'experience' }
  ];

  const sortablePaginatedHeaders = [
    { text: 'ID', key: 'id', sortable: true },
    { text: 'Student', key: 'name', sortable: true },
    { text: 'Subject', key: 'subject', sortable: true },
    { text: 'Score', key: 'score', sortable: true },
    { text: 'Status', key: 'status', sortable: true }
  ];

  // Computed values for pagination
  const itemsPerPage = 5;
  const itemsPerPage3 = 6;

  const totalItems = paginatedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return paginatedData.slice(start, end);
  }, [currentPage, paginatedData, itemsPerPage]);

  const totalItems2 = employeeData.length;
  const totalPages2 = Math.ceil(totalItems2 / itemsPerPage2);
  const startItem2 = (currentPage2 - 1) * itemsPerPage2 + 1;
  const endItem2 = Math.min(currentPage2 * itemsPerPage2, totalItems2);

  const currentPageData2 = useMemo(() => {
    const start = (currentPage2 - 1) * itemsPerPage2;
    const end = start + itemsPerPage2;
    return employeeData.slice(start, end);
  }, [currentPage2, employeeData, itemsPerPage2]);

  const sortedStudentData = useMemo(() => {
    if (!currentSort3.key) return studentData;
    return [...studentData].sort((a, b) => {
      const aVal = a[currentSort3.key];
      const bVal = b[currentSort3.key];
      if (currentSort3.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [studentData, currentSort3]);

  const totalItems3 = sortedStudentData.length;
  const totalPages3 = Math.ceil(totalItems3 / itemsPerPage3);
  const startItem3 = (currentPage3 - 1) * itemsPerPage3 + 1;
  const endItem3 = Math.min(currentPage3 * itemsPerPage3, totalItems3);

  const currentSortedPageData = useMemo(() => {
    const start = (currentPage3 - 1) * itemsPerPage3;
    const end = start + itemsPerPage3;
    return sortedStudentData.slice(start, end);
  }, [currentPage3, sortedStudentData, itemsPerPage3]);

  // Event handlers
  const handleCellClick = (rowData, cell) => {
    console.log('Cell clicked:', { rowData, cell });
  };

  const handleSort = (sortData) => {
    setCurrentSort({ key: sortData.key, direction: sortData.direction });
    setSortableData(prev => [...prev].sort((a, b) => {
      const aVal = a[sortData.key];
      const bVal = b[sortData.key];
      if (sortData.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    }));
  };

  const handleSortPaginated = (sortData) => {
    setCurrentSort3({ key: sortData.key, direction: sortData.direction });
    setCurrentPage3(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };

  const handlePageChange3 = (page) => {
    setCurrentPage3(page);
  };

  const handlePageSizeChange = () => {
    setCurrentPage2(1);
  };

  const handleFirst = (page) => {
    console.log('First clicked, going to page:', page);
  };

  const handlePrev = (page) => {
    console.log('Previous clicked, going to page:', page);
  };

  const handleNext = (page) => {
    console.log('Next clicked, going to page:', page);
  };

  const handleLast = (page) => {
    console.log('Last clicked, going to page:', page);
  };

  return (
    <div className="table-demo">
      <h1>Basic Table Component Demo</h1>
      
      {/* Basic Table */}
      <section className="demo-section">
        <h2>Basic Table</h2>
        <div className="demo-card">
          <BasicTable
            headers={basicHeaders}
            tableData={basicData}
            enableHover={true}
            enableInfiniteScroll={false}
            isAlternateColumnColored={true}
            defaultCellWidth="10rem"
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Basic table with column colors and copy functionality.</p>
      </section>

      {/* Basic Table with Alternate Row Colored */}
      <section className="demo-section">
        <h2>Basic Table with Alternate Row Colored</h2>
        <div className="demo-card">
          <BasicTable
            headers={basicHeaders}
            tableData={basicData}
            enableHover={true}
            enableInfiniteScroll={false}
            isAlternateRowColored={true}
            defaultCellWidth="10rem"
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Table with alternating row colors for better readability.</p>
      </section>

      {/* Table with Custom Cells */}
      <section className="demo-section">
        <h2>Table with Custom Cells</h2>
        <div className="demo-card">
          <BasicTable
            headers={customHeaders}
            tableData={userData}
            enableHover={true}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Table with custom cell rendering for status.</p>
      </section>

      {/* Sortable Table */}
      <section className="demo-section">
        <h2>Sortable Table</h2>
        <div className="demo-card">
          <BasicTable
            headers={sortableHeaders}
            tableData={sortableData}
            onSort={handleSort}
            onCellClicked={handleCellClick}
          />
        </div>
        <p>Current sort: {currentSort.key || 'None'} {currentSort.direction || ''}</p>
      </section>

      {/* Pagination Demo 1: Basic Paginated Table */}
      <section className="demo-section">
        <h2>Paginated Table - Basic</h2>
        <div className="demo-card">
          <BasicTable
            headers={paginatedHeaders}
            tableData={currentPageData}
            enableHover={true}
            onCellClicked={handleCellClick}
          />
          <div className="pagination-container">
            <BasicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              showFirstLast={true}
              showPrevNext={true}
              onPageChange={handlePageChange}
              onFirst={handleFirst}
              onPrev={handlePrev}
              onNext={handleNext}
              onLast={handleLast}
            />
            <div className="pagination-info">
              <p>Showing {startItem}-{endItem} of {totalItems} items</p>
              <p>Page {currentPage} of {totalPages}</p>
            </div>
          </div>
        </div>
        <p>Table with external pagination controls.</p>
      </section>

      {/* Pagination Demo 2: Custom Page Size */}
      <section className="demo-section">
        <h2>Paginated Table - Custom Page Size</h2>
        <div className="demo-card">
          <div className="table-content-wrapper">
            <div className="page-size-controls">
              <label>Items per page:</label>
              <select value={itemsPerPage2} onChange={(e) => {
                setItemsPerPage2(parseInt(e.target.value));
                handlePageSizeChange();
              }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <BasicTable
              headers={paginatedHeaders2}
              tableData={currentPageData2}
              enableHover={true}
              onCellClicked={handleCellClick}
            />
          </div>
          <div className="pagination-container">
            <BasicPagination
              currentPage={currentPage2}
              totalPages={totalPages2}
              totalVisible={5}
              onPageChange={handlePageChange2}
            />
            <div className="pagination-info">
              <p>Showing {startItem2}-{endItem2} of {totalItems2} items ({itemsPerPage2} per page)</p>
            </div>
          </div>
        </div>
        <p>Table with customizable page size.</p>
      </section>

      {/* Pagination Demo 3: Sortable + Paginated */}
      <section className="demo-section">
        <h2>Sortable & Paginated Table</h2>
        <div className="demo-card">
          <BasicTable
            headers={sortablePaginatedHeaders}
            tableData={currentSortedPageData}
            enableHover={true}
            onSort={handleSortPaginated}
            onCellClicked={handleCellClick}
          />
          <div className="pagination-container">
            <BasicPagination
              currentPage={currentPage3}
              totalPages={totalPages3}
              size="large"
              onPageChange={handlePageChange3}
            />
            <div className="pagination-info">
              <p>Showing {startItem3}-{endItem3} of {totalItems3} items</p>
              {currentSort3.key && (
                <p>Sorted by: {currentSort3.key} ({currentSort3.direction})</p>
              )}
            </div>
          </div>
        </div>
        <p>Table with both sorting and pagination functionality.</p>
      </section>

      {/* Table Features */}
      <section className="demo-section">
        <h2>Table Features</h2>
        <div className="features-list">
          <ul>
            <li>✅ <strong>Sorting:</strong> Click column headers to sort data</li>
            <li>✅ <strong>Pagination:</strong> Built-in and external pagination controls</li>
            <li>✅ <strong>Hover Effects:</strong> Row hover highlighting</li>
            <li>✅ <strong>Alternate Colors:</strong> Row and column color variations</li>
            <li>✅ <strong>Copy Functionality:</strong> Copy cell values to clipboard</li>
            <li>✅ <strong>Custom Rendering:</strong> Custom cell content with domFunc</li>
            <li>✅ <strong>Responsive:</strong> Adapts to different screen sizes</li>
            <li>✅ <strong>Accessibility:</strong> Keyboard navigation and ARIA support</li>
            <li>✅ <strong>Event Handling:</strong> Cell clicks, sorting, pagination events</li>
            <li>✅ <strong>Flexible Layout:</strong> Customizable column widths</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TableDemo;
