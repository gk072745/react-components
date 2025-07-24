import { Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
