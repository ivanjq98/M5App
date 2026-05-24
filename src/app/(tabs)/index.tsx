// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

export default function HomeScreen() {
  const { themeColors } = useTheme();

  const devices = [
    { id: 1, name: "M5S3-Core", status: "Connected", battery: 87, signal: "WiFi", lastSeen: "Just now" },
    { id: 2, name: "M5S3-Env", status: "Connected", battery: 64, signal: "Bluetooth", lastSeen: "2 min ago" },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 60 }}>
        
        <ThemedText type="title" style={{ fontSize: 32, marginBottom: 4 }}>
          M5Stack S3
        </ThemedText>
        <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 24 }}>
          Device Monitor
        </ThemedText>

        {/* Connected Devices */}
        <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
          Connected Devices
        </ThemedText>

        {devices.map((device) => (
          <View key={device.id} style={{
            backgroundColor: themeColors.card,
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: themeColors.border,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 48, height: 48, backgroundColor: '#4CAF50', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="cube-outline" size={28} color="#fff" />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <ThemedText style={{ fontSize: 18, fontWeight: '700' }}>{device.name}</ThemedText>
                  <ThemedText style={{ color: '#4CAF50' }}>{device.status}</ThemedText>
                </View>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <ThemedText style={{ fontSize: 22, fontWeight: 'bold' }}>{device.battery}%</ThemedText>
                <View style={{ width: 90, height: 6, backgroundColor: '#333', borderRadius: 3, marginTop: 4 }}>
                  <View style={{ 
                    width: `${device.battery}%`, 
                    height: '100%', 
                    backgroundColor: device.battery > 50 ? '#4CAF50' : '#FF9800', 
                    borderRadius: 3 
                  }} />
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Dashboard Section */}
        <ThemedText style={{ fontSize: 20, fontWeight: '600', marginTop: 28, marginBottom: 12 }}>
          Live Dashboard
        </ThemedText>

        <View style={{ 
          height: 420, 
          backgroundColor: themeColors.card,
          borderRadius: 16, 
          justifyContent: 'center', 
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themeColors.border 
        }}>
          <Ionicons name="globe-outline" size={60} color={themeColors.textSecondary} />
          <ThemedText style={{ marginTop: 16, fontSize: 18, textAlign: 'center' }}>
            Web Dashboard
          </ThemedText>
          <ThemedText style={{ color: themeColors.textSecondary, textAlign: 'center', paddingHorizontal: 40, marginTop: 8 }}>
            Run this app on Android to view your M5Stack S3 dashboard
          </ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
}