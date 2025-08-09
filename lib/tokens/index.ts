// Design system tokens for the component library
export * from './protected';
export * from './headerTokens';
export * from './anchorNavBarTokens';

// Typography tokens
export const TYPOGRAPHY = {
  h1: "text-2xl font-bold text-foreground mb-4",
  h2: "text-xl font-semibold text-foreground mb-3", 
  h3: "text-lg font-semibold text-foreground mb-2",
  sectionLabel: "text-sm font-medium text-muted-foreground",
  cardHeading: "text-lg font-semibold text-foreground",
  dialogSubtitle: "text-lg font-medium text-muted-foreground",
  statLabel: "text-sm font-medium text-foreground",
} as const;

// Component-specific tokens
export const COMPONENTS = {
  dialogTitle: "text-lg font-semibold leading-none tracking-tight",
  cardTitle: "text-2xl font-semibold leading-none tracking-tight",
  statValue: "text-2xl font-semibold text-foreground",
  alertDialogTitle: "text-lg font-semibold",
  sheetTitle: "text-lg font-semibold text-foreground",
  drawerTitle: "text-lg font-semibold leading-none tracking-tight",
  // Filters UI
  filtersBar: "flex items-center gap-3",
  filtersPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
  filtersSurface: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
} as const;

// Metrics component tokens
export const METRICS = {
  // Typography
  statValue: "text-2xl font-semibold text-foreground",
  statLabel: "text-sm font-normal text-muted-foreground",
  
  // Layout
  container: "shadow-none border-none bg-card",
  content: "p-6",
  statsGroup: "flex items-center gap-8",
  statItem: "flex flex-col",
  actionsGroup: "flex items-center gap-3",
  
  // Interactive states
  clickableStat: "cursor-pointer group transition-colors duration-200",
  hoverValue: "group-hover:text-brand-blue transition-colors",
  hoverLabel: "border-b border-solid border-muted-foreground/30 group-hover:border-brand-blue group-hover:text-brand-blue transition-colors",
  
  // Colors
  valueColor: "text-foreground", 
  labelColor: "text-muted-foreground",
  primaryButton: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondaryButton: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
} as const;

// Selection toolbar tokens
export const SELECTION_TOOLBAR = {
  // Container
  container: "flex items-center justify-between h-12 px-4 bg-brand-blue/5 rounded-lg",
  
  // Left section (selection info)
  leftSection: "flex items-center gap-3",
  clearButton: "h-8 w-8 p-0 text-foreground hover:bg-foreground/10",
  selectionText: "text-foreground font-normal",
  
  // Right section (actions)
  rightSection: "flex items-center gap-2",
  actionButton: "h-8 px-3 text-foreground hover:bg-foreground/10 font-normal",
  
  // Icon sizes
  clearIcon: "h-4 w-4",
  actionIcon: "h-4 w-4 mr-1",
  chevronIcon: "h-3 w-3 ml-1"
} as const;

// Section component tokens
export const SECTION = {
  // Container
  container: "scroll-mt-4",
  
  // Header
  header: "py-2 cursor-pointer w-full",
  headerContent: "flex items-center justify-between",
  headerLeft: "flex items-baseline space-x-3",
  
// Title and icons
  title: "text-xl font-semibold text-foreground mb-3",
  dragIcon: "h-4 w-4 text-foreground",
  chevronIcon: "h-4 w-4 text-foreground",
  
  // Badges
  badgesContainer: "flex items-center space-x-2",
  badge: "text-muted-foreground border-border",
  
  // Content area (card wrapper)
  content: "bg-card rounded-lg p-6 mt-2 border border-border shadow-sm",
} as const;

// Section header tokens
export const SECTION_HEADER = {
  // Container and layout
  container: "flex items-center cursor-pointer select-none",
  content: "flex items-center gap-3 w-full",
  leftSection: "flex items-center gap-3",
  
  // Icons
  dragIcon: "h-4 w-4 text-muted-foreground hover:text-foreground transition-colors",
  chevronIcon: "h-4 w-4 text-muted-foreground transition-transform duration-200",
  
  // Title styling
  title: "text-xl font-semibold text-foreground",
  titleHover: "hover:text-primary transition-colors",
  
  // Badges
  badgesContainer: "flex items-center gap-2 ml-auto",
  badge: "text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground",
  
  // Interactive states
  headerHover: "hover:bg-muted/50 transition-colors duration-200 rounded-md p-2 -m-2",
  focusVisible: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md",
} as const;

// Tooltip style tokens
export const TOOLTIP_STYLES = {
  dark: "bg-popover text-popover-foreground",
  light: "bg-background text-foreground border",
  restricted: "bg-popover text-popover-foreground",
  info: "bg-popover text-popover-foreground",
} as const;
