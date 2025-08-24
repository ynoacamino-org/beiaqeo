import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* User Avatar */}
        <View className="items-center mb-8">
          {user?.avatar ? (
            <Image 
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={32} color="white" />
            </View>
          )}
          
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            ¡Bienvenido!
          </Text>
          
          <Text className="text-lg text-gray-600 text-center mb-1">
            {user?.name || 'Usuario'}
          </Text>
          
          <Text className="text-base text-gray-500 text-center">
            {user?.email}
          </Text>

          {user?.provider && (
            <View className="flex-row items-center mt-2 bg-gray-100 px-3 py-1 rounded-full">
              <Ionicons 
                name={user.provider === 'google' ? 'logo-google' : 'mail'} 
                size={16} 
                color="#6b7280" 
              />
              <Text className="ml-2 text-sm text-gray-600 capitalize">
                {user.provider === 'google' ? 'Google' : 'Email'}
              </Text>
            </View>
          )}
        </View>

        {/* Success Message */}
        <View className="bg-green-50 p-6 rounded-lg mb-8 w-full border border-green-200">
          <Text className="text-green-800 text-center font-medium mb-2">
            🎉 ¡Autenticación exitosa!
          </Text>
          <Text className="text-green-600 text-center">
            Ya tienes acceso al sistema de control de asistencia. Pronto podrás gestionar tu ubicación y registros.
          </Text>
        </View>

        {/* Next Steps */}
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
      </View>
    </SafeAreaView>
  );
}
