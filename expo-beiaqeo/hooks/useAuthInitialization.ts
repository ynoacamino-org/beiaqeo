// src/hooks/useAuthInitialization.ts
import { useEffect, useState } from "react";
import { pb } from "@/services/pocketbaseAuth";

export function useAuthInitialization() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);

  useEffect(() => {
    // 1. Esperar a que AsyncAuthStore termine de cargar desde AsyncStorage
    pb.authStore.loadFromStorage?.().finally(() => {
      setIsAuthenticated(pb.authStore.isValid);
      setIsInitialized(true);
    });

    // 2. Escuchar cambios (login/logout/refresh)
    const unsubscribe = pb.authStore.onChange(() => {
      setIsAuthenticated(pb.authStore.isValid);
    });

    return unsubscribe; // cleanup cuando el componente se desmonta
  }, []);

  return { isInitialized, isAuthenticated };
}
