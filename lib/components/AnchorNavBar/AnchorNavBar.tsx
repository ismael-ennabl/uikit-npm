/**
 * @component AnchorNavBar
 * @description Horizontal navigation bar that automatically detects sections and provides smooth scrolling navigation with automatic sticky behavior
 * @created 2025-08-07
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AnchorNavBarProps {
  /** CSS selector for sections to detect (default: '[data-ennabl-component="section"]') */
  sectionSelector?: string;
  /** IntersectionObserver rootMargin (default: '0px 0px -50% 0px') */
  rootMargin?: string;
  /** IntersectionObserver threshold (default: [0, 0.1, 0.5, 1]) */
  threshold?: number | number[];
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
  rootMargin = '0px 0px -50% 0px',
  threshold = [0, 0.1, 0.5, 1],
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
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const stickyObserverRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const anchorNavRef = useRef<HTMLDivElement>(null);
  const visibilityMapRef = useRef<Map<string, number>>(new Map());

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

  // Setup IntersectionObserver for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          visibilityMapRef.current.set(id, entry.intersectionRatio);
        });

        // Find the section with the highest visibility ratio
        let maxVisibility = 0;
        let mostVisibleSection = '';
        
        visibilityMapRef.current.forEach((ratio, sectionId) => {
          if (ratio > maxVisibility) {
            maxVisibility = ratio;
            mostVisibleSection = sectionId;
          }
        });

        if (mostVisibleSection && mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);
          onSectionChange?.(mostVisibleSection);
        }
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
  }, [sections, rootMargin, threshold, onSectionChange, activeSection]);

  // Setup sticky behavior detection
  useEffect(() => {
    if (!anchorNavRef.current) return;

    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: '-1px 0px 0px 0px',
        threshold: [0, 1]
      }
    );

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.pointerEvents = 'none';
    
    if (anchorNavRef.current.parentElement) {
      anchorNavRef.current.parentElement.insertBefore(sentinel, anchorNavRef.current);
      stickyObserver.observe(sentinel);
    }

    stickyObserverRef.current = stickyObserver;

    return () => {
      stickyObserver.disconnect();
      if (sentinel.parentElement) {
        sentinel.parentElement.removeChild(sentinel);
      }
    };
  }, []);

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

  // Check state of all sections to determine if all are expanded
  const checkAllSectionsState = useCallback(() => {
    let expandedCount = 0;
    let totalCount = 0;

    sectionsRef.current.forEach(element => {
      // Look for Section components - they have data-ennabl-component="section"
      const sectionElement = element.querySelector('[data-ennabl-component="section"]') || element;
      
      // Find the Collapsible root within the section (it will have data-state)
      const collapsibleRoot = sectionElement.querySelector('[data-state="open"], [data-state="closed"]') as HTMLElement;
      
      if (collapsibleRoot) {
        totalCount++;
        const isOpen = collapsibleRoot.getAttribute('data-state') === 'open';
        if (isOpen) {
          expandedCount++;
        }
      }
    });

    // Update state based on current sections
    const newExpanded = expandedCount === totalCount && totalCount > 0;
    setAllExpanded(newExpanded);
  }, []);

  // Toggle all sections expanded/collapsed
  const toggleAllSections = useCallback(() => {
    const newExpanded = !allExpanded;
    setAllExpanded(newExpanded);

    // Find all Section components and toggle them correctly
    sectionsRef.current.forEach(element => {
      // Look for Section components - they have data-ennabl-component="section"
      const sectionElement = element.querySelector('[data-ennabl-component="section"]') || element;
      
      // Find the Collapsible root within the section (it will have data-state)
      const collapsibleRoot = sectionElement.querySelector('[data-state="open"], [data-state="closed"]') as HTMLElement;
      
      if (collapsibleRoot) {
        const isCurrentlyOpen = collapsibleRoot.getAttribute('data-state') === 'open';
        
        // Only toggle if the current state doesn't match the desired state
        if ((newExpanded && !isCurrentlyOpen) || (!newExpanded && isCurrentlyOpen)) {
          // Find the trigger element - it's the div with data-ennabl-element="header"
          const trigger = sectionElement.querySelector('[data-ennabl-element="header"]') as HTMLElement;
          
          if (trigger) {
            try {
              // Simulate a click event on the trigger
              trigger.click();
            } catch (error) {
              console.warn('Failed to toggle section:', error);
            }
          }
        }
      }
    });

    onExpandToggle?.(newExpanded);
  }, [allExpanded, onExpandToggle]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div 
      ref={anchorNavRef}
      className={cn(
        "top-0 z-40 transition-all duration-300 ease-in-out",
        isSticky && "sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 overflow-x-auto py-3 bg-page">
          {/* Expand/Collapse All - First item */}
          {showExpandAll && <Button variant="ghost" size="sm" onClick={toggleAllSections} className="flex items-center space-x-0.5 shrink-0 font-normal text-sm border-0">
              {allExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="hidden sm:inline">
                {allExpanded ? expandAllText.collapse : expandAllText.expand}
              </span>
            </Button>}

          {/* Navigation Pills */}
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "shrink-0 font-normal text-sm border-0 transition-all duration-200",
                activeSection === section.id 
                  ? "bg-[#0000c5]/[0.08] text-[#0000c5] hover:bg-[#0000c5]/[0.12]" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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