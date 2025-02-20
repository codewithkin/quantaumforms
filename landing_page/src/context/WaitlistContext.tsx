'use client';

import { createContext, useContext, useState } from 'react';

interface WaitlistContextType {
  isJoined: boolean;
  isError: boolean;
  errorMessage: string | null;
  joinWaitlist: (email: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isJoined, setIsJoined] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = () => {
    setIsError(false);
    setErrorMessage(null);
  };

  const reset = () => {
    setIsJoined(false);
    clearError();
  };

  const joinWaitlist = async (email: string) => {
    try {
      clearError();
      setIsJoined(false);
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 
          (data.details?.[0]?.message) || 
          'Failed to join waitlist'
        );
      }

      setIsJoined(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred'
      );
      throw error;
    }
  };

  return (
    <WaitlistContext.Provider value={{ isJoined, isError, errorMessage, joinWaitlist, clearError, reset }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}
