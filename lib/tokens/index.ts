// Design system tokens for the component library
export * from './protected';

// Typography tokens
export const TYPOGRAPHY = {
  h1: "text-2xl font-bold text-gray-900 mb-4",
  h2: "text-xl font-semibold text-gray-900 mb-3", 
  h3: "text-lg font-semibold text-gray-900 mb-2",
  sectionLabel: "text-sm font-medium text-gray-700",
  cardHeading: "text-lg font-semibold text-gray-900",
  dialogSubtitle: "text-lg font-medium text-gray-600",
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
  title: "text-xl font-semibold text-gray-900 mb-3",
  dragIcon: "h-4 w-4 text-black",
  chevronIcon: "h-4 w-4 text-black",
  
  // Badges
  badgesContainer: "flex items-center space-x-2",
  badge: "text-gray-700 border-gray-300",
  
  // Content area (white wrapper)
  content: "bg-white rounded-lg p-6 mt-2 border border-gray-200 shadow-sm",
} as const;

// Tooltip style tokens
export const TOOLTIP_STYLES = {
  dark: "bg-black text-white",
  light: "bg-white text-black border",
  restricted: "bg-black text-white",
  info: "bg-gray-900 text-white",
} as const;