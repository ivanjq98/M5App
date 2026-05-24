// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
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
      {isInitializing ? <LoadingScreen /> : <AppNavigator />}
    </ThemeProvider>
  );
}

function LoadingScreen() {
  const { themeColors } = useTheme();

  return (
    <ThemedView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={[styles.splashOrb, { backgroundColor: themeColors.primary }]} />
      <ThemedText 
        type="title" 
        style={{ 
          color: themeColors.text, 
          fontWeight: '900', 
          fontSize: 42 
        }}
      >
        M5Stack S3
      </ThemedText>
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
  container: { flex: 1 },
  splashOrb: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 32,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 25,
  },
};