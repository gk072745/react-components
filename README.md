# React Boilerplate

A modern, scalable, and maintainable React boilerplate with SCSS, i18n, global context, and best practices for professional web development.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [SCSS Architecture](#scss-architecture)
- [SCSS Usage Examples](#scss-usage-examples)
- [SCSS Best Practices](#scss-best-practices)
- [Routing](#routing)
- [State Management](#state-management)
- [Internationalization (i18n)](#internationalization-i18n)
- [Global Context (AppContext)](#global-context-appcontext)
- [Utilities & Custom Hooks](#utilities--custom-hooks)
- [Linting & Formatting](#linting--formatting)
- [Scripts](#scripts)
- [Extending the Boilerplate](#extending-the-boilerplate)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This React boilerplate is designed for scalable, maintainable, and modern web applications. It features:

- Modular SCSS with a scalable architecture
- React Router for navigation
- Global state/context for app-wide data
- Internationalization (i18n) with `react-i18next`
- Pre-configured ESLint and Prettier for code quality and consistency
- Vite for fast development and optimized builds

---

## Folder Structure

```
react-boiler-plate/
├── public/                # Static assets
├── src/
│   ├── assets/
│   │   ├── images/        # Image assets and index.js for image exports
│   │   └── scss/          # SCSS (7-1 pattern)
│   │       ├── abstracts/ # Variables, functions, mixins, breakpoints
│   │       ├── base/      # Base styles (reset, typography, base)
│   │       ├── components/# Reusable components
│   │       ├── layout/    # Layout components
│   │       ├── pages/     # Page-specific styles
│   │       ├── utilities/ # Utility classes
│   │       └── main.scss  # Main entry point
│   ├── components/        # Reusable React components
│   ├── constants/         # Application-wide constants
│   ├── context/           # AppContext and AppProvider for global state
│   ├── customHooks/       # Custom React hooks
│   ├── hooks/             # Additional hooks (e.g., useAppContext, useTranslation)
│   ├── i18n/              # i18n config and locale files
│   ├── layouts/           # Layout components (if any)
│   ├── pages/             # Page-level components
│   ├── router/            # React Router configuration
│   ├── stores/            # Zustand or other state stores
│   ├── main.jsx           # App entry point
│   └── App.jsx            # Main App component
├── .prettierrc.json       # Prettier config
├── eslint.config.js       # ESLint config (flat config)
├── jsConfig.json          # JS path aliases for IDE support
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## Key Features

- **Vite**: Lightning-fast dev server and build tool.
- **SCSS**: Modular, scalable, and maintainable styling.
- **React Router**: Modern routing for SPA navigation.
- **AppContext**: Global state and utility provider.
- **i18n**: Internationalization with language detection and dynamic switching.
- **ESLint & Prettier**: Enforced code quality and style.
- **Path Aliases**: Clean and maintainable imports.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

---

## SCSS Architecture

This project uses a **SCSS-only approach** - all CSS files have been removed and replaced with a comprehensive SCSS architecture following the 7-1 pattern. We use direct CSS values for simplicity while maintaining the power of SCSS variables and mixins.

### 7-1 Pattern Structure

- **abstracts/**: Variables, functions, mixins, breakpoints
- **base/**: Base styles (reset, typography, base)
- **components/**: Reusable components
- **layout/**: Layout components
- **pages/**: Page-specific styles
- **utilities/**: Utility classes
- **main.scss**: Main entry point

### Global Imports

All partials are imported in `main.scss`:

```scss
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/breakpoints';
@import 'base/reset';
@import 'base/typography';
@import 'base/base';
@import 'components/counter';
@import 'components/example';
@import 'components/simple-example';
@import 'layout/header';
@import 'layout/navbar';
@import 'pages/home';
@import 'pages/about';
@import 'pages/auth';
@import 'pages/counter-page';
@import 'pages/not-found';
@import 'utilities/spacing';
```

### Available Features

#### Variables

- **Colors**: `$primary-color`, `$secondary-color`, `$success-color`, `$danger-color`
- **Neutral Colors**: `$white`, `$black`, `$gray-100` through `$gray-900`
- **Typography**: `$font-family-base`, `$font-weight-light` through `$font-weight-extrabold`
- **Transitions**: `$transition-fast`, `$transition-base`, `$transition-slow`

#### Direct Values Approach

- **Spacing**: Use direct values like `1rem`, `1.5rem`, `2rem`, `4rem`
- **Border Radius**: Use direct values like `0.5rem`, `1rem`
- **Shadows**: Use direct values like `0 2px 4px rgba(0, 0, 0, 0.1)`
- **Media Queries**: Use direct breakpoints like `@media (min-width: 768px)`

---

## SCSS Usage Examples

### 1. Layout Component (Navbar)

```jsx
// components/Navbar.jsx
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="navbar-logo">React boilerplate</h1>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
```

```scss
// layout/_navbar.scss
.navbar {
  background-color: $white;
  border-bottom: 1px solid $gray-300;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
      padding: 1.5rem;
    }
  }

  .navbar-brand {
    .navbar-logo {
      color: $primary-color;
      font-size: 1.5rem;
      font-weight: $font-weight-bold;
      margin: 0;
    }
  }
}
```

### 2. Component Example (Counter)

```jsx
// components/Counter.jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <div className="counter-header">
        <h2 className="counter-title">Counter Component</h2>
      </div>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
};
```

```scss
// components/_counter.scss
.counter {
  background-color: $white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;

  .counter-header {
    margin-bottom: 2rem;

    .counter-title {
      color: $primary-color;
      font-size: 2rem;
      font-weight: $font-weight-bold;
      margin-bottom: 0.5rem;
    }
  }

  .counter-display {
    background-color: $gray-100;
    border-radius: 0.5rem;
    padding: 2rem;
    margin-bottom: 2rem;

    .counter-value {
      font-size: 4rem;
      font-weight: $font-weight-bold;
      color: $primary-color;
      display: block;
    }
  }

  .counter-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
```

### 3. Page Example (HomePage)

```jsx
// pages/HomePage.jsx
const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to React boilerplate</h1>
        </section>
        <section className="counter-section">
          <Counter />
        </section>
      </main>
    </div>
  );
};
```

```scss
// pages/_home.scss
.home-page {
  min-height: 100vh;
  background-color: $gray-100;

  .main-content {
    .hero-section {
      background: linear-gradient(135deg, $primary-color, $primary-dark);
      color: $white;
      padding: 4rem 0;
      text-align: center;

      .hero-title {
        font-size: 3rem;
        font-weight: $font-weight-bold;
        margin-bottom: 1.5rem;
      }
    }

    .counter-section {
      padding: 4rem 0;
      background-color: $white;
    }
  }
}
```

---

## SCSS Best Practices

### Adding New Components

```scss
// components/_new-component.scss
.new-component {
  // Use variables for colors and typography
  background-color: $primary-color;
  color: $white;
  font-weight: $font-weight-bold;

  // Use direct values for spacing
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;

  // Use media queries directly
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}
```

Then import in `main.scss`:

```scss
// main.scss
@import 'components/new-component';
```

### Responsive Design

```scss
// Mobile first approach
.component {
  // Mobile styles (default)
  padding: 1rem;

  // Tablet and up
  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  // Desktop and up
  @media (min-width: 1024px) {
    padding: 2rem;
  }
}
```

### Development Guidelines

1. **Use variables for design tokens** (colors, typography, transitions)
2. **Use direct values for layout** (spacing, border-radius, shadows)
3. **Mobile-first responsive design**
4. **Keep nesting shallow** (max 3 levels)
5. **Use descriptive class names**
6. **Organize by component type** (layout, components, pages)

---

## Routing

- **File**: `src/router/index.jsx`
- **Library**: `react-router-dom`
- **Usage**: Define routes and nested layouts.

**Example:**

```jsx
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/HomePage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  // ...other routes
]);

export default router;
```

---

## State Management

- **Global State**: Provided via `AppContext` and `AppProvider`.
- **Zustand**: For more complex or feature-specific state, use `src/stores/`.

---

## Internationalization (i18n)

- **Library**: `react-i18next`
- **Config**: `src/i18n/index.js`
- **Locales**: `src/i18n/locales/en.json` (add more as needed)
- **Usage**: Use the custom `useTranslation` hook.

**Example:**

```jsx
import { useTranslation } from '@hooks/useTranslation';

const { t, changeLanguage } = useTranslation();
return <h1>{t('home.title')}</h1>;
```

---

## Global Context (AppContext)

- **Files**: `src/context/AppContext.js`, `src/context/AppProvider.jsx`
- **Usage**: Access constants, images, user state, and utility functions anywhere in the app.

**Example:**

```jsx
import { useAppContext } from '@hooks/useAppContext';

const { Constants, images, user } = useAppContext();
```

---

## Utilities & Custom Hooks

- **Location**: `src/customHooks/` and `src/hooks/`
- **Examples**: `useCommonUtilities`, `useAppContext`, `useTranslation`

---

## Linting & Formatting

- **ESLint**: Configured with React, Prettier, and best practices.
- **Prettier**: Enforces code style.
- **Run Lint**: `npm run lint`
- **Format Code**: `npm run format`

---

## Scripts

| Script  | Description               |
| ------- | ------------------------- |
| dev     | Start Vite dev server     |
| build   | Build for production      |
| preview | Preview production build  |
| lint    | Run ESLint                |
| format  | Format code with Prettier |

---

## Extending the Boilerplate

- **Add Pages**: Create new files in `src/pages/` and add routes.
- **Add Components**: Place reusable components in `src/components/`.
- **Add SCSS**: Create new partials and import them in `main.scss`.
- **Add Locales**: Add new JSON files in `src/i18n/locales/` and update i18n config.
- **Add State**: Use Zustand in `src/stores/` or extend AppContext.

---

## Best Practices

- Use path aliases for cleaner imports.
- Keep components small and focused.
- Use SCSS variables and mixins for consistency.
- Use context for truly global data; use Zustand or local state for feature-specific data.
- Keep translations organized and up-to-date.
- Run lint and format before committing code.

---

## Troubleshooting

- **SCSS Import Errors**: Ensure all partials exist and are imported in `main.scss`.
- **i18n Not Working**: Make sure `i18n/index.js` is imported in `main.jsx` before rendering the app.
- **Context Not Available**: Ensure components are wrapped in `<AppProvider>`.
- **Path Alias Issues**: Check `jsConfig.json` and Vite config for correct alias setup.

---

## Example Usage

**Accessing a Constant and Translation:**

```jsx
import { useAppContext } from '@hooks/useAppContext';
import { useTranslation } from '@hooks/useTranslation';

const { Constants } = useAppContext();
const { t } = useTranslation();

return (
  <div>
    <h1>{t('home.title')}</h1>
    <p>{Constants.WELCOME_MESSAGE}</p>
  </div>
);
```

---

## Contributing

1. Fork the repo and create a new branch.
2. Make your changes.
3. Run lint and format scripts.
4. Submit a pull request with a clear description.

---

**This boilerplate is ready for scalable, maintainable, and modern React development. Happy coding! 🚀**
