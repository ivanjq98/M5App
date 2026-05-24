import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
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

// Loading Screen
function LoadingScreen() {
  const { themeColors } = useTheme();

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: themeColors.primary,
        marginBottom: 32,
      }} />
      <ThemedText type="title" style={{ fontSize: 48, fontWeight: '900' }}>
        M5Stack S3
      </ThemedText>
      <ThemedText style={{ marginTop: 8, color: themeColors.textSecondary }}>
        Connecting to your world
      </ThemedText>
    </ThemedView>
  );
}

// Main Navigation
function AppNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}