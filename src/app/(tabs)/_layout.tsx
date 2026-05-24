// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { 
            backgroundColor: '#0F0F0F', 
            borderTopWidth: 0,
            height: 65,
            paddingTop: 8,
            paddingBottom: 88,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Home', 
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> 
          }} 
        />
        <Tabs.Screen 
          name="explore" 
          options={{ 
            title: 'Explore', 
            tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} /> 
          }} 
        />
        <Tabs.Screen 
          name="projects" 
          options={{ 
            title: 'Projects', 
            tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} /> 
          }} 
        />
        <Tabs.Screen 
          name="statistic" 
          options={{ 
            title: 'Statistics', 
            tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} /> 
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{ 
            title: 'Profile', 
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> 
          }} 
        />
      </Tabs>
    </SafeAreaView>
  );
}