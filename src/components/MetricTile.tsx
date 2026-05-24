import { Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

// Define what props our reusable tile needs
interface MetricTileProps {
  icon: string;
  value: string | number;
  label: string;
  backgroundColor: string;
  // If no custom action is passed, clicking the tile goes to settings by default
  onPress?: () => void; 
}

export function MetricTile({ icon, value, label, backgroundColor, onPress }: MetricTileProps) {
  const router = useRouter();

  // If a custom onPress isn't provided (like a pump toggle), default to the settings page
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigates to your settings screen layout path
      router.push('/(tabs)/Settings'); // Adjust this path to match your settings file name!
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.gridTile, { backgroundColor }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.tileContent}>
        <ThemedText style={styles.tileIcon}>{icon}</ThemedText>
        <ThemedText style={styles.tileValue}>{value}</ThemedText>
        <ThemedText style={styles.tileLabel}>{label}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridTile: { 
    width: '47%', 
    aspectRatio: 1, 
    borderRadius: 28, 
    padding: Spacing.three, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 6, 
    elevation: 2 
  },
  tileContent: { alignItems: 'center', justifyContent: 'center', gap: 2 },
  tileIcon: { fontSize: 28 },
  tileValue: { fontSize: 24, fontWeight: '900', color: '#ffffff', marginTop: 4 },
  tileLabel: { color: '#ffffff', fontSize: 13, fontWeight: '700', textAlign: 'center', opacity: 0.95 },
});