import React from 'react';
import { View } from 'react-native';
import Area from './area';
import Profile from './profile';

export default function Header() {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <Area />
      <Profile />
    </View>
  );
}
