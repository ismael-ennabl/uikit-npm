/**
 * Design tokens for AnchorNavBar component
 * Provides consistent styling and theming
 */

export const ANCHOR_NAV_BAR = {
  // Container styles
  container: "top-0 z-40 transition-all duration-300 ease-in-out",
  containerSticky: "sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm",
  innerContainer: "max-w-7xl mx-auto",
  content: "flex items-center space-x-2 overflow-x-auto py-3 bg-page",
  
  // Navigation buttons
  navButton: "shrink-0 font-normal text-sm border-0 transition-all duration-200",
  navButtonActive: "bg-[#0000c5]/[0.08] text-[#0000c5] hover:bg-[#0000c5]/[0.12]",
  navButtonInactive: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  
  // Expand/collapse button
  expandButton: "flex items-center space-x-0.5 shrink-0 font-normal text-sm border-0",
  expandIcon: "h-4 w-4",
  expandText: "hidden sm:inline",
  
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
  rootMargin: "0px 0px -50% 0px",
  threshold: [0, 0.1, 0.5, 1],
  
  // Sticky detection
  stickyRootMargin: "-1px 0px 0px 0px",
  stickyThreshold: [0, 1],
  
  // Section detection
  sectionSelector: '[data-ennabl-component="section"]',
  titleSelector: '[data-ennabl-element="title"]'
} as const;