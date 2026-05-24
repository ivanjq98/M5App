// app/color-test.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { useBLE } from '../components/BLEContext';
import { ThemedText, ThemedView } from '../components/Themed';
import { useTheme } from '../components/ThemeProvider';

export default function ColorTestScreen() {
  const { themeColors } = useTheme();
  const { connectedDevice } = useBLE();
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const sendCommand = async (command: string) => {
    if (!connectedDevice) {
      Alert.alert("Not Connected", "Please connect to AtomS3-BLE from the Home screen first.");
      return;
    }

    setIsSending(true);

    try {
      const services = await connectedDevice.services();
      
      for (const service of services) {
        const characteristics = await service.characteristics();
        
        for (const char of characteristics) {
          if (char.uuid.toLowerCase().includes("beb5483e")) {
            
            // ✅ FIXED: Convert to Base64
            const base64Data = btoa(command);   // btoa = string to Base64

            await char.writeWithResponse(base64Data);
            
            Alert.alert("✅ Command Sent", `${command} mode activated on AtomS3!`);
            return;
          }
        }
      }
      
      Alert.alert("Warning", "Characteristic not found.");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Send Failed", error.message || "Unknown error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40, paddingBottom: 100 }}>
        
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
          <Ionicons name="arrow-back" size={28} color={themeColors.text} />
        </TouchableOpacity>

        <ThemedText type="title" style={{ fontSize: 32, marginBottom: 8 }}>
          Test Color
        </ThemedText>
        <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 30 }}>
          AtomS3 Display Control
        </ThemedText>

        {connectedDevice && (
          <ThemedText style={{ color: '#4CAF50', marginBottom: 20 }}>
            ✅ Connected to {connectedDevice.name}
          </ThemedText>
        )}

        <View style={{ gap: 16 }}>
          <TouchableOpacity 
            onPress={() => sendCommand("RAINBOW")} 
            disabled={isSending || !connectedDevice}
          >
            <View style={{ backgroundColor: '#FF6B6B', padding: 26, borderRadius: 20, alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 26, color: '#fff', fontWeight: '700' }}>🌈 Rainbow Mode</ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => sendCommand("RANDOM_CIRCLES")} 
            disabled={isSending || !connectedDevice}
          >
            <View style={{ backgroundColor: themeColors.card, padding: 26, borderRadius: 20, alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 22, fontWeight: '700' }}>🎨 Random Circles</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}