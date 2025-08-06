import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PasswordPrompt from './PasswordPrompt';

interface ProtectedAppProps {
  children: React.ReactNode;
}

const ProtectedApp: React.FC<ProtectedAppProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <PasswordPrompt />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedApp;