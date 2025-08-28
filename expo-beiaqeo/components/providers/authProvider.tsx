import { pbAuth } from '@/services/pocketbase/auth';
import { AuthRecord } from 'pocketbase';
import { createContext, ReactNode, use, useEffect, useState } from 'react';

type AuthContextType = {
  user: AuthRecord | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<AuthRecord | null>(pbAuth.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(pbAuth.isAuthenticated());

  useEffect(() => {
    const unsubscribe = pbAuth.getPocketBase().authStore.onChange((_token, model) => {
      setUser(model);
      setIsAuthenticated(pbAuth.isAuthenticated());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    const authData = await pbAuth.loginWithGoogle();
    setUser(authData.record);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await pbAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuth = async () => {
    await pbAuth.refreshAuth();
    setUser(pbAuth.getCurrentUser());
    setIsAuthenticated(pbAuth.isAuthenticated());
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginWithGoogle, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = use(AuthContext);

  if (!ctx){
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}
