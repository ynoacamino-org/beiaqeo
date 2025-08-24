import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export function useAuthInitialization() {
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  return { isInitialized, isAuthenticated };
}
