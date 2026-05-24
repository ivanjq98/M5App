// app/(tabs)/goals.tsx
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../../components/Themed';
import { useTheme } from '../../components/ThemeProvider';

const projects = [
  {
    title: "Test Color",
    subtitle: "RGB LED Control",
    icon: "🎨",
    color: "#FF6B6B",
    status: "Ready"
  },
  {
    title: "Microphone Testing",
    subtitle: "Voice Input Test",
    icon: "🎤",
    color: "#4ECDC4",
    status: "Ready"
  },
  {
    title: "Set Alarm",
    subtitle: "Timer & Alarm System",
    icon: "⏰",
    color: "#FFD93D",
    status: "Ready"
  },
  {
    title: "Tetris Game",
    subtitle: "Classic Block Game",
    icon: "🕹️",
    color: "#8E5CFF",
    status: "Ready"
  },
  {
    title: "AI Chat Assistant",
    subtitle: "Voice + LLM Chat",
    icon: "🤖",
    color: "#6BC1FF",
    status: "Ready"
  },
  {
    title: "Water Plant System",
    subtitle: "Auto Watering + Sensor",
    icon: "🌱",
    color: "#95E08E",
    status: "Ready"
  },
];

export default function ProjectsScreen() {
  const { themeColors } = useTheme();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 60 }}>
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
                alert(`Launching: ${project.title}\n\nThis feature is under development.`);
                // You can later navigate to specific screens here
              }}
            >
              <ThemedText style={{ fontSize: 36, marginBottom: 12 }}>{project.icon}</ThemedText>
              
              <ThemedText style={{ fontWeight: '700', fontSize: 18, marginBottom: 4 }}>
                {project.title}
              </ThemedText>
              
              <ThemedText style={{ color: themeColors.textSecondary, marginBottom: 12 }}>
                {project.subtitle}
              </ThemedText>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ 
                  backgroundColor: '#4CAF50', 
                  paddingHorizontal: 10, 
                  paddingVertical: 2, 
                  borderRadius: 999 
                }}>
                  <ThemedText style={{ fontSize: 12, color: '#fff' }}>{project.status}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}