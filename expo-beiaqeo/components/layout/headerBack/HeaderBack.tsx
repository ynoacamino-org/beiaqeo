import { IconArrowLeft } from '@tabler/icons-react-native';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function HeaderBack() {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white mb-4">
      <TouchableOpacity
        onPress={router.back}
      >
        <IconArrowLeft size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
