// app/(tabs)/profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Linking, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

export default function ProfileScreen() {
  const { themeColors, isDark, toggleTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    bio: "M5Stack S3 enthusiast & IoT developer",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const saveProfile = () => {
    if (!tempProfile.name.trim() || !tempProfile.email.trim()) {
      Alert.alert("Error", "Name and Email cannot be empty");
      return;
    }
    setProfile(tempProfile);
    setIsEditing(false);
    Alert.alert("✅ Success", "Profile updated successfully!");
  };

  const openM5Website = () => {
    Linking.openURL('https://m5stack.com');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => Alert.alert('Logged Out', 'You have been logged out.')
        },
      ]
    );
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <ThemedText type="title" style={{ fontSize: 32, marginBottom: 30 }}>
        My Profile
      </ThemedText>

      {/* Avatar */}
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <View style={{ 
          width: 120, 
          height: 120, 
          borderRadius: 60, 
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: isDark ? '#333' : '#fff'
        }}>
          <ThemedText style={{ fontSize: 55 }}>👤</ThemedText>
        </View>
        <TouchableOpacity style={{ marginTop: 8 }}>
          <ThemedText style={{ color: '#4CAF50', fontWeight: '600' }}>Change Avatar</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Editable Fields */}
      <View style={{ gap: 20 }}>
        
        <View>
          <ThemedText style={{ fontWeight: '600', marginBottom: 8 }}>Display Name</ThemedText>
          <View style={{ backgroundColor: themeColors.card, borderRadius: 12, paddingHorizontal: 16 }}>
            <TextInput
              style={{ color: themeColors.text, fontSize: 18, paddingVertical: 14 }}
              value={isEditing ? tempProfile.name : profile.name}
              onChangeText={(text) => setTempProfile(prev => ({...prev, name: text}))}
              editable={isEditing}
              placeholder="Your name"
            />
          </View>
        </View>

        <View>
          <ThemedText style={{ fontWeight: '600', marginBottom: 8 }}>Email</ThemedText>
          <View style={{ backgroundColor: themeColors.card, borderRadius: 12, paddingHorizontal: 16 }}>
            <TextInput
              style={{ color: themeColors.text, fontSize: 18, paddingVertical: 14 }}
              value={isEditing ? tempProfile.email : profile.email}
              onChangeText={(text) => setTempProfile(prev => ({...prev, email: text}))}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View>
          <ThemedText style={{ fontWeight: '600', marginBottom: 8 }}>Bio</ThemedText>
          <View style={{ backgroundColor: themeColors.card, borderRadius: 12, paddingHorizontal: 16 }}>
            <TextInput
              style={{ color: themeColors.text, fontSize: 16, paddingVertical: 14, minHeight: 80 }}
              value={isEditing ? tempProfile.bio : profile.bio}
              onChangeText={(text) => setTempProfile(prev => ({...prev, bio: text}))}
              editable={isEditing}
              multiline
              placeholder="Tell us about yourself..."
            />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ marginTop: 40, gap: 12 }}>
        
        <TouchableOpacity 
          onPress={() => isEditing ? saveProfile() : setIsEditing(true)}
          style={{
            backgroundColor: isEditing ? '#4CAF50' : themeColors.card,
            padding: 16,
            borderRadius: 16,
            alignItems: 'center'
          }}
        >
          <ThemedText style={{ fontWeight: '700', fontSize: 18, color: isEditing ? '#fff' : themeColors.text }}>
            {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
          </ThemedText>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity 
          onPress={toggleTheme}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeColors.card,
            padding: 18,
            borderRadius: 16,
          }}
        >
          <Ionicons name={isDark ? "sunny-outline" : "moon-outline"} size={26} color={themeColors.text} />
          <ThemedText style={{ marginLeft: 16, fontSize: 18, flex: 1 }}>
            {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </ThemedText>
        </TouchableOpacity>

        {/* M5Stack Website */}
        <TouchableOpacity 
          onPress={openM5Website}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: themeColors.card,
            padding: 18,
            borderRadius: 16,
          }}
        >
          <Ionicons name="help-circle-outline" size={26} color={themeColors.text} />
          <ThemedText style={{ marginLeft: 16, fontSize: 18, flex: 1 }}>
            M5Stack Official Website
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
            marginTop: 10
          }}
        >
          <Ionicons name="log-out-outline" size={26} color="#fff" />
          <ThemedText style={{ marginLeft: 16, fontSize: 18, color: '#fff', fontWeight: '600' }}>
            Logout
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}