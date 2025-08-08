/**
 * @component AnchorNavBar (Local Testing Version)
 * @description Horizontal navigation bar that automatically detects sections and provides smooth scrolling navigation
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  expandAllText?: {
    expand: string;
    collapse: string;
  };
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
  expandAllText = {
    expand: 'Expand All',
    collapse: 'Collapse All'
  },
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
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);

  // Detect sections on mount and DOM changes
  const detectSections = useCallback(() => {
    const sectionElements = document.querySelectorAll(sectionSelector);
    const detectedSections: DetectedSection[] = [];
    const newSectionsMap = new Map<string, HTMLElement>();
    sectionElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      const id = htmlElement.id;
      const titleElement = htmlElement.querySelector('[data-ennabl-element="title"]');
      const title = titleElement?.textContent || `Section ${id}`;
      if (id) {
        detectedSections.push({
          id,
          title,
          element: htmlElement
        });
        newSectionsMap.set(id, htmlElement);
      }
    });
    setSections(detectedSections);
    sectionsRef.current = newSectionsMap;
  }, [sectionSelector]);

  // Setup IntersectionObserver
  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(entries => {
      // Find the most visible section
      let mostVisible = {
        entry: null as IntersectionObserverEntry | null,
        ratio: 0
      };
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > mostVisible.ratio) {
          mostVisible = {
            entry,
            ratio: entry.intersectionRatio
          };
        }
      });
      if (mostVisible.entry) {
        const id = mostVisible.entry.target.id;
        setActiveSection(id);
        onSectionChange?.(id);
      }
    }, {
      rootMargin,
      threshold: [0, 0.1, 0.5, 1.0]
    });
    observerRef.current = observer;

    // Observe all sections
    sectionsRef.current.forEach(element => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [sections, rootMargin, threshold, onSectionChange]);

  // Detect sticky state
  useEffect(() => {
    if (!navRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    }, {
      root: null,
      threshold: 0,
      rootMargin: '-1px 0px 0px 0px'
    });
    const target = navRef.current;
    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, []);

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
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: y
        });
      }
    }
  }, [smoothScroll, activeOffset]);

  // Check current state of all sections
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

    console.log(`State check: ${expandedCount}/${totalCount} sections expanded`);

    // Update state based on current sections
    const newExpanded = expandedCount === totalCount && totalCount > 0;
    if (newExpanded !== allExpanded) {
      setAllExpanded(newExpanded);
    }
  }, [allExpanded]);

  // Toggle all sections expanded/collapsed
  const toggleAllSections = useCallback(() => {
    const newExpanded = !allExpanded;
    setAllExpanded(newExpanded);

    console.log(`Toggling all sections to: ${newExpanded ? 'expanded' : 'collapsed'}`);

    // Find all Section components and toggle them correctly
    sectionsRef.current.forEach(element => {
      // Look for Section components - they have data-ennabl-component="section"
      const sectionElement = element.querySelector('[data-ennabl-component="section"]') || element;
      
      // Find the Collapsible root within the section (it will have data-state)
      const collapsibleRoot = sectionElement.querySelector('[data-state="open"], [data-state="closed"]') as HTMLElement;
      
      if (collapsibleRoot) {
        const isCurrentlyOpen = collapsibleRoot.getAttribute('data-state') === 'open';
        
        console.log(`Section ${element.id}: currently ${isCurrentlyOpen ? 'open' : 'closed'}, want ${newExpanded ? 'open' : 'closed'}`);
        
        // Only toggle if the current state doesn't match the desired state
        if ((newExpanded && !isCurrentlyOpen) || (!newExpanded && isCurrentlyOpen)) {
          // Find the trigger element - it's the div with data-ennabl-element="header"
          const trigger = sectionElement.querySelector('[data-ennabl-element="header"]') as HTMLElement;
          
          if (trigger) {
            try {
              // Simulate a click event on the trigger
              trigger.click();
              console.log(`Toggled section ${element.id}: ${isCurrentlyOpen ? 'closing' : 'opening'}`);
            } catch (error) {
              console.warn('Failed to toggle section:', error);
            }
          } else {
            console.warn(`Could not find trigger element for section ${element.id}`);
          }
        }
      } else {
        console.warn(`Could not find collapsible root for section ${element.id}`);
      }
    });
    
    onExpandToggle?.(newExpanded);
  }, [allExpanded, onExpandToggle]);

  // Check state periodically to keep button in sync
  useEffect(() => {
    if (sections.length > 0) {
      checkAllSectionsState();
      
      // Set up a mutation observer to watch for state changes
      const observer = new MutationObserver(() => {
        setTimeout(checkAllSectionsState, 100);
      });

      sectionsRef.current.forEach(element => {
        // Watch all collapsible elements for state changes
        const collapsibles = element.querySelectorAll('[data-state]');
        collapsibles.forEach(collapsible => {
          observer.observe(collapsible, {
            attributes: true,
            attributeFilter: ['data-state'],
            subtree: true
          });
        });
      });

      return () => observer.disconnect();
    }
  }, [sections, checkAllSectionsState]);
  if (sections.length === 0) {
    return null;
  }
  return <div ref={navRef} className={cn("sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", isSticky && "border-b border-border", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 overflow-x-auto py-3 bg-page">
          {/* Expand/Collapse All - First item */}
          {showExpandAll && <Button variant="ghost" size="sm" onClick={toggleAllSections} className="flex items-center -space-x-0 shrink-0 font-normal text-sm border-0">
              {allExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="hidden sm:inline">
                {allExpanded ? expandAllText.collapse : expandAllText.expand}
              </span>
            </Button>}

          {/* Navigation Pills */}
          {sections.map(section => <Button key={section.id} variant={activeSection === section.id ? "default" : "ghost"} size="sm" onClick={() => scrollToSection(section.id)} className={cn("whitespace-nowrap transition-all duration-200 min-w-fit rounded-lg font-normal text-sm", activeSection === section.id ? "bg-brand-blue/10 text-foreground hover:bg-brand-blue/20" : "text-muted-foreground hover:text-foreground hover:bg-hover-primary")}>
              {section.title}
            </Button>)}
        </div>
      </div>
    </div>;
};
export default AnchorNavBar;