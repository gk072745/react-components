import React, { useState } from 'react';
import BasicBreadCrumb from '../components/sharedComponents/BasicBreadCrumb';

const BreadcrumbDemo = () => {
  const [customSeparator, setCustomSeparator] = useState('›');
  const [customGap, setCustomGap] = useState('0.5rem');

  // Example breadcrumb data
  const basicItems = [
    { label: 'Home', to: '/' },
    { label: 'Components', to: '/components' },
    { label: 'Breadcrumb', to: null, disabled: true },
  ];

  const ecommerceItems = [
    { label: 'Home', to: '/' },
    { label: 'Electronics', to: '/electronics' },
    { label: 'Computers', to: '/electronics/computers' },
    { label: 'Laptops', to: '/electronics/computers/laptops' },
    { label: 'Gaming Laptops', to: null, disabled: true },
  ];

  const fileSystemItems = [
    { label: 'Root', to: '/' },
    { label: 'Documents', to: '/documents' },
    { label: 'Work', to: '/documents/work' },
    { label: 'Projects', to: '/documents/work/projects' },
    { label: 'React App', to: null, disabled: true },
  ];

  const customSeparatorItems = [
    { label: 'Start', to: '/' },
    { label: 'Middle', to: '/middle' },
    { label: 'End', to: null, disabled: true },
  ];

  return (
    <div className="breadcrumb-demo">
      <h1>Basic Breadcrumb Component Demo</h1>

      {/* Basic Usage */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <div className="demo-group">
          <BasicBreadCrumb items={basicItems} />
        </div>
        <p>Default separator (/) and gap (0.5rem)</p>
      </section>

      {/* E-commerce Example */}
      <section className="demo-section">
        <h2>E-commerce Navigation</h2>
        <div className="demo-group">
          <BasicBreadCrumb items={ecommerceItems} separator="›" gap="0.75rem" />
        </div>
        <p>Shows a typical e-commerce breadcrumb with custom separator and gap</p>
      </section>

      {/* File System Example */}
      <section className="demo-section">
        <h2>File System Navigation</h2>
        <div className="demo-group">
          <BasicBreadCrumb items={fileSystemItems} separator="→" gap="1rem" />
        </div>
        <p>File system style navigation with arrow separator</p>
      </section>

      {/* Custom Separator */}
      <section className="demo-section">
        <h2>Custom Separator</h2>
        <div className="demo-group">
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="separator">Separator: </label>
            <input
              id="separator"
              type="text"
              value={customSeparator}
              onChange={e => setCustomSeparator(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
            />
          </div>
          <BasicBreadCrumb items={customSeparatorItems} separator={customSeparator} gap="0.5rem" />
        </div>
        <p>Try different separators like: ›, →, &gt;, |, •, etc.</p>
      </section>

      {/* SVG Separators */}
      <section className="demo-section">
        <h2>SVG Separators</h2>
        <div className="demo-group">
          <h3>Arrow Separator:</h3>
          <BasicBreadCrumb
            items={customSeparatorItems}
            separator={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            }
            gap="0.5rem"
          />

          <h3>Chevron Separator:</h3>
          <BasicBreadCrumb
            items={customSeparatorItems}
            separator={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            }
            gap="0.5rem"
          />

          <h3>Dot Separator:</h3>
          <BasicBreadCrumb
            items={customSeparatorItems}
            separator={
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
            }
            gap="0.75rem"
          />
        </div>
        <p>SVG separators provide crisp, scalable icons that maintain quality at any size.</p>
      </section>

      {/* Function Separators */}
      <section className="demo-section">
        <h2>Dynamic Separators</h2>
        <div className="demo-group">
          <h3>Function-based Separator:</h3>
          <BasicBreadCrumb
            items={customSeparatorItems}
            separator={() => (
              <span
                style={{
                  color: '#007bff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                →
              </span>
            )}
            gap="0.5rem"
          />

          <h3>Object with Render Method:</h3>
          <BasicBreadCrumb
            items={customSeparatorItems}
            separator={{
              render: () => (
                <span
                  style={{
                    color: '#28a745',
                    fontSize: '1.1rem',
                    padding: '0 0.25rem',
                  }}
                >
                  •
                </span>
              ),
            }}
            gap="0.5rem"
          />
        </div>
        <p>Use functions or objects with render methods for dynamic, context-aware separators.</p>
      </section>

      {/* Custom Gap */}
      <section className="demo-section">
        <h2>Custom Gap</h2>
        <div className="demo-group">
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="gap">Gap: </label>
            <input
              id="gap"
              type="text"
              value={customGap}
              onChange={e => setCustomGap(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
            />
          </div>
          <BasicBreadCrumb items={customSeparatorItems} separator="›" gap={customGap} />
        </div>
        <p>Try different gap values like: 0.25rem, 0.5rem, 1rem, 1.5rem</p>
      </section>

      {/* Interactive Example */}
      <section className="demo-section">
        <h2>Interactive Example</h2>
        <div className="demo-group">
          <BasicBreadCrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Demo', to: '/demo' },
              { label: 'Breadcrumb', to: '/demo/breadcrumb' },
              { label: 'Current Page', to: null, disabled: true },
            ]}
            separator="›"
            gap="0.5rem"
          />
        </div>
        <p>Click on any breadcrumb item to navigate (except the current page)</p>
      </section>

      {/* Code Examples */}
      <section className="demo-section">
        <h2>Usage Examples</h2>
        <div className="demo-group">
          <h3>Basic Implementation:</h3>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`import BasicBreadCrumb from './components/BasicBreadCrumb';

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Section', to: '/section' },
  { label: 'Current', to: null, disabled: true }
];

<BasicBreadCrumb 
  items={breadcrumbItems}
  separator="›"
  gap="0.5rem"
/>`}
          </pre>

          <h3>SVG Separator:</h3>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`<BasicBreadCrumb 
  items={breadcrumbItems}
  separator={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  }
  gap="0.5rem"
/>`}
          </pre>

          <h3>Function Separator:</h3>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`<BasicBreadCrumb 
  items={breadcrumbItems}
  separator={() => (
    <span style={{ color: '#007bff', fontSize: '1.2rem' }}>→</span>
  )}
  gap="0.5rem"
/>`}
          </pre>

          <h3>Custom Click Handler:</h3>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`<BasicBreadCrumb 
  items={breadcrumbItems}
  separator="›"
  gap="0.5rem"
  onItemClick={(item, event) => {
    console.log('Custom click:', item);
    // Custom navigation logic
  }}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default BreadcrumbDemo;
