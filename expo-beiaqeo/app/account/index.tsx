import { useAuth } from '@/components/providers/authProvider';
import { Image } from '@/components/ui/Image';
import { extractAvatar } from '@/lib/utils';
import { IconLogout, IconUser } from '@tabler/icons-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-start items-center px-6">
      <View className="items-center mb-8">
        {user?.avatar ? (
          <Image
            source={{ uri: extractAvatar(user) }}
            contentFit='cover'
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
      <View className="w-full flex flex-col">
        <TouchableOpacity
          className='w-full px-6 py-4 text-start flex flex-row justify-between items-center border border-red-600 rounded-lg'
          disabled={isLoading}
          onPress={handleLogout}
        >
          <Text className='text-red-600 font-semibold'>
            Cerrar Sesión
          </Text>
          <IconLogout size={16} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
