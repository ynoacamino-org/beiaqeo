import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: 'fade',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#00000000',
        },
        title: '',
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
