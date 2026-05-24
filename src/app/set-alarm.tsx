import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useBLE } from '../components/BLEContext';
import { ThemedText, ThemedView } from '../components/Themed';
import { useTheme } from '../components/ThemeProvider';

export default function SetAlarmScreen() {
  const { themeColors } = useTheme();
  const { connectedDevice } = useBLE();
  const router = useRouter();

  const [seconds, setSeconds] = useState('30');
  const [isAlarmActive, setIsAlarmActive] = useState(false);
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
            await char.writeWithResponse(command);
            Alert.alert("✅ Sent", command.includes("SET_ALARM") ? "Alarm has been set!" : "Alarm stopped!");
            return;
          }
        }
      }
    } catch (error: any) {
      Alert.alert("Send Failed", error.message);
    } finally {
      setIsSending(false);
    }
  };

  const startAlarm = () => {
    const sec = parseInt(seconds);
    if (isNaN(sec) || sec <= 0) {
      Alert.alert("Error", "Please enter a valid number of seconds");
      return;
    }
    sendCommand(`SET_ALARM:${sec}`);
    setIsAlarmActive(true);
  };

  const stopAlarm = () => {
    sendCommand("STOP_ALARM");
    setIsAlarmActive(false);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40, paddingBottom: 100 }}>
        
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
          <Ionicons name="arrow-back" size={28} color={themeColors.text} />
        </TouchableOpacity>

        <ThemedText type="title" style={{ fontSize: 32, marginBottom: 8 }}>
          Set Alarm
        </ThemedText>
        <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 30 }}>
          Timer on AtomS3
        </ThemedText>

        {connectedDevice && (
          <ThemedText style={{ color: '#4CAF50', marginBottom: 20 }}>
            ✅ Connected to {connectedDevice.name}
          </ThemedText>
        )}

        <View style={{ backgroundColor: themeColors.card, borderRadius: 20, padding: 24, marginBottom: 24 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 12 }}>Alarm in seconds:</ThemedText>
          
          <TextInput
            style={{
              backgroundColor: '#1E1E1E',
              color: '#fff',
              fontSize: 48,
              textAlign: 'center',
              borderRadius: 12,
              padding: 12,
              marginBottom: 16
            }}
            value={seconds}
            onChangeText={setSeconds}
            keyboardType="number-pad"
            maxLength={4}
          />

          <ThemedText style={{ textAlign: 'center', color: themeColors.textSecondary }}>
            seconds from now
          </ThemedText>
        </View>

        <View style={{ gap: 16 }}>
          <TouchableOpacity 
            onPress={startAlarm} 
            disabled={isSending || !connectedDevice}
          >
            <View style={{ backgroundColor: '#4CAF50', padding: 24, borderRadius: 20, alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 22, color: '#fff', fontWeight: '700' }}>
                ⏰ Start Alarm ({seconds}s)
              </ThemedText>
            </View>
          </TouchableOpacity>

          {isAlarmActive && (
            <TouchableOpacity onPress={stopAlarm} disabled={isSending}>
              <View style={{ backgroundColor: '#FF3B30', padding: 24, borderRadius: 20, alignItems: 'center' }}>
                <ThemedText style={{ fontSize: 22, color: '#fff', fontWeight: '700' }}>
                  🛑 Stop Alarm
                </ThemedText>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ThemedText style={{ textAlign: 'center', color: themeColors.textSecondary, marginTop: 40 }}>
          The AtomS3 will flash red and beep when alarm triggers
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}