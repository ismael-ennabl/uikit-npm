
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

interface VersionChangeDialogProps {
  isOpen: boolean;
  pendingVersion: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const VersionChangeDialog = ({
  isOpen,
  pendingVersion,
  onConfirm,
  onCancel
}: VersionChangeDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Version Change</AlertDialogTitle>
          <AlertDialogDescription>
            Changing to {pendingVersion} will reload the package comparison and may affect current analysis. Do you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VersionChangeDialog;
