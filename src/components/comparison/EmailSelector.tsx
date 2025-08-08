import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { X, Mail } from 'lucide-react';
import { mockCoworkers, filterCoworkers, type Coworker } from '@/utils/mockCoworkerData';

interface EmailSelectorProps {
  selectedEmails: string[];
  onEmailsChange: (emails: string[]) => void;
}

const EmailSelector = ({ selectedEmails, onEmailsChange }: EmailSelectorProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCoworkers, setFilteredCoworkers] = useState<Coworker[]>(mockCoworkers);

  useEffect(() => {
    const filtered = filterCoworkers(inputValue).filter(
      coworker => !selectedEmails.includes(coworker.email)
    );
    setFilteredCoworkers(filtered);
  }, [inputValue, selectedEmails]);

  const handleSelectEmail = (coworker: Coworker) => {
    if (!selectedEmails.includes(coworker.email)) {
      onEmailsChange([...selectedEmails, coworker.email]);
      setInputValue('');
      setIsOpen(false);
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    onEmailsChange(selectedEmails.filter(email => email !== emailToRemove));
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(value.length > 0);
  };

  const getDisplayName = (email: string) => {
    const coworker = mockCoworkers.find(c => c.email === email);
    return coworker ? coworker.name : email;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && inputValue === '' && selectedEmails.length > 0) {
      handleRemoveEmail(selectedEmails[selectedEmails.length - 1]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email Recipients
        </label>
        
        {/* Custom input container with inline pills */}
        <div className="relative">
          <div 
            className="flex flex-wrap items-center gap-1 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            onClick={() => document.getElementById('email-search-input')?.focus()}
          >
            {/* Selected emails as inline pills */}
            {selectedEmails.map((email) => (
              <div 
                key={email} 
                className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
              >
                <Mail className="h-3 w-3" />
                {getDisplayName(email)}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEmail(email);
                  }}
                  className="hover:bg-secondary-foreground/20 rounded-sm p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {/* Inline input */}
            <input
              id="email-search-input"
              type="text"
              placeholder={selectedEmails.length === 0 ? "Search coworkers by name or email..." : "Add more..."}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(inputValue.length >= 2)}
              className="flex-1 min-w-32 bg-transparent border-0 outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Dropdown */}
          {isOpen && inputValue.length >= 2 && filteredCoworkers.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-48 overflow-auto">
              {filteredCoworkers.slice(0, 5).map((coworker) => (
                <div
                  key={coworker.id}
                  onClick={() => handleSelectEmail(coworker)}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <div>
                    <div className="font-medium text-sm">{coworker.name}</div>
                    <div className="text-xs text-muted-foreground">{coworker.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSelector;