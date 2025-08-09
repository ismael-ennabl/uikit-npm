// App tokens now source shared styles from the library to ensure consistency
// Shared tokens from the component library
import {
  TYPOGRAPHY as LIB_TYPOGRAPHY,
  COMPONENTS as LIB_COMPONENTS,
  METRICS as LIB_METRICS,
  SELECTION_TOOLBAR as LIB_SELECTION_TOOLBAR,
  SECTION_HEADER as LIB_SECTION_HEADER,
  TOOLTIP_STYLES as LIB_TOOLTIP_STYLES,
} from '../../lib/tokens';

export const TYPOGRAPHY = LIB_TYPOGRAPHY;
export const COMPONENTS = LIB_COMPONENTS;
export const METRICS = LIB_METRICS;
export const SELECTION_TOOLBAR = LIB_SELECTION_TOOLBAR;
export const SECTION_HEADER = LIB_SECTION_HEADER;
export const TOOLTIP_STYLES = LIB_TOOLTIP_STYLES;

// Page layout tokens (app-specific)
export const PAGE = {
  background: 'bg-[hsl(var(--page-background))]',
  container: 'min-h-screen bg-[hsl(var(--page-background))]',
  content: 'flex flex-col min-h-screen',
} as const;

// CTA component tokens (app-specific)
export const CTA = {
  // CTA Primary - Brand blue background
  primary:
    'bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90 font-medium transition-colors duration-200',

  // CTA Secondary - Subtle background with brand blue accents
  secondary:
    'bg-background text-brand-blue border border-input hover:bg-hover-brand-blue font-medium transition-colors duration-200',

  // Shared CTA styles
  base:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  size: 'h-10 px-4 py-2',
} as const;