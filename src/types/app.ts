// src/types/app.ts

export interface ThemePalette {
    text: string;
    textSecondary: string;
    background: string;
    backgroundElement: string;
    primary: string;
  }
  
  export interface AppContextType {
    userName: string;
    isInitializing: boolean;
    isM5Connected: boolean;
    setIsM5Connected: (connected: boolean) => void;
    soilMoisture: number;
    setSoilMoisture: React.Dispatch<React.SetStateAction<number>>;
    isPumpOn: boolean;
    scheduledTime: string;
    setScheduledTime: (time: string) => void;
    currentTime: string;
    batteryLevel: number;
    themeColors: ThemePalette;
    triggerWaterPump: (status: boolean) => void;
    playMrBeanAlert: () => Promise<void>;
  }