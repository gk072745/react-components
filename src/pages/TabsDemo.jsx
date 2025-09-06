import React, { useState } from 'react';
import BasicTabs from '../components/sharedComponents/BasicTabs';

const TabsDemo = () => {
  // State for different tab examples
  const [basicTabs, setBasicTabs] = useState('tab1');
  const [multipleTabs, setMultipleTabs] = useState(['tab1', 'tab3']);
  const [singlePackedTabs, setSinglePackedTabs] = useState('tab2');
  const [bottomLineTabs, setBottomLineTabs] = useState('tab1');
  const [darkGoldTabs, setDarkGoldTabs] = useState('tab2');
  const [iconTabs, setIconTabs] = useState('home');
  const [bottomLineDarkGoldTabs, setBottomLineDarkGoldTabs] = useState('tab1');

  // Tab data
  const basicTabItems = [
    { value: 'tab1', name: 'Tab 1' },
    { value: 'tab2', name: 'Tab 2' },
    { value: 'tab3', name: 'Tab 3' },
    { value: 'tab4', name: 'Tab 4' }
  ];

  const iconTabItems = [
    { value: 'home', icon: '🏠' },
    { value: 'search', icon: '🔍' },
    { value: 'settings', icon: '⚙️' },
    { value: 'profile', icon: '👤' }
  ];

  const longTabItems = [
    { value: 'dashboard', name: 'Dashboard' },
    { value: 'analytics', name: 'Analytics' },
    { value: 'reports', name: 'Reports' },
    { value: 'settings', name: 'Settings' },
    { value: 'profile', name: 'Profile' },
    { value: 'help', name: 'Help & Support' }
  ];

  // Event handlers
  const handleTabClick = (item, setter) => {
    console.log('Tab clicked:', item);
    setter(item.value);
  };

  const handleMultipleTabClick = (item) => {
    console.log('Multiple tab clicked:', item);
    setMultipleTabs(prev => {
      if (prev.includes(item.value)) {
        return prev.filter(val => val !== item.value);
      } else {
        return [...prev, item.value];
      }
    });
  };

  return (
    <div className="tabs-demo">
      <div className="demo-header">
        <h1>Basic Tabs Component Demo</h1>
        <p>Explore different variations and styles of the BasicTabs component</p>
      </div>

      <div className="demo-section">
        <h2>Basic Tabs</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Default Style</h3>
            <BasicTabs
              tabItems={basicTabItems}
              selected={basicTabs}
              onItemClicked={(item) => handleTabClick(item, setBasicTabs)}
            />
            <p className="demo-info">Selected: {basicTabs}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Multiple Selection</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Multiple Selection Enabled</h3>
            <BasicTabs
              tabItems={basicTabItems}
              selected={multipleTabs}
              multiple={true}
              onItemClicked={handleMultipleTabClick}
            />
            <p className="demo-info">Selected: {multipleTabs.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Single Packed Style</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Connected Tabs</h3>
            <BasicTabs
              tabItems={basicTabItems}
              selected={singlePackedTabs}
              singlePacked={true}
              onItemClicked={(item) => handleTabClick(item, setSinglePackedTabs)}
            />
            <p className="demo-info">Selected: {singlePackedTabs}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Bottom Line Style</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Underline Navigation</h3>
            <BasicTabs
              tabItems={longTabItems}
              selected={bottomLineTabs}
              bottomLineStyle={true}
              onItemClicked={(item) => handleTabClick(item, setBottomLineTabs)}
            />
            <p className="demo-info">Selected: {bottomLineTabs}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Dark Gold Variant</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Dark Gold Theme</h3>
            <BasicTabs
              tabItems={basicTabItems}
              selected={darkGoldTabs}
              tabClasses={['dark-gold-tab']}
              onItemClicked={(item) => handleTabClick(item, setDarkGoldTabs)}
            />
            <p className="demo-info">Selected: {darkGoldTabs}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Icon Tabs</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Icon Only Tabs</h3>
            <BasicTabs
              tabItems={iconTabItems}
              selected={iconTabs}
              onItemClicked={(item) => handleTabClick(item, setIconTabs)}
            />
            <p className="demo-info">Selected: {iconTabs}</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Combined Styles</h2>
        <div className="demo-container">
          <div className="tabs-examples">
            <div className="tabs-example">
              <h3>Bottom Line + Dark Gold</h3>
              <BasicTabs
                tabItems={basicTabItems}
                selected={bottomLineDarkGoldTabs}
                bottomLineStyle={true}
                tabClasses={['dark-gold-tab']}
                onItemClicked={(item) => handleTabClick(item, setBottomLineDarkGoldTabs)}
              />
              <p className="demo-info">Selected: {bottomLineDarkGoldTabs}</p>
            </div>
            
            <div className="tabs-example">
              <h3>Single Packed + Dark Gold</h3>
              <BasicTabs
                tabItems={basicTabItems}
                selected={singlePackedTabs}
                singlePacked={true}
                tabClasses={['dark-gold-tab']}
                onItemClicked={(item) => handleTabClick(item, setSinglePackedTabs)}
              />
              <p className="demo-info">Selected: {singlePackedTabs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Custom Slots Example</h2>
        <div className="demo-container">
          <div className="tabs-example">
            <h3>Tabs with Custom Content</h3>
            <BasicTabs
              tabItems={[
                { value: 'tab1', name: 'Tab 1' },
                { value: 'tab2', name: 'Tab 2' },
                { value: 'tab3', name: 'Tab 3' }
              ]}
              selected={basicTabs}
              onItemClicked={(item) => handleTabClick(item, setBasicTabs)}
            >
              {({ name, item }) => {
                if (name === 'tab-icon') {
                  return (
                    <span>
                      {item.value === 'tab1' && '📊 '}
                      {item.value === 'tab2' && '📈 '}
                      {item.value === 'tab3' && '📉 '}
                      {item.name}
                    </span>
                  );
                }
                return null;
              }}
            </BasicTabs>
            <p className="demo-info">Selected: {basicTabs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsDemo;
