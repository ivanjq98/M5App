// src/context/AppContext.tsx
import { Audio } from 'expo-av';
import * as Battery from 'expo-battery';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { useSQLiteContext } from 'expo-sqlite';

export function useLogging() {
  const db = useSQLiteContext();

  const logDeviceStats = async (moisture: number, pumpOn: boolean, battery: number) => {
    try {
      await db.runAsync(
        'INSERT INTO telemetry_logs (moisture, pump_active, battery) VALUES (?, ?, ?);',
        [moisture, pumpOn ? 1 : 0, battery]
      );
      console.log("Logged safely to local storage!");
    } catch (error) {
      console.error("Failed to write to local DB", error);
    }
  };

  return { logDeviceStats };
}

// Explicit type registry for the central state engine
interface ThemePalette {
  text: string;
  textSecondary: string;
  background: string;
  backgroundElement: string;
  primary: string;
}

interface AppContextType {
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

// Global UI theme colors matching your design rules
const lightColors: ThemePalette = {
  text: '#0f172a',
  textSecondary: '#64748b',
  background: '#f8fafc',
  backgroundElement: '#ffffff',
  primary: '#00a8ff',
};

const darkColors: ThemePalette = {
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  background: '#020617',
  backgroundElement: '#0f172a',
  primary: '#00a8ff',
};

const CentralEngineContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const userName = "Ivan";
  const systemScheme = useColorScheme();
  const themeColors = systemScheme === 'dark' ? darkColors : lightColors;
  
  // App Core Volatile States
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isM5Connected, setIsM5Connected] = useState<boolean>(false);
  const [soilMoisture, setSoilMoisture] = useState<number>(35);
  const [isPumpOn, setIsPumpOn] = useState<boolean>(false);
  const [scheduledTime, setScheduledTime] = useState<string>('08:00 AM');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    // 1. Initial State Tree Synchronization Timer (Fake splash load)
    const splashTimer = setTimeout(() => setIsInitializing(false), 1500);

    // 2. Centralized 1-Second Telemetry Engine Clock
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    // 3. System Hardware Battery Check
    const getBatteryStatus = async () => {
      try {
        const level = await Battery.getBatteryLevelAsync();
        setBatteryLevel(Math.round(level * 100));
      } catch {
        setBatteryLevel(94); // Sandbox simulation backup profile
      }
    };
    getBatteryStatus();

    // Cleanup active background workers when the application instance unmounts
    return () => {
      clearTimeout(splashTimer);
      clearInterval(timeInterval);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Centralized Audio Output Engine
  const playMrBeanAlert = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/mr_bean_ringtone.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.log('Centralized audio playback pipeline failed:', error);
    }
  };

  // Centralized Actuator Command Handler
  const triggerWaterPump = (status: boolean) => {
    setIsPumpOn(status);
    if (status) {
      // Simulate running the pump for 3 seconds, increasing moisture, and triggering the tone alarm
      setTimeout(() => {
        setSoilMoisture((prev) => Math.min(prev + 25, 100));
        setIsPumpOn(false);
        playMrBeanAlert();
      }, 3000);
    }
  };

  return (
    <CentralEngineContext.Provider value={{
      userName, isInitializing, isM5Connected, setIsM5Connected,
      soilMoisture, setSoilMoisture, isPumpOn, scheduledTime, setScheduledTime,
      currentTime, batteryLevel, themeColors, triggerWaterPump, playMrBeanAlert
    }}>
      {children}
    </CentralEngineContext.Provider>
  );
}

// Custom hook helper to securely retrieve variables downstream
export function useCentralContext() {
  const context = useContext(CentralEngineContext);
  if (!context) {
    throw new Error('useCentralContext must be run inside an explicit AppProvider layout tree');
  }
  return context;
}