/**
 * Design tokens for AnchorNavBar component
 * Provides consistent styling and theming
 */

export const ANCHOR_NAV_BAR = {
  // Container styles
  container: "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
  inner: "container max-w-7xl mx-auto",
  content: "flex items-center justify-between py-3 px-4",
  
  // Navigation section
  navigation: "flex items-center space-x-2 overflow-x-auto",
  navButton: "whitespace-nowrap transition-all duration-200",
  navButtonActive: "bg-primary text-primary-foreground shadow-sm",
  navButtonInactive: "text-muted-foreground hover:text-foreground hover:bg-muted",
  
  // Expand/collapse button
  expandButton: "ml-4 flex items-center space-x-1",
  expandIcon: "h-4 w-4",
  expandText: "hidden sm:inline",
  
  // Responsive overrides
  mobile: {
    container: "px-2",
    navigation: "space-x-1",
    expandText: "hidden"
  }
} as const;

export const ANCHOR_NAV_BAR_ANIMATION = {
  // Smooth scroll behavior
  scrollBehavior: "smooth",
  scrollOffset: 80,
  
  // Button transitions
  buttonTransition: "transition-all duration-200",
  
  // Backdrop blur
  backdropBlur: "backdrop-blur supports-[backdrop-filter]:bg-background/60"
} as const;

export const ANCHOR_NAV_BAR_INTERSECTION = {
  // IntersectionObserver defaults
  rootMargin: "0px 0px -80% 0px",
  threshold: 0.1,
  
  // Section detection
  sectionSelector: '[data-ennabl-component="section"]',
  titleSelector: '[data-ennabl-element="title"]'
} as const;