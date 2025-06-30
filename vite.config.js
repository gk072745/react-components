import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // CSS/SCSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        // Enable source maps for better debugging
        sourceMap: true,
        // Include paths for easier imports
        includePaths: ["src/assets/scss", "node_modules"],
      },
    },
    // Enable source maps for CSS
    devSourcemap: true,
  },

  // Resolve configuration for cleaner imports
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@scss": fileURLToPath(new URL("./src/assets/scss", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },

  // Build configuration
  build: {
    // Generate source maps for production builds
    sourcemap: true,
    // Optimize CSS
    cssCodeSplit: true,
    // Rollup options for better tree shaking
    rollupOptions: {
      output: {
        // Separate vendor chunks for better caching
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  // Development server configuration
  server: {
    // Enable hot module replacement
    hmr: true,
    // Open browser automatically
    open: true,
    // Configure port
    port: 3000,
    // Enable CORS for development
    cors: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
