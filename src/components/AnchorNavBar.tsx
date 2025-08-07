/**
 * @component AnchorNavBar (Local Testing Version)
 * @description Horizontal navigation bar that automatically detects sections and provides smooth scrolling navigation
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisible = { entry: null as IntersectionObserverEntry | null, ratio: 0 };
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
            mostVisible = { entry, ratio: entry.intersectionRatio };
          }
        });

        if (mostVisible.entry) {
          const id = mostVisible.entry.target.id;
          setActiveSection(id);
          onSectionChange?.(id);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.5, 1.0]
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
    // Initial detection
    detectSections();

    // Setup MutationObserver to detect new sections
    const mutationObserver = new MutationObserver(() => {
      setTimeout(detectSections, 100); // Small delay to ensure DOM is ready
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
      const collapsible = element.closest('[data-state]');
      const trigger = element.querySelector('[role="button"]') as HTMLElement;
      const isCurrentlyOpen = collapsible?.getAttribute('data-state') === 'open';
      
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
      "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {/* Expand/Collapse All - First item */}
          {showExpandAll && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAllSections}
              className="flex items-center space-x-1 shrink-0"
            >
              {allExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {allExpanded ? expandAllText.collapse : expandAllText.expand}
              </span>
            </Button>
          )}

          {/* Navigation Pills */}
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "whitespace-nowrap transition-all duration-200 min-w-fit rounded-lg font-normal",
                activeSection === section.id 
                  ? "bg-[#0000c5]/[0.08] text-foreground hover:bg-[#0000c5]/[0.10]" 
                  : "text-muted-foreground hover:text-foreground hover:bg-[#0000c5]/[0.10]"
              )}
            >
              {section.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnchorNavBar;