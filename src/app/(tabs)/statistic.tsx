import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const { themeColors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState({
    battery: 87,
    signal: 92,
    temperature: 34.2,
    humidity: 58,
    pressure: 1012,
    accelX: 0.45,
    accelY: -0.32,
    accelZ: 9.81,
    uptime: "18h 42m",
    lastUpdated: "Just now"
  });

  const [temperatureHistory, setTemperatureHistory] = useState([32, 33, 34, 34.5, 35, 34.8, 34.2]);

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = parseFloat((stats.temperature + (Math.random() - 0.5) * 0.4).toFixed(1));

      setStats(prev => ({
        ...prev,
        temperature: newTemp,
        humidity: Math.floor(prev.humidity + (Math.random() - 0.5) * 2),
        battery: Math.max(10, Math.min(100, prev.battery - (Math.random() > 0.93 ? 1 : 0))),
        lastUpdated: "Just now"
      }));

      setTemperatureHistory(prev => [...prev.slice(1), newTemp]);
    }, 2500);

    return () => clearInterval(interval);
  }, [stats.temperature]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const maxTemp = Math.max(...temperatureHistory);
  const minTemp = Math.min(...temperatureHistory);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingTop: 60 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <ThemedText type="title" style={{ fontSize: 32 }}>
            Statistics
          </ThemedText>
          <TouchableOpacity onPress={onRefresh}>
            <Ionicons name="refresh" size={24} color={themeColors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 24 }}>
          M5Stack S3 • Live Monitoring
        </ThemedText>

        {/* Quick Stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
          <StatCard icon="battery-half" value={`${stats.battery}%`} label="Battery" color="#4CAF50" />
          <StatCard icon="wifi" value={`${stats.signal}%`} label="Signal" color="#4CAF50" />
          <StatCard icon="thermometer" value={`${stats.temperature}°C`} label="Temp" color="#FF6B6B" />
          <StatCard icon="water" value={`${stats.humidity}%`} label="Humidity" color="#6BC1FF" />
        </View>

        {/* Temperature Trend */}
        <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
          Temperature Trend (°C)
        </ThemedText>

        <View style={{ 
          backgroundColor: themeColors.card, 
          borderRadius: 16, 
          padding: 16, 
          marginBottom: 24 
        }}>
          <View style={{ height: 220, flexDirection: 'row', alignItems: 'flex-end', gap: 8, paddingBottom: 20 }}>
            {temperatureHistory.map((temp, index) => {
              const height = ((temp - minTemp) / (maxTemp - minTemp + 1)) * 160 + 40;
              return (
                <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                  <ThemedText style={{ fontSize: 12, marginBottom: 6 }}>{temp}</ThemedText>
                  <View style={{
                    width: '100%',
                    height: height,
                    backgroundColor: '#4CAF50',
                    borderRadius: 8,
                    opacity: 0.9
                  }} />
                  <ThemedText style={{ fontSize: 11, marginTop: 6, color: themeColors.textSecondary }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </ThemedText>
                </View>
              );
            })}
          </View>
        </View>

        {/* IMU Sensor */}
        <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
          IMU Sensor (Accelerometer)
        </ThemedText>
        <View style={{ backgroundColor: themeColors.card, padding: 20, borderRadius: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: '#FF6B6B' }}>X</ThemedText>
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.accelX}</ThemedText>
            </View>
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: '#4ECDC4' }}>Y</ThemedText>
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.accelY}</ThemedText>
            </View>
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: '#FFD93D' }}>Z</ThemedText>
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>{stats.accelZ}</ThemedText>
            </View>
          </View>
        </View>

        <ThemedText style={{ textAlign: 'center', color: themeColors.textSecondary, marginTop: 10 }}>
          Last updated: {stats.lastUpdated}
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  const { themeColors } = useTheme();
  return (
    <View style={{
      backgroundColor: themeColors.card,
      borderRadius: 16,
      padding: 16,
      width: '48%',
      alignItems: 'center'
    }}>
      <Ionicons name={icon as any} size={36} color={color} />
      <ThemedText style={{ fontSize: 26, fontWeight: 'bold', marginVertical: 8 }}>
        {value}
      </ThemedText>
      <ThemedText style={{ color: themeColors.textSecondary }}>{label}</ThemedText>
    </View>
  );
}