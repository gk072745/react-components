import { AppContext } from './AppContext.js';

// Import your constants and images
import Constants from '../constants/index.js';
import images from '../assets/getAssets.js';
import { remToPixels } from '../customHooks/useRemToPixels.js';

// Provider component
export const AppProvider = ({ children }) => {
  const appData = {
    Constants,
    appImages: images,
    convertRemToPixels: remToPixels,
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
