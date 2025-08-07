/**
 * Design tokens for AnchorNavBar component
 * Provides consistent styling and theming
 */

export const ANCHOR_NAV_BAR = {
  // Container styles
  container: "flex items-center gap-2 mb-4 overflow-x-auto",
  containerSticky: "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-3 px-4",
  
  // Navigation buttons
  navButton: "whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded",
  navButtonActive: "bg-accent text-accent-foreground",
  
  // Expand/collapse button
  expandButton: "whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded",
  expandIcon: "h-4 w-4 mr-0.5",
  
  // Button variant
  buttonVariant: "ghost",
  buttonSize: "sm"
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