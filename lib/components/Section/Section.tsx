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

  return (
    <div className={ENNABL_BASE.wrapper}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <div id={id} className={cn("ennabl-section", SECTION_PROTECTED.container, className)}>
          <CollapsibleTrigger asChild>
            <div className={SECTION_PROTECTED.header}>
              <div className={SECTION_PROTECTED.headerContent}>
                <div className={SECTION_PROTECTED.headerLeft}>
                  {showDragHandle && (
                    <GripVertical className={SECTION_PROTECTED.dragIcon} />
                  )}
                  {isOpen ? (
                    <ChevronDown className={SECTION_PROTECTED.chevronIcon} />
                  ) : (
                    <ChevronRight className={SECTION_PROTECTED.chevronIcon} />
                  )}
                  <span className={SECTION_PROTECTED.title}>{title}</span>
                  {badges.length > 0 && (
                    <div className={SECTION_PROTECTED.badgesContainer}>
                      {badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant={badge.variant || 'outline'}
                          className={SECTION_PROTECTED.badge}
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
            <div className={cn(SECTION_PROTECTED.content, contentClassName)}>
              {children}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default Section;