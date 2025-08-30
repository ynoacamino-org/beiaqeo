import { useAuth } from '@/components/providers/authProvider';
import { extractAvatar } from '@/lib/utils';
import { IconUser } from '@tabler/icons-react-native';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-start items-center px-6">
        <View className="items-center mb-8">
          {user?.avatar ? (
            <Image
              source={{ uri: extractAvatar(user) }}
              className="w-32 h-32 rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
              <IconUser size={20} color="white" />
            </View>
          )}
          <Text className="text-lg text-gray-600 text-center mb-1">
            {user?.name || 'Usuario'}
          </Text>

          <Text className="text-base text-gray-500 text-center">
            {user?.email}
          </Text>
        </View>        
      </View>
    </SafeAreaView>
  );
}
