// app/(tabs)/explore.tsx
import { ThemedText, ThemedView } from '../../components/Themed';

export default function ExploreScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText style={{ marginTop: 12 }}>Discover new goals</ThemedText>
    </ThemedView>
  );
}