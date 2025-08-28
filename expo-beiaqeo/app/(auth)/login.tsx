import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { loginWithGoogle } = useAuth()

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      router.navigate('/(tabs)');
    } catch (error: any) {
      Alert.alert(
        'Error de Autenticación',
        error.message || 'No se pudo iniciar sesión con Google. Asegúrate de usar un correo institucional.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEmailAuth = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Error', 'Por favor completa todos los campos requeridos');
  //     return;
  //   }

  //   if (isRegisterMode && !name) {
  //     Alert.alert('Error', 'El nombre es requerido para el registro');
  //     return;
  //   }

  //   try {
  //     if (isRegisterMode) {
  //       await registerWithEmail(name, email, password);
  //     } else {
  //       await loginWithEmail(email, password);
  //     }
  //   } catch (error: any) {
  //     Alert.alert(
  //       'Error de Autenticación',
  //       error.message || (isRegisterMode ? 'Error al registrarse' : 'Error al iniciar sesión')
  //     );
  //   }
  // };

  // const resetForm = () => {
  //   setEmail('');
  //   setPassword('');
  //   setName('');
  //   setIsRegisterMode(false);
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/*<KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >*/}
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

          {/*{!showEmailAuth ? (*/}
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

            {/*<View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">o</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              <TouchableOpacity
                onPress={() => setShowEmailAuth(true)}
                className="py-3"
              >
                <Text className="text-blue-600 text-center font-medium">
                  Usar correo electrónico
                </Text>
              </TouchableOpacity>*/}
            </View>
          {/*) : (*/}
            {/*<View className="space-y-6">
              <TouchableOpacity
                onPress={() => {
                  setShowEmailAuth(false);
                  resetForm();
                }}
                className="flex-row items-center mb-4"
              >
                <Ionicons name="arrow-back" size={24} color="#6b7280" />
                <Text className="ml-2 text-gray-600">Volver</Text>
              </TouchableOpacity>

              <Text className="text-xl font-bold text-gray-800 text-center">
                {isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </Text>

              {isRegisterMode && (
                <View>
                  <Text className="text-gray-700 font-medium mb-2">Nombre completo</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Tu nombre completo"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View>
                <Text className="text-gray-700 font-medium mb-2">Correo institucional</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="usuario@universidad.edu.pe"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Contraseña</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Ingresa tu contraseña"
                  secureTextEntry
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                />
              </View>

              <TouchableOpacity
                onPress={handleEmailAuth}
                disabled={isLoading}
                className={`py-4 rounded-lg ${
                  isLoading ? 'bg-gray-400' : 'bg-blue-600'
                }`}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  {isLoading
                    ? 'Procesando...'
                    : isRegisterMode
                      ? 'Crear Cuenta'
                      : 'Iniciar Sesión'
                  }
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsRegisterMode(!isRegisterMode);
                  resetForm();
                }}
                className="py-3"
              >
                <Text className="text-blue-600 text-center font-medium">
                  {isRegisterMode
                    ? '¿Ya tienes cuenta? Inicia sesión'
                    : '¿No tienes cuenta? Regístrate'
                  }
                </Text>
              </TouchableOpacity>
            </View>*/}
          {/*)}*/}

          {/* Footer Info */}
          <View className="mt-12 p-4 bg-blue-50 rounded-lg">
            <Text className="text-blue-800 text-center font-medium mb-2">
              📍 Acceso Institucional
            </Text>
            <Text className="text-blue-600 text-center text-sm">
              Solo correos institucionales están autorizados.
            </Text>
          </View>
        </View>
      {/*</KeyboardAvoidingView>*/}
    </SafeAreaView>
  );
}
