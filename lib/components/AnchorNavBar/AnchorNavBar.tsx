/**
 * @component AnchorNavBar
 * @description Horizontal navigation bar that automatically detects sections and provides smooth scrolling navigation
 * @created 2025-08-07
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AnchorNavBarProps {
  /** CSS selector for sections to detect (default: '[data-ennabl-component="section"]') */
  sectionSelector?: string;
  /** IntersectionObserver rootMargin (default: '0px 0px -80% 0px') */
  rootMargin?: string;
  /** IntersectionObserver threshold (default: 0.1) */
  threshold?: number;
  /** Show expand/collapse all functionality (default: true) */
  showExpandAll?: boolean;
  /** Text for expand/collapse all button */
  expandAllText?: { expand: string; collapse: string };
  /** Additional CSS classes */
  className?: string;
  /** Enable smooth scrolling (default: true) */
  smoothScroll?: boolean;
  /** Offset for scroll position (default: 80) */
  activeOffset?: number;
  /** Whether to make the bar sticky (default: false) */
  sticky?: boolean;
  /** Callback when active section changes */
  onSectionChange?: (activeSection: string) => void;
  /** Callback when expand/collapse all is toggled */
  onExpandToggle?: (expanded: boolean) => void;
}

export interface DetectedSection {
  id: string;
  title: string;
  element: HTMLElement;
}

const AnchorNavBar = ({
  sectionSelector = '[data-ennabl-component="section"]',
  rootMargin = '0px 0px -80% 0px',
  threshold = 0.1,
  showExpandAll = true,
  expandAllText = { expand: 'Expand All', collapse: 'Collapse All' },
  className,
  smoothScroll = true,
  activeOffset = 80,
  sticky = false,
  onSectionChange,
  onExpandToggle
}: AnchorNavBarProps) => {
  const [sections, setSections] = useState<DetectedSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Detect sections on mount and DOM changes
  const detectSections = useCallback(() => {
    const sectionElements = document.querySelectorAll(sectionSelector);
    const detectedSections: DetectedSection[] = [];
    const newSectionsMap = new Map<string, HTMLElement>();

    sectionElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const id = htmlElement.id;
      const titleElement = htmlElement.querySelector('[data-ennabl-element="title"]');
      const title = titleElement?.textContent || `Section ${id}`;

      if (id) {
        detectedSections.push({ id, title, element: htmlElement });
        newSectionsMap.set(id, htmlElement);
      }
    });

    setSections(detectedSections);
    sectionsRef.current = newSectionsMap;
  }, [sectionSelector]);

  // Setup IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            onSectionChange?.(id);
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    observerRef.current = observer;

    // Observe all sections
    sectionsRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, rootMargin, threshold, onSectionChange]);

  // Detect sections on mount and when DOM changes
  useEffect(() => {
    detectSections();

    // Setup MutationObserver to detect new sections
    const mutationObserver = new MutationObserver(() => {
      detectSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [detectSections]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionsRef.current.get(sectionId);
    if (element) {
      const yOffset = -activeOffset;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      if (smoothScroll) {
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: y });
      }
    }
  }, [smoothScroll, activeOffset]);

  // Toggle all sections expanded/collapsed
  const toggleAllSections = useCallback(() => {
    const newExpanded = !allExpanded;
    setAllExpanded(newExpanded);
    
    // Find all collapsible triggers and click them
    sectionsRef.current.forEach((element) => {
      const trigger = element.querySelector('[data-radix-collection-item]') as HTMLElement;
      const isCurrentlyOpen = element.getAttribute('data-state') === 'open';
      
      if (trigger && ((newExpanded && !isCurrentlyOpen) || (!newExpanded && isCurrentlyOpen))) {
        trigger.click();
      }
    });

    onExpandToggle?.(newExpanded);
  }, [allExpanded, onExpandToggle]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "flex items-center gap-2 mb-4 overflow-x-auto",
      sticky && "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border py-3 px-4",
      className
    )}>
      {/* Expand/Collapse All - First item */}
      {showExpandAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAllSections}
          className="whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded"
        >
          {allExpanded ? (
            <ChevronDown className="h-4 w-4 mr-0.5" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-0.5" />
          )}
          {allExpanded ? expandAllText.collapse : expandAllText.expand}
        </Button>
      )}

      {/* Navigation Pills */}
      {sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection(section.id)}
          className={cn(
            "whitespace-nowrap text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal rounded",
            activeSection === section.id && "bg-accent text-accent-foreground"
          )}
        >
          {section.title}
        </Button>
      ))}
    </div>
  );
};

export default AnchorNavBar;