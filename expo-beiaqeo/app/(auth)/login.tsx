import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/components/providers/authProvider';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      router.replace('/');
    } catch (error: unknown) {
      const err = error as Error;
      Alert.alert(
        'Error de Autenticación',
        err.message || 'No se pudo iniciar sesión con Google. Asegúrate de usar un correo institucional.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-6">
            <Ionicons name="location" size={32} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Beiaqeo
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Control de Asistencia
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2">
            Inicia sesión con tu correo institucional UNSA
          </Text>
        </View>

        <View className="space-y-6">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            disabled={isLoading}
            className="flex-row items-center justify-center bg-white border-2 border-gray-300 rounded-lg py-4 px-6 shadow-sm"
          >
            <Ionicons name="logo-google" size={24} color="#4285f4" />
            <Text className="ml-3 text-gray-700 font-semibold text-lg">
              {isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-12 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-center font-medium mb-2">
            📍 Acceso Institucional
          </Text>
          <Text className="text-blue-600 text-center text-sm">
            Solo correos institucionales están autorizados.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
