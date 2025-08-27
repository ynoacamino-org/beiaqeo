import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import LoadingScreen from '@/components/LoadingScreen';
// import { useAuthInitialization } from '@/hooks/useAuthInitialization';
import { useColorScheme } from '@/hooks/useColorScheme';

import "@/app/global.css";
import { pocketbaseAuth } from '@/services/pocketbaseAuth';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const { isInitialized, isAuthenticated } = useAuthInitialization();
  const isAuthenticated = pocketbaseAuth.isAuthenticated();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    console.log({
      loaded,
      // isInitialized
    })

    return <LoadingScreen />;
  }

  console.log('[isAuthenticated]: ', isAuthenticated);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? '(tabs)' : '(auth)'}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
