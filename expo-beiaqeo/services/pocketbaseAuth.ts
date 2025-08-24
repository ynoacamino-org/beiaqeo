import { APP_CONSTANTS } from '@/config/constants';
import { AuthConfig, PocketBaseConfig } from '@/config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from "expo-auth-session";
import PocketBase, { AsyncAuthStore, AuthRecord, RecordAuthResponse } from 'pocketbase';
import eventsource from 'react-native-sse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.EventSource = eventsource as any;

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: AsyncStorage.getItem('pb_auth'),
});

const pb = new PocketBase(PocketBaseConfig.url, store);

class PocketBaseAuthService {

  constructor() {
    pb.authStore.onChange((token, model) => {
      console.log('PocketBase auth changed:', !!token, model?.email);
    });
  }

  async loginWithGoogle(): Promise<RecordAuthResponse> {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: APP_CONSTANTS.SCHEME,
      path: 'auth/callback',
    })

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${AuthConfig.googleClientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=openid%20email%20profile`;

    const request = new AuthSession.AuthRequest({
      clientId: AuthConfig.googleClientId,
      redirectUri,
      scopes: ['openid', 'email', 'profile'],
      responseType: AuthSession.ResponseType.Code,
    });

    const discovery = {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    };

    const result = await request.promptAsync(discovery);

    if (result.type === "success" && result.params.code) {
      const { code } = result.params;

      const authData = await pb.collection('users').authWithOAuth2Code(
        'google',
        code,
        request.codeVerifier ?? '',
        redirectUri
      );

      return authData;
    } else {
      throw new Error("Login con Google cancelado o fallido");
    }

  }

  async logout(): Promise<void> {
    try {
      pb.authStore.clear();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  isAuthenticated(): boolean {
    return pb.authStore.isValid;
  }

  getCurrentUser(): AuthRecord | null {
    if (!this.isAuthenticated() || !pb.authStore.record) {
      return null;
    }

    return pb.authStore.record;
  }

  async refreshAuth(): Promise<void> {
    try {
      if (this.isAuthenticated()) {
        await pb.collection('users').authRefresh();
      }
    } catch (error) {
      console.error('Error refreshing auth:', error);
      pb.authStore.clear();
    }
  }

  validateInstitutionalEmail(email: string): boolean {
    return email.endsWith('@unsa.edu.pe');
  }

  getPocketBase(): PocketBase {
    return pb;
  }
}

export const pocketbaseAuth = new PocketBaseAuthService();
export { pb };
