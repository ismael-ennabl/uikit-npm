/**
 * Protected design tokens with explicit values
 * These tokens provide style isolation and prevent overrides from host projects
 */

// Section component protected tokens
export const SECTION_PROTECTED = {
  // Container
  container: "ennabl-section__container",
  
  // Header
  header: "ennabl-section__header",
  headerContent: "ennabl-section__header-content", 
  headerLeft: "ennabl-section__header-left",
  
  // Title and icons
  title: "ennabl-section__title",
  dragIcon: "ennabl-section__drag-icon",
  chevronIcon: "ennabl-section__chevron-icon",
  
  // Badges
  badgesContainer: "ennabl-section__badges-container",
  badge: "ennabl-section__badge",
  
  // Content area
  content: "ennabl-section__content",
} as const;

// Base wrapper class for all components
export const ENNABL_BASE = {
  wrapper: "ennabl-ui",
  isolate: "ennabl-isolate",
} as const;

// Typography protection tokens with explicit styles
export const TYPOGRAPHY_PROTECTED = {
  h1: "ennabl-typography__h1",
  h2: "ennabl-typography__h2", 
  h3: "ennabl-typography__h3",
  sectionLabel: "ennabl-typography__section-label",
  cardHeading: "ennabl-typography__card-heading",
  dialogSubtitle: "ennabl-typography__dialog-subtitle",
  statLabel: "ennabl-typography__stat-label",
} as const;

// Component-specific protected tokens
export const COMPONENTS_PROTECTED = {
  dialogTitle: "ennabl-dialog__title",
  cardTitle: "ennabl-card__title", 
  statValue: "ennabl-stat__value",
  alertDialogTitle: "ennabl-alert-dialog__title",
  sheetTitle: "ennabl-sheet__title",
  drawerTitle: "ennabl-drawer__title",
} as const;

// Metrics component protected tokens
export const METRICS_PROTECTED = {
  // Typography
  statValue: "ennabl-metrics__stat-value",
  statLabel: "ennabl-metrics__stat-label",
  
  // Layout
  container: "ennabl-metrics__container",
  content: "ennabl-metrics__content", 
  statsGroup: "ennabl-metrics__stats-group",
  statItem: "ennabl-metrics__stat-item",
  actionsGroup: "ennabl-metrics__actions-group",
  
  // Interactive states
  clickableStat: "ennabl-metrics__clickable-stat",
  hoverValue: "ennabl-metrics__hover-value",
  hoverLabel: "ennabl-metrics__hover-label",
  
  // Colors
  valueColor: "ennabl-metrics__value-color",
  labelColor: "ennabl-metrics__label-color", 
  primaryButton: "ennabl-metrics__primary-button",
  secondaryButton: "ennabl-metrics__secondary-button",
} as const;

// Selection toolbar protected tokens
export const SELECTION_TOOLBAR_PROTECTED = {
  // Container
  container: "ennabl-selection-toolbar__container",
  
  // Left section
  leftSection: "ennabl-selection-toolbar__left-section",
  clearButton: "ennabl-selection-toolbar__clear-button",
  selectionText: "ennabl-selection-toolbar__selection-text",
  
  // Right section
  rightSection: "ennabl-selection-toolbar__right-section", 
  actionButton: "ennabl-selection-toolbar__action-button",
  
  // Icon sizes
  clearIcon: "ennabl-selection-toolbar__clear-icon",
  actionIcon: "ennabl-selection-toolbar__action-icon",
  chevronIcon: "ennabl-selection-toolbar__chevron-icon"
} as const;