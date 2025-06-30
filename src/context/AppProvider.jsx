import { AppContext } from './AppContext.js';

// Import your constants and images
import Constants from '../constants/index.js';
import images from '../assets/getAssets.js';

// Provider component
export const AppProvider = ({ children }) => {
  const appData = {
    Constants,
    appImages: images,
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
