# SCSS Architecture Documentation

This document outlines the SCSS architecture for large-scale React projects. The setup follows the 7-1 pattern and provides a comprehensive foundation for scalable styling.

## 📁 Folder Structure

```
src/assets/scss/
├── main.scss                 # Main entry point
├── abstracts/               # Tools and helpers
│   ├── _variables.scss     # Variables, colors, fonts, etc.
│   ├── _functions.scss     # Custom functions
│   ├── _mixins.scss        # Mixins and reusable patterns
│   └── _breakpoints.scss   # Responsive breakpoints
├── base/                   # Base styles
│   ├── _reset.scss         # CSS reset/normalize
│   ├── _typography.scss    # Typography rules
│   └── _base.scss          # Base styles
├── components/             # Reusable components
│   ├── _buttons.scss       # Button styles
│   ├── _forms.scss         # Form elements
│   ├── _cards.scss         # Card components
│   ├── _modals.scss        # Modal dialogs
│   ├── _alerts.scss        # Alert messages
│   ├── _tables.scss        # Table styles
│   ├── _badges.scss        # Badge components
│   └── _loaders.scss       # Loading indicators
├── layout/                 # Layout components
│   ├── _header.scss        # Header styles
│   ├── _footer.scss        # Footer styles
│   ├── _navigation.scss    # Navigation components
│   ├── _grid.scss          # Grid system
│   └── _sidebar.scss       # Sidebar styles
├── pages/                  # Page-specific styles
│   ├── _home.scss          # Home page styles
│   ├── _about.scss         # About page styles
│   └── _contact.scss       # Contact page styles
└── utilities/              # Utility classes
    ├── _spacing.scss       # Margin and padding utilities
    ├── _text.scss          # Text utilities
    ├── _colors.scss        # Color utilities
    ├── _flexbox.scss       # Flexbox utilities
    ├── _display.scss       # Display utilities
    └── _positioning.scss   # Position utilities
```

## 🎨 Design System

### Colors

The color system is built around a primary palette with semantic variations:

```scss
// Primary Colors
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$danger-color: #dc3545;
$warning-color: #ffc107;
$info-color: #17a2b8;

// Neutral Colors
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
```

### Typography

```scss
// Font Families
$font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  sans-serif;
$font-family-heading: $font-family-base;
$font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace;

// Font Sizes
$font-size-sm: 0.875rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;
$font-size-2xl: 1.5rem;
$font-size-3xl: 1.875rem;
$font-size-4xl: 2.25rem;
$font-size-5xl: 3rem;
```

### Spacing

The spacing system uses a consistent scale:

```scss
$spacing-unit: 0.25rem;
$spacing-xs: $spacing-unit; // 0.25rem
$spacing-sm: $spacing-unit * 2; // 0.5rem
$spacing-md: $spacing-unit * 4; // 1rem
$spacing-lg: $spacing-unit * 6; // 1.5rem
$spacing-xl: $spacing-unit * 8; // 2rem
$spacing-2xl: $spacing-unit * 12; // 3rem
$spacing-3xl: $spacing-unit * 16; // 4rem
```

## 🔧 Functions

### Color Functions

```scss
// Get color with variant
background-color: color("primary", "light");
color: color("success");

// Usage in components
.btn-primary {
  background-color: color("primary");
  &:hover {
    background-color: color("primary", "dark");
  }
}
```

### Spacing Functions

```scss
// Get spacing value
margin: spacing("lg");
padding: spacing("md");

// Usage in components
.card {
  padding: spacing("md");
  margin-bottom: spacing("lg");
}
```

## 🎯 Mixins

### Responsive Mixins

```scss
// Responsive breakpoints
@include respond-to("md") {
  .container {
    max-width: 960px;
  }
}

// Media queries
@include media-up("lg") {
  .sidebar {
    position: sticky;
  }
}

@include media-down("md") {
  .nav-menu {
    display: none;
  }
}
```

### Component Mixins

```scss
// Button variants
.btn {
  @include button-base;

  &.btn-primary {
    @include button-variant($primary-color);
  }

  &.btn-outline {
    @include button-outline($primary-color);
  }
}

// Form controls
.form-control {
  @include form-control;
}

// Cards
.card {
  @include card;
}
```

### Layout Mixins

```scss
// Flexbox utilities
.flex-center {
  @include flex-center;
}

.flex-between {
  @include flex-between;
}

// Container
.container {
  @include container;
}
```

## 📱 Responsive Design

### Breakpoints

```scss
$breakpoints: (
  "xs": 0,
  "sm": 576px,
  "md": 768px,
  "lg": 992px,
  "xl": 1200px,
  "xxl": 1400px,
);
```

### Responsive Utilities

```scss
// Responsive spacing
.m-md-lg {
  margin: 1.5rem !important;
}
.p-lg-xl {
  padding: 2rem !important;
}

// Responsive display
.d-md-none {
  display: none !important;
}
.d-lg-block {
  display: block !important;
}

// Responsive text alignment
.text-sm-center {
  text-align: center !important;
}
.text-lg-left {
  text-align: left !important;
}
```

