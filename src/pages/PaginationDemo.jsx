import React, { useState, useMemo } from 'react';
import BasicPagination from '../components/sharedComponents/BasicPagination';
import '@/assets/scss/pages/_pagination-demo.scss';

const PaginationDemo = () => {
  // Basic pagination
  const [basicPage, setBasicPage] = useState(7);
  
  // Size examples
  const [sizePage, setSizePage] = useState(3);
  
  // Limited visible pages
  const [limitedPage, setLimitedPage] = useState(25);
  const [totalVisible, setTotalVisible] = useState(7);
  
  // Configuration examples
  const [configPage, setConfigPage] = useState(6);
  
  // Custom slots
  const [slotPage, setSlotPage] = useState(8);
  const [slotPage2, setSlotPage2] = useState(5);
  
  // Disabled state
  const [disabledPage, setDisabledPage] = useState(3);
  const [isDisabled, setIsDisabled] = useState(false);
  
  // Interactive controls
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(20);
  const [showFirstLast, setShowFirstLast] = useState(true);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState('default');
  const [rounded, setRounded] = useState(false);
  const [color, setColor] = useState('primary');
  
  // Data table example
  const [tablePage, setTablePage] = useState(1);
  const itemsPerPage = 5;
  
  // Mock data for table
  const tableData = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin' },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'User' },
    { id: 7, name: 'Eve Anderson', email: 'eve@example.com', role: 'Editor' },
    { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'User' },
    { id: 9, name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin' },
    { id: 10, name: 'Henry Moore', email: 'henry@example.com', role: 'User' },
    { id: 11, name: 'Ivy White', email: 'ivy@example.com', role: 'Editor' },
    { id: 12, name: 'Jack Harris', email: 'jack@example.com', role: 'User' },
    { id: 13, name: 'Kelly Martin', email: 'kelly@example.com', role: 'Admin' },
    { id: 14, name: 'Leo Thompson', email: 'leo@example.com', role: 'User' },
    { id: 15, name: 'Mia Garcia', email: 'mia@example.com', role: 'Editor' },
    { id: 16, name: 'Noah Rodriguez', email: 'noah@example.com', role: 'User' },
    { id: 17, name: 'Olivia Lewis', email: 'olivia@example.com', role: 'Admin' },
    { id: 18, name: 'Paul Walker', email: 'paul@example.com', role: 'User' },
    { id: 19, name: 'Quinn Hall', email: 'quinn@example.com', role: 'Editor' },
    { id: 20, name: 'Rachel Allen', email: 'rachel@example.com', role: 'User' }
  ])[0];
  
  // Computed properties for table
  const totalItems = tableData.length;
  const totalTablePages = Math.ceil(totalItems / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (tablePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return tableData.slice(start, end);
  }, [tablePage, tableData, itemsPerPage]);
  
  const startItem = (tablePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(tablePage * itemsPerPage, totalItems);

  const handleBasicPageChange = (page) => {
    console.log('Basic page changed to:', page);
    setBasicPage(page);
  };

  const handleTablePageChange = (page) => {
    console.log('Table page changed to:', page);
    setTablePage(page);
  };

  const handlePageChange = (page) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };

  const handleFirst = (page) => {
    console.log('First clicked:', page);
  };

  const handlePrev = (page) => {
    console.log('Previous clicked:', page);
  };

  const handleNext = (page) => {
    console.log('Next clicked:', page);
  };

  const handleLast = (page) => {
    console.log('Last clicked:', page);
  };

  return (
    <div className="pagination-demo">
      <h1>Vue 3 Pagination Component Demo</h1>
      
      {/* Basic Example */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <div className="demo-card">
          <BasicPagination
            currentPage={basicPage}
            totalPages={15}
            onPageChange={handleBasicPageChange}
          />
          <p className="demo-info">Current Page: {basicPage}</p>
        </div>
      </section>

      {/* Different Sizes */}
      <section className="demo-section">
        <h2>Different Sizes</h2>
        <div className="demo-card">
          <h3>Small</h3>
          <BasicPagination
            currentPage={sizePage}
            totalPages={10}
            size="small"
            onPageChange={setSizePage}
          />
          
          <h3>Default</h3>
          <BasicPagination
            currentPage={sizePage}
            totalPages={10}
            onPageChange={setSizePage}
          />
          
          <h3>Large</h3>
          <BasicPagination
            currentPage={sizePage}
            totalPages={10}
            size="large"
            onPageChange={setSizePage}
          />
        </div>
      </section>

      {/* Limited Visible Pages */}
      <section className="demo-section">
        <h2>Limited Visible Pages</h2>
        <div className="demo-card">
          <h3>5 Visible Pages (Total: 50)</h3>
          <BasicPagination
            currentPage={limitedPage}
            totalPages={50}
            totalVisible={5}
            onPageChange={setLimitedPage}
          />
          <p className="demo-info">Current Page: {limitedPage} / 50</p>
          
          <div className="demo-controls">
            <button onClick={() => setLimitedPage(1)} className="demo-btn">Go to First</button>
            <button onClick={() => setLimitedPage(25)} className="demo-btn">Go to Middle</button>
            <button onClick={() => setLimitedPage(50)} className="demo-btn">Go to Last</button>
          </div>
        </div>
      </section>

      {/* Custom Configuration */}
      <section className="demo-section">
        <h2>Custom Configuration</h2>
        <div className="demo-card">
          <h3>No First/Last Buttons</h3>
          <BasicPagination
            currentPage={configPage}
            totalPages={12}
            showFirstLast={false}
            onPageChange={setConfigPage}
          />
          
          <h3>No Prev/Next Buttons</h3>
          <BasicPagination
            currentPage={configPage}
            totalPages={12}
            showPrevNext={false}
            onPageChange={setConfigPage}
          />
          
          <h3>Only Page Numbers</h3>
          <BasicPagination
            currentPage={configPage}
            totalPages={12}
            showFirstLast={false}
            showPrevNext={false}
            onPageChange={setConfigPage}
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="demo-section">
        <h2>Disabled State</h2>
        <div className="demo-card">
          <BasicPagination
            currentPage={disabledPage}
            totalPages={10}
            disabled={isDisabled}
            onPageChange={setDisabledPage}
          />
          
          <div className="demo-controls">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
        </div>
      </section>

      {/* Data Table Example */}
      <section className="demo-section">
        <h2>Data Table Example</h2>
        <div className="demo-card">
          <div className="table-container">
            <table className="demo-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="table-pagination">
            <BasicPagination
              currentPage={tablePage}
              totalPages={totalTablePages}
              onPageChange={handleTablePageChange}
            />
            <p className="table-info">
              Showing {startItem}-{endItem} of {totalItems} items
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Rounded Buttons</h2>
        <div className="demo-group">
          <BasicPagination
            currentPage={5}
            totalPages={15}
            rounded={true}
            onPageChange={() => {}}
          />
        </div>
        <p>Pagination with rounded button style.</p>
      </section>

      <section className="demo-section">
        <h2>Without First/Last Buttons</h2>
        <div className="demo-group">
          <BasicPagination
            currentPage={5}
            totalPages={15}
            showFirstLast={false}
            onPageChange={() => {}}
          />
        </div>
        <p>Pagination without first and last page buttons.</p>
      </section>

      <section className="demo-section">
        <h2>Without Previous/Next Buttons</h2>
        <div className="demo-group">
          <BasicPagination
            currentPage={5}
            totalPages={15}
            showPrevNext={false}
            onPageChange={() => {}}
          />
        </div>
        <p>Pagination without previous and next buttons.</p>
      </section>

      <section className="demo-section">
        <h2>Disabled State</h2>
        <div className="demo-group">
          <BasicPagination
            currentPage={5}
            totalPages={15}
            disabled={true}
            onPageChange={() => {}}
          />
        </div>
        <p>Disabled pagination component.</p>
      </section>

      <section className="demo-section">
        <h2>Custom Total Visible</h2>
        <div className="demo-group">
          <div className="visible-demo">
            <h3>3 Visible</h3>
            <BasicPagination
              currentPage={10}
              totalPages={20}
              totalVisible={3}
              onPageChange={() => {}}
            />
          </div>
          <div className="visible-demo">
            <h3>5 Visible</h3>
            <BasicPagination
              currentPage={10}
              totalPages={20}
              totalVisible={5}
              onPageChange={() => {}}
            />
          </div>
          <div className="visible-demo">
            <h3>9 Visible</h3>
            <BasicPagination
              currentPage={10}
              totalPages={20}
              totalVisible={9}
              onPageChange={() => {}}
            />
          </div>
        </div>
        <p>Different numbers of visible page buttons.</p>
      </section>

      <section className="demo-section">
        <h2>Interactive Controls</h2>
        <div className="demo-group">
          <div className="controls">
            <div className="control-group">
              <label htmlFor="total-visible">Total Visible:</label>
              <input
                id="total-visible"
                type="number"
                value={totalVisible}
                onChange={(e) => setTotalVisible(parseInt(e.target.value) || 7)}
                min="3"
                max="15"
                className="demo-input"
              />
            </div>
            <div className="control-group">
              <label htmlFor="size-select">Size:</label>
              <select
                id="size-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="demo-select"
              >
                <option value="small">Small</option>
                <option value="default">Default</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="color-select">Color:</label>
              <select
                id="color-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="demo-select"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={showFirstLast}
                  onChange={(e) => setShowFirstLast(e.target.checked)}
                />
                Show First/Last
              </label>
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={showPrevNext}
                  onChange={(e) => setShowPrevNext(e.target.checked)}
                />
                Show Previous/Next
              </label>
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={rounded}
                  onChange={(e) => setRounded(e.target.checked)}
                />
                Rounded
              </label>
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </div>
          <div className="interactive-pagination">
            <BasicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalVisible={totalVisible}
              showFirstLast={showFirstLast}
              showPrevNext={showPrevNext}
              disabled={disabled}
              size={size}
              rounded={rounded}
              color={color}
              onPageChange={handlePageChange}
              onFirst={handleFirst}
              onPrev={handlePrev}
              onNext={handleNext}
              onLast={handleLast}
            />
          </div>
        </div>
        <p>Interactive pagination with customizable properties.</p>
      </section>

      <section className="demo-section">
        <h2>Pagination Features</h2>
        <div className="features-list">
          <ul>
            <li>✅ <strong>Smart Ellipsis:</strong> Automatically shows ellipsis for large page ranges</li>
            <li>✅ <strong>Flexible Navigation:</strong> Optional first/last and previous/next buttons</li>
            <li>✅ <strong>Size Variants:</strong> Small, default, and large sizes</li>
            <li>✅ <strong>Color Themes:</strong> Primary and secondary variants</li>
            <li>✅ <strong>Rounded Style:</strong> Optional rounded button appearance</li>
            <li>✅ <strong>Disabled State:</strong> Complete disabled functionality</li>
            <li>✅ <strong>Accessibility:</strong> Proper ARIA labels and keyboard support</li>
            <li>✅ <strong>Event Handling:</strong> Separate callbacks for different actions</li>
            <li>✅ <strong>Customizable:</strong> Configurable total visible pages</li>
            <li>✅ <strong>Responsive:</strong> Adapts to different screen sizes</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PaginationDemo;
