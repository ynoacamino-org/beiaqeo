import { APP_CONSTANTS } from '@/config/constants';
import { AuthConfig } from '@/config/env';
import { pb } from '@/services/pocketbase/pb';
import * as AuthSession from "expo-auth-session";
import PocketBase, { AuthRecord, RecordAuthResponse } from 'pocketbase';

class PocketBaseAuthService {
  async loginWithGoogle(): Promise<RecordAuthResponse> {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: APP_CONSTANTS.SCHEME,
      path: 'auth/callback',
    })

    const discovery = {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    };

    const request = new AuthSession.AuthRequest({
      clientId: AuthConfig.googleClientId,
      redirectUri,
      scopes: ['openid', 'email', 'profile'],
      responseType: AuthSession.ResponseType.Code,
    });

    if (!request.codeVerifier) {
      throw new Error('No se pudo generar el code verifier.');
    }

    const result = await request.promptAsync(discovery);

    if (result.type !== "success" || !result.params.code) {
      throw new Error(`El inicio de sesión ha fallado: ${result.type}`);
    }

    const { code } = result.params;

    const authData = await pb.collection('users').authWithOAuth2Code(
      'google',
      code,
      request.codeVerifier,
      redirectUri
    );

    return authData;
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

export const pbAuth = new PocketBaseAuthService();
