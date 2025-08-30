import { useAuth } from '@/components/providers/authProvider';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      setIsLoading(true);
      try {
        await logout();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Cerrar Sesión',
            style: 'destructive',
            onPress: async () => {
              setIsLoading(true);
              try {
                await logout();
              } catch (error) {
                console.error(error);
                Alert.alert('Error', 'No se pudo cerrar la sesión');
              } finally {
                setIsLoading(false);
              }
            },
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-start items-center px-6">
        <View className="bg-green-50 p-6 rounded-lg mb-8 w-full border border-green-200">
          <Text className="text-green-800 text-center font-medium mb-2">
            🎉 ¡Autenticación exitosa!
          </Text>
          <Text className="text-green-600 text-center">
            Ya tienes acceso al sistema de control de asistencia. Pronto podrás gestionar tu ubicación y registros.
          </Text>
        </View>

        <View className="bg-blue-50 p-6 rounded-lg mb-8 w-full border border-blue-200">
          <Text className="text-blue-800 text-center font-medium mb-3">
            📍 Próximas funcionalidades
          </Text>
          <View className="space-y-2">
            <Text className="text-blue-600 text-sm">• Control de ubicación en tiempo real</Text>
            <Text className="text-blue-600 text-sm">• Gestión de zonas de trabajo</Text>
            <Text className="text-blue-600 text-sm">• Historial de asistencia</Text>
            <Text className="text-blue-600 text-sm">• Notificaciones automáticas</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg ${
            isLoading ? 'bg-gray-400' : 'bg-red-600'
          }`}
        >
          <Text className="text-white font-semibold">
            {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </Text>
        </TouchableOpacity>

        <Link href="/account" className="mt-4">
          Ir a la página de cuenta
        </Link>
      </View>
    </SafeAreaView>
  );
}
