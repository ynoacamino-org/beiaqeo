import { pb } from '@/services/pocketbase/pb';
import PocketBase, { AuthRecord, RecordAuthResponse } from 'pocketbase';
import * as WebBrowser from "expo-web-browser";
import '@/config/eventsource';

WebBrowser.maybeCompleteAuthSession();

class PocketBaseAuthService {
  async loginWithGoogle(): Promise<RecordAuthResponse> {
    const redirectUrl = `${PocketBaseConfig.url}/api/custom-oauth2-redirect/google`
    const recordAuth = await pb.collection("users").authWithOAuth2({
      provider: 'google',
      urlCallback: async (url) => {
        await WebBrowser.openAuthSessionAsync(url).catch(console.error);
      }
    })
    
    return recordAuth;
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
