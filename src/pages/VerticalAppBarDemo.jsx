import React, { useState } from 'react';
import VerticalAppBar from '../components/sharedComponents/VerticalAppBar';

const VerticalAppBarDemo = () => {
  // =============================================================================
  // STATE MANAGEMENT
  // =============================================================================
  const [showBasic, setShowBasic] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showLeftRight, setShowLeftRight] = useState(false);
  const [showRightOnly, setShowRightOnly] = useState(false);
  const [showNested, setShowNested] = useState(false);
  const [mountedDemo, setMountedDemo] = useState(null);
  const [activeItem, setActiveItem] = useState('');
  const [activeItemRight, setActiveItemRight] = useState('');
  const [activeNestedItem, setActiveNestedItem] = useState('');

  

  // =============================================================================
  // SAMPLE DATA
  // =============================================================================
  const logoSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14l-5-4.87l6.91-1.01L12 2z"/></svg>';

  const navigationItems = [
    {
      label: 'Dashboard',
      value: 'dashboard',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3v6h8V3m-8 18h8v-6h-8M3 21h8v-6H3m0-2h8V3H3v10Z"/></svg>',
    },
    {
      label: 'Users',
      value: 'users',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2m4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7h-2.08c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.15.45.15.95.64 1.05c.49.1.99-.2 1.14-.65L16.5 11h1.31l.95 2.85L17 16v6m-8-8.5c1.84 0 5.5.5 5.5 2.5V18H2v-2c0-2 3.66-2.5 5.5-2.5M7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5S4 6.57 4 10s1.57 2 3.5 2"/></svg>',
    },
    {
      label: 'Settings',
      value: 'settings',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>',
    },
  ];

  const nestedItems = [
    {
      label: 'Content',
      value: 'content',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11Z"/></svg>',
      children: [
        {
          label: 'Posts',
          value: 'posts',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-5 14H7v-2h7v2m3-4H7v-2h10v2m0-4H7V7h10v2Z"/></svg>',
        },
        {
          label: 'Pages',
          value: 'pages',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
        },
      ],
    },
    {
      label: 'Analytics',
      value: 'analytics',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',
    },
  ];

  const nestedItemsDeep = [
    {
      label: 'Management',
      value: 'management',
      children: [
        {
          label: 'Projects',
          value: 'projects',
          children: [
            { label: 'Roadmap', value: 'roadmap' },
            {
              label: 'Backlog',
              value: 'backlog',
              children: [
                { label: 'Bugs', value: 'bugs' },
                { label: 'Features', value: 'features' },
              ],
            },
          ],
        },
        {
          label: 'Teams',
          value: 'teams',
          children: [
            { label: 'Frontend', value: 'frontend' },
            {
              label: 'Backend',
              value: 'backend',
              children: [
                { label: 'API', value: 'api' },
                { label: 'Services', value: 'services' },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Reports',
      value: 'reports',
      children: [
        { label: 'Daily', value: 'daily' },
        { label: 'Monthly', value: 'monthly' },
      ],
    },
  ];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div className="vertical-app-bar-demo">
      <h1>VerticalAppBar Demo</h1>

      <h3>Nested Items Demo</h3>
      <div className="app-bar-container">
        {mountedDemo === 'nested' && (
          <VerticalAppBar 
            modelValue={showNested} 
            onModelValueChange={setShowNested}
            title="Nested Navigation"
            logo={logoSvg}
            items={nestedItemsDeep}
            activeItem={activeNestedItem}
            onActiveItemChange={setActiveNestedItem}
            showChevron={true}
            multiExpand={false}
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'nested' && showNested ? '20rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'nested' ? null : 'nested')}>
            {mountedDemo === 'nested' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowNested(!showNested)} style={{ marginLeft: '0.5rem' }}>
            {showNested ? 'Close' : 'Open'} Nested
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'nested').toString()}</code></p>
          <p>Active Item: <code>{activeNestedItem || 'none'}</code></p>
          <p>Levels: <code>3+</code></p>
          <p>Multi Expand: <code>false</code></p>
        </div>
      </div>

      <h3>Basic Vertical App Bar</h3>
      <div className="app-bar-container">
        {mountedDemo === 'basic' && (
          <VerticalAppBar 
            modelValue={showBasic} 
            onModelValueChange={setShowBasic}
            title="Navigation" 
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'basic' && showBasic ? '20rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'basic' ? null : 'basic')}>
            {mountedDemo === 'basic' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowBasic(!showBasic)} style={{ marginLeft: '0.5rem' }}>
            {showBasic ? 'Close' : 'Open'} App Bar
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'basic').toString()}</code></p>
          <p>App Bar Visible: <code>{showBasic.toString()}</code></p>
          <p>Position: <code>left</code></p>
          <p>Width: <code>20rem (default)</code></p>
        </div>
      </div>

      <h3>App Bar with Logo</h3>
      <div className="app-bar-container">
        {mountedDemo === 'logo' && (
          <VerticalAppBar 
            modelValue={showLogo} 
            onModelValueChange={setShowLogo}
            title="My App" 
            logo={logoSvg}
            roundedLogo={true}
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'logo' && showLogo ? '20rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'logo' ? null : 'logo')}>
            {mountedDemo === 'logo' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowLogo(!showLogo)} style={{ marginLeft: '0.5rem' }}> 
            {showLogo ? 'Close' : 'Open'} App Bar
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'logo').toString()}</code></p>
          <p>Logo Shape: <code>rounded</code></p>
          <p>Logo Type: <code>SVG icon</code></p>
          <p>Has Close Button: <code>true</code></p>
        </div>
      </div>

      <h3>Custom Styling</h3>
      <div className="app-bar-container">
        {mountedDemo === 'custom' && (
          <VerticalAppBar 
            modelValue={showCustom} 
            onModelValueChange={setShowCustom}
            title="Custom Style"
            backgroundColor="#34495e"
            titleColor="#ecf0f1"
            width="250px"
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'custom' && showCustom ? '250px' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'custom' ? null : 'custom')}>
            {mountedDemo === 'custom' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowCustom(!showCustom)} style={{ marginLeft: '0.5rem' }}>Toggle Custom App Bar</button>
          <p>DOM Mounted: <code>{(mountedDemo === 'custom').toString()}</code></p>
          <p>Background: <code>#34495e</code></p>
          <p>Title Color: <code>#ecf0f1</code></p>
          <p>Width: <code>250px</code></p>
          <p>Elevation: <code>true</code></p>
          <p>Sticky: <code>true</code></p>
        </div>
      </div>

      <h3>With Navigation Items</h3>
      <div className="app-bar-container">
        {mountedDemo === 'navigation' && (
          <VerticalAppBar 
            modelValue={showNavigation} 
            onModelValueChange={setShowNavigation}
            title="Dashboard"
            logo={logoSvg}
            items={navigationItems}
            activeItem={activeItem}
            onActiveItemChange={setActiveItem}
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'navigation' && showNavigation ? '20rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'navigation' ? null : 'navigation')}>
            {mountedDemo === 'navigation' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowNavigation(!showNavigation)} style={{ marginLeft: '0.5rem' }}>
            {showNavigation ? 'Close' : 'Open'} Navigation
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'navigation').toString()}</code></p>
          <p>Active Item: <code>{activeItem || 'none'}</code></p>
          <p>Items Count: <code>{navigationItems.length}</code></p>
          <p>Show Chevron: <code>true</code></p>
          <p>Multi Expand: <code>true</code></p>
          <p>Has Icons: <code>true</code></p>
        </div>
      </div>

      <h3>Advanced Features</h3>
      <div className="app-bar-container">
        {mountedDemo === 'advanced' && (
          <VerticalAppBar 
            modelValue={showAdvanced} 
            onModelValueChange={setShowAdvanced}
            title="Advanced"
            logo={logoSvg}
            items={nestedItems}
            persistIconsOnHide={true}
            expandOnHover={true}
            multiExpand={true}
            position="left"
            backgroundColor="#fff3e0"
            titleColor="#f57722"
          />
        )}
        <div className="content" style={{ marginLeft: mountedDemo === 'advanced' && showAdvanced ? '20rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'advanced' ? null : 'advanced')}>
            {mountedDemo === 'advanced' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ marginLeft: '0.5rem' }}>
            Toggle Advanced App Bar
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'advanced').toString()}</code></p>
          <p>Persist Icons: <code>true</code></p>
          <p>Expand on Hover: <code>true</code></p>
          <p>Multi Expand: <code>true</code></p>
          <p>Nested Items: <code>{nestedItems.length}</code></p>
          <p>Background: <code>#fff3e0</code></p>
          <p>Title Color: <code>#f57722</code></p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            This demo shows nested navigation with hover expansion and icon persistence.
          </p>
        </div>
      </div>

      <h3>Left & Right Positioning</h3>
      <div className="app-bar-container">
        {mountedDemo === 'leftright' && (
          <VerticalAppBar 
            modelValue={showLeftRight} 
            onModelValueChange={setShowLeftRight}
            title="Left Bar"
            logo={logoSvg}
            items={navigationItems}
            activeItem={activeItem}
            onActiveItemChange={setActiveItem}
            position="left"
            width="18rem"
            backgroundColor="#e3f2fd"
            titleColor="#1976d2"
          />
        )}
        {mountedDemo === 'leftright' && (
          <VerticalAppBar 
            modelValue={showLeftRight} 
            onModelValueChange={setShowLeftRight}
            title="Right Bar"
            logo={logoSvg}
            items={navigationItems.slice(0, 2)} // Fewer items for right bar
            activeItem={activeItemRight}
            onActiveItemChange={setActiveItemRight}
            position="right"
            width="16rem"
            backgroundColor="#f3e5f5"
            titleColor="#7b1fa2"
            overlay={false}
          />
        )}
        <div className="content" style={{ 
          marginLeft: mountedDemo === 'leftright' && showLeftRight ? '18rem' : '0',
          marginRight: mountedDemo === 'leftright' && showLeftRight ? '16rem' : '0'
        }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'leftright' ? null : 'leftright')}>
            {mountedDemo === 'leftright' ? 'Unmount' : 'Mount'} App Bars
          </button>
          <button onClick={() => setShowLeftRight(!showLeftRight)} style={{ marginLeft: '0.5rem' }}>
            Toggle Both App Bars
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'leftright').toString()}</code></p>
          <p>Left Active: <code>{activeItem || 'none'}</code></p>
          <p>Right Active: <code>{activeItemRight || 'none'}</code></p>
          <p>Left Position: <code>left</code></p>
          <p>Right Position: <code>right</code></p>
          <p>Left Width: <code>18rem</code></p>
          <p>Right Width: <code>16rem</code></p>
          <p>Right Overlay: <code>false</code></p>
        </div>
      </div>

      <h3>Right Position Only</h3>
      <div className="app-bar-container">
        {mountedDemo === 'rightonly' && (
          <VerticalAppBar 
            modelValue={showRightOnly} 
            onModelValueChange={setShowRightOnly}
            title="Right Navigation"
            logo={logoSvg}
            items={navigationItems}
            position="right"
            width="22rem"
            backgroundColor="#fce4ec"
            titleColor="#c2185b"
            persistIconsOnHide={true}
            expandOnHover={true}
          />
        )}
        <div className="content" style={{ marginRight: mountedDemo === 'rightonly' && showRightOnly ? '22rem' : '0' }}>
          <button onClick={() => setMountedDemo(mountedDemo === 'rightonly' ? null : 'rightonly')}>
            {mountedDemo === 'rightonly' ? 'Unmount' : 'Mount'} App Bar
          </button>
          <button onClick={() => setShowRightOnly(!showRightOnly)} style={{ marginLeft: '0.5rem' }}>
            Toggle Right App Bar
          </button>
          <p>DOM Mounted: <code>{(mountedDemo === 'rightonly').toString()}</code></p>
          <p>Position: <code>right</code></p>
          <p>Width: <code>22rem</code></p>
          <p>Background: <code>#fce4ec</code></p>
          <p>Title Color: <code>#c2185b</code></p>
          <p>Persist Icons: <code>true</code></p>
          <p>Expand on Hover: <code>true</code></p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            This right-positioned app bar demonstrates right-side navigation with hover expansion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerticalAppBarDemo;