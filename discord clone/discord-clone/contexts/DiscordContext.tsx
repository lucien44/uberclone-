
'use client';

import { createContext, useContext, useState } from 'react';

// Define the shape of your state
type DiscordState = {
  someValue?: string; // Replace with actual keys and types if needed
};

// Initialize the context with the correct type
const initialValue: DiscordState = {};
const DiscordContext = createContext<DiscordState>(initialValue);

export const DiscordContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<DiscordState>(initialValue);

  const store = { ...state, setState };

  return (
    <DiscordContext.Provider value={store}>{children}</DiscordContext.Provider>
  );
};

// Hook to use DiscordContext in your components
export const useDiscordContext = () => useContext(DiscordContext);
