# Apni Zameen Unified CSS Architecture

This directory contains the unified CSS approach for the Apni Zameen real estate platform. The goal is to maintain consistent styling across all pages and components.

## Core Files

- **global.css**: The main CSS file imported by the application. It includes Tailwind directives and custom component styles.

## CSS Approach

We follow these principles for consistent styling:

1. **Tailwind CSS First**: Use Tailwind CSS utility classes whenever possible for styling.
2. **Component Classes**: For reusable patterns, we define component classes in global.css.
3. **Dark Mode Support**: All components should have both light and dark mode variants.
4. **Semantic Classes**: We use semantic class names like `property-card` instead of utility combinations.

## Usage in Components

To use these styles in a component:

```jsx
import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const ExamplePage = () => {
  return (
    <PageLayout pageTitle="Example Page">
      <div className="page-container">
        {/* Use semantic component classes */}
        <div className="property-card">
          <div className="property-card-body">
            <h3 className="property-card-title">Property Title</h3>
            <p className="property-card-location">Property Location</p>
            <p className="property-card-price">₹50,00,000</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
```

## Updating Existing Pages

To convert pages to use the unified layout:

1. Run the conversion script: `node scripts/convertPagesToUnifiedLayout.js`
2. Review the pages that need changes
3. Run with the update flag: `node scripts/convertPagesToUnifiedLayout.js --update`

## CSS Dependencies

We use several dependencies to enhance our styling capabilities:

- **Tailwind CSS**: Utility-first CSS framework
- **@headlessui/react**: Unstyled, accessible UI components
- **@heroicons/react**: SVG icons
- **@tailwindcss/forms**: Form styling utilities
- **@tailwindcss/aspect-ratio**: Aspect ratio utilities
- **@tailwindcss/typography**: Rich text content styling

To install all required dependencies:

```bash
node scripts/setup-css-dependencies.js
```

## Best Practices

1. **Use Semantic Classes**: Prefer `nav-link-active` over custom utility combinations.
2. **Build on Page Layout**: All pages should use the `PageLayout` component.
3. **Consistent Spacing**: Use Tailwind's spacing utilities consistently.
4. **Mobile First**: Design for mobile screens first, then enhance for larger screens.
5. **Color Variables**: Use color variables from the theme, not hard-coded values.

## Troubleshooting

If you see CSS inconsistencies:

1. Check if you're using the correct semantic classes
2. Verify that the page uses `PageLayout`
3. Enable the Debug CSS tool by adding the `debug` query parameter: `?debug=true`
4. Check for CSS specificity issues with inspect element 