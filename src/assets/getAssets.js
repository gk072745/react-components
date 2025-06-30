// Use a recursive glob pattern to include subdirectories
const modules = import.meta.glob('./**/*.@(jpg|png|gif|svg)', { eager: true });
let images = {};

for (const path in modules) {
  // The import.meta.glob with the eager option returns the actual modules directly
  // So, you don't need to await the import here, just extract the default export
  const imageModule = modules[path].default;

  // Extract only the file name from the path, ignoring directories
  const fileName = path.split('/').pop(); // This gets the last segment after the last '/'
  images[fileName] = imageModule;
}

export default images;
