import '@/app/global.css';
import { AuthProvider } from '@/components/providers/authProvider';
import { ThemeProvider } from '@/components/providers/themeProvider';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    RobotoMono: require('../assets/fonts/RobotoMono-Regular.ttf'),
    RobotoMonoMedium: require('../assets/fonts/RobotoMono-Medium.ttf'),
  });

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaView className="flex-1">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(main)" />
            <Stack.Screen name="account" />
          </Stack>
        </SafeAreaView>
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
