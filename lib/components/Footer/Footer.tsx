/**
 * @component Footer
 * @description A reusable footer component with configurable content and styling
 * @created 2025-01-08T00:00:00Z
 */

import React from 'react';
import { ComponentBaseProps } from '../../types';

export interface FooterProps extends ComponentBaseProps {
  /** Footer text content */
  text?: string;
  /** Year to display (defaults to current year) */
  year?: number;
  /** Maximum width of the footer container */
  maxWidth?: string;
  /** Custom links to display in footer */
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

const Footer: React.FC<FooterProps> = ({
  text,
  year = new Date().getFullYear(),
  maxWidth = '1200px',
  links = [],
  className = '',
  children
}) => {
  const defaultText = `ennabl design demo ${year}`;
  const footerContent = text || children || defaultText;

  return (
    <footer className={`bg-background py-2 ${className}`}>
      <div 
        className="mx-auto px-8" 
        style={{ maxWidth }}
      >
        <div className="text-center">
          {typeof footerContent === 'string' ? (
            <p className="text-sm text-muted-foreground">{footerContent}</p>
          ) : (
            footerContent
          )}
          
          {links.length > 0 && (
            <div className="flex justify-center gap-4 mt-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;