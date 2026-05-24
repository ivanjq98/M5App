// components/BLEContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Device } from 'react-native-ble-plx';

type BLEContextType = {
  connectedDevice: Device | null;
  setConnectedDevice: (device: Device | null) => void;
};

const BLEContext = createContext<BLEContextType | undefined>(undefined);

export function BLEProvider({ children }: { children: ReactNode }) {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  return (
    <BLEContext.Provider value={{ connectedDevice, setConnectedDevice }}>
      {children}
    </BLEContext.Provider>
  );
}

export const useBLE = () => {
  const context = useContext(BLEContext);
  if (context === undefined) {
    throw new Error('useBLE must be used within a BLEProvider');
  }
  return context;
};