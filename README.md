# React Boilerplate

A modern, scalable, and maintainable React boilerplate with SCSS, i18n, global context, and best practices for professional web development.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [SCSS Architecture](#scss-architecture)
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

- **7-1 Pattern**: Abstracts, base, components, layout, pages, themes, utilities, main.scss.
- **Global Imports**: All partials are imported in `main.scss`.
- **Vite Integration**: SCSS is natively supported and optimized.

**Example Import:**

```scss
@import 'abstracts/variables';
@import 'base/reset';
@import 'components/button';
```

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
