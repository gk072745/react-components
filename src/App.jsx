import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import SidePanel from './components/sharedComponents/SidePanel';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const handleToggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="App">
      <SidePanel isOpen={isSidePanelOpen} onToggle={handleToggleSidePanel} />
      <Navbar onToggleSidePanel={handleToggleSidePanel} />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
