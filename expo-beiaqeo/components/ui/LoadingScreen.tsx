import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className="mt-4 text-gray-600 text-lg">Cargando...</Text>
    </View>
  );
}
