/**
 * @secureloop/ui
 *
 * React component library for the SecureLoop GRC Platform.
 * Built on @secureloop/design-system.
 *
 * Usage:
 *   import '@secureloop/design-system';      // register themes
 *   import { ThemeProvider, Button } from '@secureloop/ui';
 *
 *   <ThemeProvider defaultTheme="coffee-dark">
 *     <Button variant="primary">Save</Button>
 *   </ThemeProvider>
 */

// Theme state
export * from './components/ThemeProvider';
export * from './components/ThemePicker';
export * from './components/DensityToggle';

// App shell
export * from './components/Shell';

// Primitives
export * from './components/Button';
export * from './components/Card';
export * from './components/Badge';
export * from './components/Chip';
export * from './components/Input';
export * from './components/Select';
export * from './components/Modal';
export * from './components/Table';
export * from './components/Icon';
export * from './components/Skeleton';
export * from './components/EmptyState';
export * from './components/LiveDot';
export * from './components/Kbd';

// Dataviz primitives
export * from './components/Gauge';

// Sprint 0 — CR-1 through CR-4
export * from './components/Wizard';
export * from './components/Callout';
export * from './components/Breadcrumb';
export * from './components/FontLoader';

// Utils
export { cn } from './utils/cn';
export { useClickOutside } from './utils/useClickOutside';
