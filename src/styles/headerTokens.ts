/**
 * Header component design tokens
 * Integrated with existing design system
 */

export const HEADER_TOKENS = {
  // Base header container
  container: "flex items-center justify-between px-6 py-4 bg-background border-b border-border",
  
  // Layout sections
  leftSection: "flex items-center gap-4",
  rightSection: "flex items-center gap-3",
  centerSection: "flex-1 flex justify-center",
  
  // Responsive spacing
  mobileContainer: "px-4 py-3",
  desktopContainer: "px-6 py-4",
} as const;

export const BREADCRUMB_TOKENS = {
  // Container
  container: "flex items-center gap-2",
  
  // Back button
  backButton: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
  backIcon: "h-4 w-4",
  backText: "text-sm font-medium",
  
  // Separator
  separator: "text-muted-foreground/50",
  separatorIcon: "h-4 w-4",
  
  // Current page
  currentPage: "text-sm font-medium text-foreground",
} as const;

export const TOP_SEARCH_TOKENS = {
  // Container
  container: "flex items-center gap-2",
  
  // Search input wrapper
  searchWrapper: "relative bg-background border border-input rounded-lg shadow-sm flex items-center min-w-[280px]",
  searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
  searchInput: "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground",
  
  // Mobile responsive
  mobileSearchWrapper: "min-w-[200px]",
} as const;

export const TOP_AI_TOKENS = {
  // AI button
  button: "h-10 bg-background hover:bg-accent border border-input rounded-lg px-3 py-2 flex items-center gap-2 text-muted-foreground shadow-sm transition-colors",
  icon: "h-4 w-4 text-muted-foreground",
  text: "text-sm font-medium",
  
  // States
  hover: "hover:text-foreground hover:bg-accent/80",
  active: "bg-accent text-foreground",
} as const;

export const DROPDOWN_TOKENS = {
  // Trigger button
  trigger: "hover:bg-accent rounded-lg p-2 transition-colors",
  triggerIcon: "h-4 w-4 text-muted-foreground",
  
  // Dropdown content
  content: "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  
  // Menu items
  item: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
} as const;

export const PAGE_TITLE_TOKENS = {
  // Title variants
  h1: "text-2xl font-bold text-foreground",
  h2: "text-xl font-semibold text-foreground", 
  h3: "text-lg font-medium text-foreground",
  
  // Subtitle
  subtitle: "text-sm text-muted-foreground mt-1",
  
  // Container
  container: "flex flex-col",
  titleRow: "flex items-center gap-3",
} as const;

export const OVERVIEW_SECTION_TOKENS = {
  // Main container
  container: "flex items-center justify-between w-full bg-background",
  content: "flex items-center justify-between w-full p-6 rounded-2xl",
  
  // Left section (metrics)
  metricsSection: "flex items-center gap-6",
  metricsGroup: "flex items-center gap-4",
  
  // Right section (actions)
  actionsSection: "flex items-center gap-3",
  
  // Responsive
  mobileContainer: "flex-col gap-4 items-stretch",
  mobileMetrics: "flex-wrap gap-3",
  mobileActions: "flex-col gap-2 w-full",
} as const;