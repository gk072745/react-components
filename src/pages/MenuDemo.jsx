import React, { useRef } from 'react';
import BasicMenu from '@/components/sharedComponents/BasicMenu.jsx';
import '@/assets/scss/pages/_menu-demo.scss';

const MenuDemo = () => {
  // React 19 ref usage - ref as a prop
  const menuRef1 = useRef(null);
  const menuRef2 = useRef(null);
  const menuItems = [
    { id: 1, label: 'Profile', icon: '👤' },
    { id: 2, label: 'Settings', icon: '⚙️' },
    { id: 3, label: 'Logout', icon: '🚪' },
  ];

  const Box = ({ children, label }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.25rem',
        background: '#f3f4f6',
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '120px',
        fontWeight: '500',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#e5e7eb';
        e.target.style.borderColor = '#9ca3af';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = '#f3f4f6';
        e.target.style.borderColor = '#d1d5db';
      }}
    >
      {children}
      {label && <span style={{ marginLeft: '0.5rem' }}>{label}</span>}
    </div>
  );

  const MenuContent = ({ items = menuItems }) => (
    <div
      style={{
        padding: '0.5rem',
        minWidth: '160px',
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            console.log('Menu item clicked:', item.label);
          }}
          style={{
            width: '100%',
            padding: '0.625rem 0.75rem',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#374151',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="menu-demo">
      <h1>BasicMenu Component Demo</h1>

      {/* Basic Positions */}
      <section className="demo-section">
        <h2>Basic Positions (Click Trigger)</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Top</Box>} placement="top">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Bottom</Box>} placement="bottom">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Left</Box>} placement="left">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Right</Box>} placement="right">
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* Corner Positions */}
      <section className="demo-section">
        <h2>Corner Positions (Click Trigger)</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Top Start</Box>} placement="top-start">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Top End</Box>} placement="top-end">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Bottom Start</Box>} placement="bottom-start">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Bottom End</Box>} placement="bottom-end">
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* Left Alignments */}
      <section className="demo-section">
        <h2>Left Alignments (Click Trigger)</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Left Start</Box>} placement="left-start">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Left Center</Box>} placement="left-center">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Left End</Box>} placement="left-end">
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* Right Alignments */}
      <section className="demo-section">
        <h2>Right Alignments (Click Trigger)</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Right Start</Box>} placement="right-start">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Right Center</Box>} placement="right-center">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Right End</Box>} placement="right-end">
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* Hover Trigger */}
      <section className="demo-section">
        <h2>Hover Trigger</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Hover Top</Box>} placement="top" triggerType="hover">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Hover Bottom</Box>} placement="bottom" triggerType="hover">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Hover Left</Box>} placement="left" triggerType="hover">
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Hover Right</Box>} placement="right" triggerType="hover">
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* Viewport Edge Testing */}
      <section className="demo-section">
        <h2>Viewport Edge Testing</h2>
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
          {/* Top Left Corner */}
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <BasicMenu trigger={<Box>Top-Left Corner</Box>} placement="bottom-start">
              <MenuContent />
            </BasicMenu>
          </div>

          {/* Top Right Corner */}
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <BasicMenu trigger={<Box>Top-Right Corner</Box>} placement="bottom-end">
              <MenuContent />
            </BasicMenu>
          </div>

          {/* Bottom Left Corner */}
          <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <BasicMenu trigger={<Box>Bottom-Left Corner</Box>} placement="top-start">
              <MenuContent />
            </BasicMenu>
          </div>

          {/* Bottom Right Corner */}
          <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <BasicMenu trigger={<Box>Bottom-Right Corner</Box>} placement="top-end">
              <MenuContent />
            </BasicMenu>
          </div>

          {/* Center */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <BasicMenu trigger={<Box>Center</Box>} placement="bottom">
              <MenuContent />
            </BasicMenu>
          </div>
        </div>
      </section>

      {/* Custom Width */}
      <section className="demo-section">
        <h2>Custom Width & Match Trigger Width</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box label="Match Width">Trigger</Box>} placement="bottom" matchTriggerWidth={true}>
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Custom 200px</Box>} placement="bottom" width={200}>
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Auto Width</Box>} placement="bottom" matchTriggerWidth={false}>
            <MenuContent items={[{ id: 1, label: 'Long Menu Item Text', icon: '📝' }]} />
          </BasicMenu>
        </div>
      </section>

      {/* Custom Offset */}
      <section className="demo-section">
        <h2>Custom Offset</h2>
        <div className="demo-group-row">
          <BasicMenu trigger={<Box>Default Offset</Box>} placement="bottom" offset={[0, 0.125]}>
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>Large Offset</Box>} placement="bottom" offset={[0, 0.5]}>
            <MenuContent />
          </BasicMenu>
          <BasicMenu trigger={<Box>No Offset</Box>} placement="bottom" offset={[0, 0]}>
            <MenuContent />
          </BasicMenu>
        </div>
      </section>

      {/* React 19 Ref Usage */}
      <section className="demo-section">
        <h2>React 19 Ref Prop Usage</h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          BasicMenu now uses React 19's ref prop syntax. You can access imperative methods like openMenu, closeMenu, toggleMenu, isOpen, and actualPlacement.
        </p>
        <div className="demo-group-row" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BasicMenu ref={menuRef1} trigger={<Box>Programmatic Control</Box>} placement="bottom">
              <MenuContent />
            </BasicMenu>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => menuRef1.current?.openMenu()}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Open Menu
              </button>
              <button
                onClick={() => menuRef1.current?.closeMenu()}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Close Menu
              </button>
              <button
                onClick={() => menuRef1.current?.toggleMenu()}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Toggle Menu
              </button>
              <button
                onClick={() => {
                  const status = menuRef1.current?.isOpen ? 'open' : 'closed';
                  const placement = menuRef1.current?.actualPlacement || 'unknown';
                  alert(`Menu is ${status}\nPlacement: ${placement}`);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Check Status
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BasicMenu
              ref={menuRef2}
              trigger={<Box>Auto-Open on Mount</Box>}
              placement="bottom-start"
              onOpen={() => console.log('Menu opened!')}
              onClose={() => console.log('Menu closed!')}
            >
              <MenuContent />
            </BasicMenu>
            <button
              onClick={() => {
                menuRef2.current?.openMenu();
                setTimeout(() => {
                  menuRef2.current?.closeMenu();
                }, 2000);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Open for 2 seconds
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuDemo;

