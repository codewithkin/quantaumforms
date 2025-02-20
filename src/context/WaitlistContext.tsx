'use client';

import { createContext, useContext, useState } from 'react';

interface WaitlistContextType {
  isJoined: boolean;
  joinWaitlist: (email: string) => Promise<void>;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isJoined, setIsJoined] = useState(false);

  const joinWaitlist = async (email: string) => {
    // TODO: Implement actual waitlist signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsJoined(true);
  };

  return (
    <WaitlistContext.Provider value={{ isJoined, joinWaitlist }}>
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
