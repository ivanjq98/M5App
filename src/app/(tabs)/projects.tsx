// app/(tabs)/goals.tsx
import { useRouter } from 'expo-router';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

const projects = [
  { 
    title: "Test Color", 
    subtitle: "RGB LED & Display Effects", 
    icon: "🎨", 
    color: "#FF6B6B",
    screen: "/color-test" 
  },
  { 
    title: "Microphone Testing", 
    subtitle: "Voice Input Test", 
    icon: "🎤", 
    color: "#4ECDC4" 
  },
  { 
    title: "Set Alarm", 
    subtitle: "Timer & Alarm System", 
    icon: "⏰", 
    color: "#FFD93D",
    screen: "/set-alarm"     
  },
  { 
    title: "Tetris Game", 
    subtitle: "Classic Block Game", 
    icon: "🕹️", 
    color: "#8E5CFF" 
  },
  { 
    title: "AI Chat Assistant", 
    subtitle: "Voice + LLM Chat", 
    icon: "🤖", 
    color: "#6BC1FF" 
  },
  { 
    title: "Water Plant System", 
    subtitle: "Auto Watering + Sensor", 
    icon: "🌱", 
    color: "#95E08E" 
  },
];

export default function ProjectsScreen() {
  const { themeColors } = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40, paddingBottom: 100 }}>
        <ThemedText type="title" style={{ fontSize: 32, marginBottom: 8 }}>
          M5Stack Projects
        </ThemedText>
        <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 24 }}>
          Select a project to launch
        </ThemedText>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          {projects.map((project, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '48%',
                backgroundColor: themeColors.card,
                borderRadius: 20,
                padding: 20,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: project.color + '44',
              }}
              onPress={() => {
                if (project.screen) {
                  router.push(project.screen);
                } else {
                  Alert.alert(project.title, "This project is coming soon!");
                }
              }}
            >
              <ThemedText style={{ fontSize: 36, marginBottom: 12 }}>{project.icon}</ThemedText>
              <ThemedText style={{ fontWeight: '700', fontSize: 18 }}>{project.title}</ThemedText>
              <ThemedText style={{ color: themeColors.textSecondary }}>{project.subtitle}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}