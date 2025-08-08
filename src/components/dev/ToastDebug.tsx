import React from 'react';
import { Button } from '@/components/ui/button';
import { toast as shadcnToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';

const ToastDebug = () => {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const show = params.has('debug');
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          shadcnToast({
            title: 'Shadcn toast',
            description: 'This is a test notification.',
          })
        }
      >
        Test Shadcn
      </Button>
      <Button
        variant="ctaSecondary"
        size="sm"
        onClick={() => sonnerToast('Sonner toast: test notification')}
      >
        Test Sonner
      </Button>
    </div>
  );
};

export default ToastDebug;
