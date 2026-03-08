# AGENTS.md - Agentic Coding Guidelines

This is a personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
Persona-website/
├── index.html      # Main HTML file
├── styles.css      # Global styles
├── script.js       # JavaScript functionality
├── images/         # Image assets
├── .git/           # Git repository
└── AGENTS.md       # This file
```

## Build Commands

This is a **static website** - no build process is required.

- **Development**: Open `index.html` directly in a browser, or use a local server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Node.js (if available)
  npx serve .
  ```
- **Production**: Deploy the files as-is to any static hosting (GitHub Pages, Netlify, Vercel, etc.)
- **Linting**: No linter is configured. Use browser developer tools for debugging and validation. Consider using browser extensions like Lighthouse for performance audits.

### Testing

No automated tests exist. Manual testing should cover:
- Responsive design across breakpoints (mobile, tablet, desktop)
- Dark/light theme toggle functionality
- All interactive features (smooth scroll, animations, forms)

## Code Style Guidelines

### General Principles

- Keep code clean, readable, and well-organized
- Use comments to document complex logic or features
- Avoid introducing unnecessary dependencies or external libraries
- Maintain the existing visual and interactive design language
- Use early returns to reduce nesting and improve readability

### HTML (index.html)

Use semantic HTML5 elements, include proper `alt` attributes on images, use `aria-label` for accessibility, and keep attributes in consistent order (class, id, src, alt, aria-*, data-*).

```html
<nav class="navbar" id="mainNav" aria-label="Main navigation">
    <a href="#about" class="nav-link">About</a>
</nav>
```

### CSS (styles.css)

Use CSS custom properties for colors, fonts, and spacing. Group styles with section comments (e.g., `/* ==================== HEADER ==================== */`). Use mobile-first approach with `@media`. Prefer Flexbox and Grid, use `rem` units for sizing and `em` for font-relative spacing. Keep specificity low.

```css
.button {
    background: var(--accent);
    color: var(--bg-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    transition: var(--transition);
}
```

### JavaScript (script.js)

Wrap code in an IIFE with `'use strict'`. Use descriptive names, `const` by default (avoid `var`), template literals for strings, and modern ES6+ syntax (arrow functions, destructuring). Handle errors gracefully with try/catch.

### Naming Conventions

- Files: kebab-case (`script.js`)
- CSS Classes: kebab-case (`.nav-link`)
- CSS Variables: kebab-case (`--bg-primary`)
- JavaScript Functions: camelCase (`initThemeToggle`)
- HTML IDs: kebab-case (`id="themeToggle"`)

### Accessibility (a11y)

- Ensure all interactive elements are keyboard accessible (tab navigation)
- Use semantic HTML elements appropriately (`<button>` for actions, `<a>` for links)
- Include proper `alt` text for all images that describe the content
- Use `aria-label` for icon-only buttons and links
- Maintain sufficient color contrast (WCAG AA minimum of 4.5:1)
- Ensure focus states are visible for keyboard navigation

### Error Handling

Wrap DOM queries in null checks. Use try/catch for localStorage and JSON operations. Provide fallback values when data is unavailable. Log errors to console during development.

### Responsive Design

Use CSS Grid and Flexbox for layouts. Test on mobile (320px+), tablet (768px+), and desktop (1024px+). Use relative units (rem, em, %, vw/vh) for sizing. Ensure touch targets are at least 44px on mobile. Test touch interactions on actual devices when possible.

### Performance

Optimize images before adding to the project. Use modern formats like WebP where supported. Minimize the use of large external libraries. Defer non-critical scripts. Use lazy loading for below-the-fold images. Keep CSS and JS files reasonably sized. Consider minification for production deployments.

### Git Conventions

- Make small, focused commits with clear messages
- Write descriptive commit messages explaining the change
- Avoid committing sensitive data (API keys, credentials)
- Keep the `.git` directory intact for version history
- Use meaningful branch names when working with feature branches

## Existing Features

The website includes these interactive features:

- Dark/light theme toggle with localStorage persistence
- Typing effect for hero tagline with rotating phrases
- Custom cursor (desktop only) that follows mouse movement
- 3D tilt effect on project cards using CSS transforms
- Skill bar animations triggered on scroll into view
- Animated timeline reveal for experience entries
- Contact form with mailto fallback for form submission
- Mobile bottom navigation for easy thumb access
- Magnetic button hover effect that attracts cursor
- Scroll progress bar showing page position
- Navbar hide/show on scroll direction for more content space
- Smooth scroll with offset for fixed header
- Scroll reveal animations using IntersectionObserver API
- Counter animation for hero statistics
- Mobile nav toggle with auto-close on link selection
- Back-to-top button for quick navigation
- Toast notifications for user feedback

## Deployment

To deploy changes:

1. Push changes to GitHub
2. Enable GitHub Pages in repository settings (source: main branch)
3. Or connect to Netlify/Vercel for automatic deployments from the repository
4. Custom domain can be configured in the hosting provider settings

## Questions?

For questions about this codebase or to report issues, contact the project owner.

Last updated: March 2026. Created for agentic coding assistance.


