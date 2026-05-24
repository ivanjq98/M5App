// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { BLEProvider } from '../components/BLEContext';
import { ThemedText, ThemedView } from '../components/Themed';
import { ThemeProvider, useTheme } from '../components/ThemeProvider';

export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <BLEProvider>
        {isInitializing ? <LoadingScreen /> : <AppNavigator />}
      </BLEProvider>
    </ThemeProvider>
  );
}

function LoadingScreen() {
  const { themeColors } = useTheme();

  return (
    <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      
      {/* GIF Logo */}
      <Image 
        source={require('../../assets/logo.gif')} 
        style={styles.logoGif}
        resizeMode="contain"
      />
      
      <ThemedText 
        type="small" 
        style={{ 
          color: themeColors.textSecondary, 
          marginTop: 8 
        }}
      >
        Connecting to your world
      </ThemedText>
    </ThemedView>
  );
}

function AppNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const styles = {
  container: { 
    flex: 1 
  },
  logoGif: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
};