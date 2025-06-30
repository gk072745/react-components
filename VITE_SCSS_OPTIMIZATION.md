# Vite SCSS Optimization Guide

This guide explains the optimized SCSS setup for large-scale React projects using Vite with practical examples.

## 🎯 Overview

This project uses a **SCSS-only approach** - all CSS files have been removed and replaced with a comprehensive SCSS architecture following the 7-1 pattern. We use direct CSS values for simplicity while maintaining the power of SCSS variables and mixins.

## 📁 Current File Structure

```
src/
├── assets/scss/
│   ├── abstracts/          # Variables, functions, mixins, breakpoints
│   ├── base/               # Base styles (reset, typography, base)
│   ├── components/         # Reusable components
│   ├── layout/             # Layout components
│   ├── pages/              # Page-specific styles
│   ├── utilities/          # Utility classes
│   └── main.scss           # Main entry point
├── components/
│   └── Counter.jsx        # Counter component
├── pages/
│   └── HomePage.jsx       # Home page component
├── layout/
│   └── Navbar.jsx         # Navigation component
│   └── Footer.jsx         # Footer component
│   └── Sidebar.jsx        # Sidebar component
└── App.jsx                # Main app component
```

## 🚀 Usage Examples

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

## 🎨 Available Features

### Variables

- **Colors**: `$primary-color`, `$secondary-color`, `$success-color`, `$danger-color`
- **Neutral Colors**: `$white`, `$black`, `$gray-100` through `$gray-900`
- **Typography**: `$font-family-base`, `$font-weight-light` through `$font-weight-extrabold`
- **Transitions**: `$transition-fast`, `$transition-base`, `$transition-slow`

### Direct Values Approach

- **Spacing**: Use direct values like `1rem`, `1.5rem`, `2rem`, `4rem`
- **Border Radius**: Use direct values like `0.5rem`, `1rem`
- **Shadows**: Use direct values like `0 2px 4px rgba(0, 0, 0, 0.1)`
- **Media Queries**: Use direct breakpoints like `@media (min-width: 768px)`

## 🔧 Development Workflow

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
@import "components/new-component";
```

## 📱 Responsive Design

### Media Query Breakpoints

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

## 🏗️ Build Optimization

### Production Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

## 📚 Best Practices

1. **Use variables for design tokens** (colors, typography, transitions)
2. **Use direct values for layout** (spacing, border-radius, shadows)
3. **Mobile-first responsive design**
4. **Keep nesting shallow** (max 3 levels)
5. **Use descriptive class names**
6. **Organize by component type** (layout, components, pages)

This approach provides better organization, maintainability, and scalability for large projects while keeping the code simple and readable.
