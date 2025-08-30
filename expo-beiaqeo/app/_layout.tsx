import '@/app/global.css';
import { AuthProvider } from '@/components/providers/authProvider';
import { ThemeProvider } from '@/components/providers/themeProvider';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
          <Stack.Screen name="account" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
