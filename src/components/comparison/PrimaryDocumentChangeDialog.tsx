import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PrimaryDocumentChangeDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  documentName: string;
}

const PrimaryDocumentChangeDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  documentName 
}: PrimaryDocumentChangeDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Primary Document</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to change the primary document to "{documentName}". 
            This will re-run the entire comparison process which may take a few moments.
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrimaryDocumentChangeDialog;