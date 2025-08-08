import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

const PasswordPrompt: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Small delay for better UX
    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  useEffect(() => {
    // Focus on input when component mounts
    const input = document.querySelector('input[type="password"]') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }, []);

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            ennablDocs
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Please enter the password to access the application
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full"
              autoFocus
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? 'Authenticating...' : 'Access Application'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordPrompt;