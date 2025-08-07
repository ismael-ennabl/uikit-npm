/**
 * @component Section
 * @description Reusable collapsible section component with drag handle, title, and content area
 * @created 2025-08-06
 */

import React from 'react';
import { Badge } from '../ui/badge';
import { ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible';
import { SECTION_PROTECTED, ENNABL_BASE } from '../../tokens/protected';
import { cn } from '../../utils/cn';

export interface SectionBadge {
  text: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

export interface SectionProps {
  /** Unique identifier for navigation/scrolling */
  id: string;
  /** Section heading text */
  title: string;
  /** Content to display inside the collapsible area */
  children: React.ReactNode;
  /** Show/hide grip vertical icon (default: true) */
  showDragHandle?: boolean;
  /** Initial collapsed/expanded state (default: false) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when expand/collapse changes */
  onOpenChange?: (open: boolean) => void;
  /** Array of badge objects to display next to title */
  badges?: SectionBadge[];
  /** Additional CSS classes for container */
  className?: string;
  /** CSS classes for content area */
  contentClassName?: string;
}

const Section = ({
  id,
  title,
  children,
  showDragHandle = true,
  defaultOpen = false,
  open,
  onOpenChange,
  badges = [],
  className,
  contentClassName
}: SectionProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Inline styles for maximum protection against overrides
  const titleInlineStyles: React.CSSProperties = {
    color: 'hsl(220, 100%, 50%)', // Changed from red to blue
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
    margin: '0.75rem 0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    textAlign: 'left',
    display: 'inline',
    position: 'static',
    float: 'none',
    clear: 'none'
  };

  const contentInlineStyles: React.CSSProperties = {
    backgroundColor: 'hsl(0, 0%, 100%)',
    border: '1px solid hsl(220, 13%, 91%)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    margin: '0.5rem 0 0 0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    position: 'static',
    float: 'none',
    clear: 'none',
    display: 'block'
  };

  return (
    <div className={ENNABL_BASE.wrapper} data-ennabl-isolated="true">
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <div 
          id={id} 
          className={cn("ennabl-section", SECTION_PROTECTED.container, className)}
          data-ennabl-component="section"
        >
          <CollapsibleTrigger asChild>
            <div 
              className={SECTION_PROTECTED.header}
              data-ennabl-element="header"
            >
              <div 
                className={SECTION_PROTECTED.headerContent}
                data-ennabl-element="header-content"
              >
                <div 
                  className={SECTION_PROTECTED.headerLeft}
                  data-ennabl-element="header-left"
                >
                  {showDragHandle && (
                    <GripVertical 
                      className="h-4 w-4 text-black"
                      data-ennabl-element="drag-icon"
                    />
                  )}
                  {isOpen ? (
                    <ChevronDown 
                      className="h-4 w-4 text-black"
                      data-ennabl-element="chevron-icon"
                    />
                  ) : (
                    <ChevronRight 
                      className="h-4 w-4 text-black"
                      data-ennabl-element="chevron-icon"
                    />
                  )}
                  <span 
                    className={SECTION_PROTECTED.title}
                    data-ennabl-element="title"
                    style={titleInlineStyles}
                  >
                    {title}
                  </span>
                  {badges.length > 0 && (
                    <div 
                      className={SECTION_PROTECTED.badgesContainer}
                      data-ennabl-element="badges-container"
                    >
                      {badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-gray-700 border-gray-300"
                          data-ennabl-element="badge"
                        >
                          {badge.text}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div 
              className={cn(SECTION_PROTECTED.content, contentClassName)}
              data-ennabl-element="content"
              style={contentInlineStyles}
            >
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default Section;