import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ipc/index" />
      <Stack.Screen name="ipc/[id]" />
      <Stack.Screen name="calculator" />
    </Stack>
  );
}