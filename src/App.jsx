import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import SidePanel from './components/sharedComponents/SidePanel';
import ErrorBoundary from './components/ErrorBoundary';
import { useRemIndicator } from './customHooks/useRemIndicator';
import OToast from './components/sharedComponents/OToast';

function App() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const { remIndicatorRef } = useRemIndicator();

  const handleToggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="App">
      <SidePanel isOpen={isSidePanelOpen} onToggle={handleToggleSidePanel} />
      <Navbar onToggleSidePanel={handleToggleSidePanel} />
      <ErrorBoundary>
        <Outlet context={{ onToggleSidePanel: handleToggleSidePanel }} />
      </ErrorBoundary>
      <OToast />
      <div
        id="remIndicator"
        ref={remIndicatorRef}
        style={{ position: 'absolute', top: -10000, left: -10000, background: 'transparent', opacity: 0, width: '1rem', height: '1rem', zIndex: 1, pointerEvents: 'none', visibility: 'hidden' }}
      />
    </div>
  );
}

export default App;
