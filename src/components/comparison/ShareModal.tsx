import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';
import EmailSelector from './EmailSelector';
import { useState } from 'react';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendEmail: (selectedEmails: string[]) => void;
}

const ShareModal = ({
  open,
  onOpenChange,
  onSendEmail
}: ShareModalProps) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleSendEmail = () => {
    if (selectedEmails.length > 0) {
      onSendEmail(selectedEmails);
    }
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setSelectedEmails([]);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Report</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Email Selector */}
          <EmailSelector
            selectedEmails={selectedEmails}
            onEmailsChange={setSelectedEmails}
          />

          {/* Primary CTA */}
          <Button 
            variant="ctaPrimary"
            onClick={handleSendEmail}
            disabled={selectedEmails.length === 0}
            className="w-full"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send via Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;