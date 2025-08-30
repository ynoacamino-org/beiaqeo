import HeaderBack from '@/components/layout/headerBack/HeaderBack';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AccountLayout() {
  return (
    <View className="flex-1">
      <HeaderBack />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View >
  );
}
