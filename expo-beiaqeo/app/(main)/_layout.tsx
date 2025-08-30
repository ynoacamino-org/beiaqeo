import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Header from '@/components/layout/header/Header';
import { useAuth } from '@/components/providers/authProvider';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View className="flex-1 bg-white">
      <Header />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
      </Stack>
    </View>
  );
}
