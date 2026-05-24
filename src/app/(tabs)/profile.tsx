// app/(tabs)/profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Linking, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

export default function ProfileScreen() {
  const { themeColors, isDark, toggleTheme } = useTheme();
  
  const [name, setName] = useState('John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const saveName = () => {
    if (tempName.trim().length > 0) {
      setName(tempName);
      setIsEditing(false);
      Alert.alert('Success', 'Name updated successfully!');
    } else {
      Alert.alert('Error', 'Name cannot be empty');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            // You can add navigation back to login here later
          }
        },
      ]
    );
  };

  const openM5Website = () => {
    Linking.openURL('https://m5stack.com');
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <ThemedText type="title" style={{ fontSize: 32, marginBottom: 40 }}>
        Profile
      </ThemedText>

      {/* Avatar */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <View style={{ 
          width: 110, 
          height: 110, 
          borderRadius: 55, 
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ThemedText style={{ fontSize: 50 }}>👤</ThemedText>
        </View>
      </View>

      {/* Name Section */}
      <View style={{ marginBottom: 24 }}>
        <ThemedText style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>
          Display Name
        </ThemedText>
        
        <View style={{ 
          flexDirection: 'row', 
          backgroundColor: themeColors.card, 
          borderRadius: 12, 
          alignItems: 'center',
          paddingHorizontal: 16
        }}>
          <TextInput
            style={{
              flex: 1,
              color: themeColors.text,
              fontSize: 18,
              paddingVertical: 14,
            }}
            value={isEditing ? tempName : name}
            onChangeText={isEditing ? setTempName : undefined}
            editable={isEditing}
            placeholder="Enter your name"
            placeholderTextColor="#888"
          />

          <TouchableOpacity onPress={() => {
            if (isEditing) {
              saveName();
            } else {
              setTempName(name);
              setIsEditing(true);
            }
          }}>
            <ThemedText style={{ color: '#4CAF50', fontWeight: '600' }}>
              {isEditing ? 'Save' : 'Edit'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Email */}
      <View style={{ marginBottom: 32 }}>
        <ThemedText style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>
          Email
        </ThemedText>
        <View style={{ 
          backgroundColor: themeColors.card, 
          padding: 16, 
          borderRadius: 12 
        }}>
          <ThemedText style={{ fontSize: 16 }}>johndoe@gmail.com</ThemedText>
        </View>
      </View>

      {/* Theme Toggle */}
      <TouchableOpacity 
        onPress={toggleTheme}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: themeColors.card,
          padding: 18,
          borderRadius: 16,
          marginBottom: 12
        }}
      >
        <Ionicons 
          name={isDark ? "sunny-outline" : "moon-outline"} 
          size={26} 
          color={themeColors.text} 
        />
        <ThemedText style={{ marginLeft: 16, fontSize: 18, flex: 1 }}>
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </ThemedText>
      </TouchableOpacity>

      {/* Help / M5Stack Website */}
      <TouchableOpacity 
        onPress={openM5Website}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: themeColors.card,
          padding: 18,
          borderRadius: 16,
          marginBottom: 12
        }}
      >
        <Ionicons name="help-circle-outline" size={26} color={themeColors.text} />
        <ThemedText style={{ marginLeft: 16, fontSize: 18, flex: 1 }}>
          Help & M5Stack Official Site
        </ThemedText>
        <Ionicons name="open-outline" size={20} color={themeColors.textSecondary} />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity 
        onPress={handleLogout}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FF3B30',
          padding: 18,
          borderRadius: 16,
          marginTop: 20
        }}
      >
        <Ionicons name="log-out-outline" size={26} color="#fff" />
        <ThemedText style={{ marginLeft: 16, fontSize: 18, color: '#fff', fontWeight: '600' }}>
          Logout
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}