## 🧩 Components

### Buttons

```scss
// Button variants
.btn-primary
.btn-secondary
.btn-success
.btn-danger
.btn-warning
.btn-info
.btn-light
.btn-dark

// Button styles
.btn-outline-primary
.btn-ghost
.btn-link

// Button sizes
.btn-sm
.btn-lg

// Button states
.btn-loading
.btn-block
.btn-icon
```

### Forms

```scss
// Form elements
.form-control
.form-select
.form-check
.form-switch
.form-range
.form-file

// Form states
.is-valid
.is-invalid
.was-validated

// Form layouts
.form-floating
.input-group
.form-row
```

## 🛠️ Utilities

### Spacing Utilities

```scss
// Margin
.m-md {
  margin: 1rem !important;
}
.mt-lg {
  margin-top: 1.5rem !important;
}
.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

// Padding
.p-xl {
  padding: 2rem !important;
}
.py-md {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

// Gap
.gap-sm {
  gap: 0.5rem !important;
}
.gap-x-lg {
  column-gap: 1.5rem !important;
}

// Space between children
.space-y-md > * + * {
  margin-top: 1rem !important;
}
.space-x-sm > * + * {
  margin-left: 0.5rem !important;
}
```

### Text Utilities

```scss
// Text colors
.text-primary
.text-success
.text-danger
.text-muted

// Text alignment
.text-left
.text-center
.text-right
.text-justify

// Text transform
.text-uppercase
.text-lowercase
.text-capitalize

// Font weight
.font-light
.font-normal
.font-medium
.font-semibold
.font-bold
.font-extrabold
```

### Flexbox Utilities

```scss
// Display
.d-flex
.d-inline-flex

// Direction
.flex-row
.flex-column
.flex-row-reverse
.flex-column-reverse

// Justify content
.justify-start
.justify-end
.justify-center
.justify-between
.justify-around
.justify-evenly

// Align items
.items-start
.items-end
.items-center
.items-baseline
.items-stretch

// Align self
.self-start
.self-end
.self-center
.self-baseline
.self-stretch
```

## 🎨 Usage Guidelines

### 1. Component Styling

Always use the provided mixins and functions:

```scss
// ✅ Good
.my-component {
  @include card;
  padding: spacing("md");
  color: color("primary");

  @include respond-to("md") {
    padding: spacing("lg");
  }
}

// ❌ Avoid
.my-component {
  background: white;
  border: 1px solid #ccc;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
}
```

### 2. Responsive Design

Use the responsive mixins consistently:

```scss
// ✅ Good
.responsive-component {
  width: 100%;

  @include respond-to("md") {
    width: 50%;
  }

  @include respond-to("lg") {
    width: 33.333%;
  }
}
```

### 3. Utility Classes

Prefer utility classes for simple styling:

```scss
// ✅ Good
<div className="card p-md mb-lg">
  <h2 className="text-center mb-md">Title</h2>
  <p className="text-muted">Content</p>
</div>

// ❌ Avoid
<div className="custom-card">
  <h2 className="custom-title">Title</h2>
  <p className="custom-text">Content</p>
</div>
```

### 4. Custom Components

When creating custom components, follow the established patterns:

```scss
// ✅ Good
.custom-button {
  @include button-base;
  @include button-variant($custom-color);

  &.custom-button--large {
    padding: spacing("lg") spacing("xl");
    font-size: font-size("lg");
  }

  @include respond-to("md") {
    border-radius: $border-radius-lg;
  }
}
```

## 🔄 Maintenance

### Adding New Variables

1. Add to `abstracts/_variables.scss`
2. Update documentation
3. Consider adding corresponding functions/mixins

### Adding New Components

1. Create file in appropriate folder
2. Import in `main.scss`
3. Follow naming conventions
4. Add documentation

### Adding New Utilities

1. Create file in `utilities/` folder
2. Import in `main.scss`
3. Follow utility naming patterns
4. Add responsive variants if needed

## 📚 Best Practices

1. **Use semantic naming**: Choose names that describe purpose, not appearance
2. **Follow BEM methodology**: Block\_\_Element--Modifier
3. **Keep specificity low**: Avoid deep nesting and `!important`
4. **Use CSS custom properties**: For dynamic theming
5. **Test across breakpoints**: Ensure responsive behavior works
6. **Document complex patterns**: Add comments for non-obvious code
7. **Maintain consistency**: Use established patterns and conventions

## 🚀 Performance Tips

1. **Minimize nesting**: Keep selectors shallow
2. **Use efficient selectors**: Avoid universal selectors
3. **Optimize for critical path**: Load critical styles first
4. **Use CSS containment**: For isolated components
5. **Leverage CSS Grid/Flexbox**: For modern layouts
6. **Consider CSS-in-JS**: For dynamic styling needs

This SCSS architecture provides a solid foundation for large-scale projects while maintaining flexibility and scalability.
