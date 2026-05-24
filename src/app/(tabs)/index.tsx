// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, PermissionsAndroid, Platform, TouchableOpacity, View } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { useBLE } from '../../components/BLEContext';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

export default function HomeScreen() {
  const { themeColors } = useTheme();
  const { connectedDevice, setConnectedDevice } = useBLE();

  const bleManager = useRef<BleManager | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Initialize BLE
  useEffect(() => {
    bleManager.current = new BleManager();
    return () => bleManager.current?.destroy();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return Object.values(granted).every(status => status === 'granted');
    }
    return true;
  };

  const startScan = async () => {
    if (!bleManager.current) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert("Permission Required", "Bluetooth permissions needed.");
      return;
    }

    setDevices([]);
    setIsScanning(true);

    bleManager.current.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }
      if (device && device.name) {
        const name = device.name.toUpperCase();
        if (name.startsWith("M5") || name.startsWith("ATOM")) {
          setDevices(prev => prev.some(d => d.id === device.id) ? prev : [...prev, device]);
        }
      }
    });

    setTimeout(() => {
      bleManager.current?.stopDeviceScan();
      setIsScanning(false);
    }, 12000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      setIsScanning(true);
      const connected = await device.connect();
      await connected.discoverAllServicesAndCharacteristics();

      setConnectedDevice(connected);
      Alert.alert("✅ Connected!", `Connected to ${device.name || 'Device'}`);
    } catch (error: any) {
      Alert.alert("Connection Failed", error.message);
    } finally {
      setIsScanning(false);
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        await connectedDevice.cancelConnection();
        setConnectedDevice(null);
        Alert.alert("Disconnected", "Device disconnected successfully.");
      } catch (error) {
        Alert.alert("Error", "Failed to disconnect");
      }
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 40, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <ThemedText type="title" style={{ fontSize: 32, marginBottom: 4 }}>
              StackUp
            </ThemedText>
            <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 24 }}>
              Device Monitor
            </ThemedText>

            {/* Connection Status */}
            <View style={{ 
              backgroundColor: connectedDevice ? '#4CAF5022' : '#FF980022', 
              padding: 16, 
              borderRadius: 16, 
              marginBottom: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons 
                  name={connectedDevice ? "bluetooth" : "bluetooth-outline"} 
                  size={28} 
                  color={connectedDevice ? '#4CAF50' : '#FF9800'} 
                />
                <ThemedText style={{ marginLeft: 12, fontWeight: '700', fontSize: 18 }}>
                  {connectedDevice ? 'Connected' : 'Disconnected'}
                </ThemedText>
              </View>
              
              {connectedDevice && (
                <TouchableOpacity onPress={disconnectDevice}>
                  <ThemedText style={{ color: '#FF3B30', fontWeight: '600' }}>Disconnect</ThemedText>
                </TouchableOpacity>
              )}
            </View>

            {/* Scan Button */}
            <TouchableOpacity 
              onPress={startScan}
              style={{
                backgroundColor: isScanning ? '#666' : '#4CAF50',
                padding: 18,
                borderRadius: 16,
                alignItems: 'center',
                marginBottom: 24
              }}
              disabled={isScanning}
            >
              <ThemedText style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
                {isScanning ? '🔍 Scanning...' : '🔍 Scan M5 / Atom Devices'}
              </ThemedText>
            </TouchableOpacity>

            <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
              Found Devices ({devices.length})
            </ThemedText>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => connectToDevice(item)}
            style={{
              backgroundColor: themeColors.card,
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1 }}>
              <ThemedText style={{ fontWeight: '700' }}>
                {item.name || 'Unnamed Device'}
              </ThemedText>
              <ThemedText style={{ color: themeColors.textSecondary, fontSize: 12 }}>
                {item.id}
              </ThemedText>
            </View>
            <Ionicons name="bluetooth" size={24} color="#4CAF50" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !isScanning && (
            <ThemedText style={{ textAlign: 'center', color: themeColors.textSecondary, marginTop: 50 }}>
              Press the Scan button above to find M5Stack devices
            </ThemedText>
          )
        }
      />
    </ThemedView>
  );
}