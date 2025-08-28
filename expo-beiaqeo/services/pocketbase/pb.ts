import { PocketBaseConfig } from '@/config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore } from 'pocketbase';

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: (async () => await AsyncStorage.getItem('pb_auth'))(),
  clear: async () => AsyncStorage.clear()
});

export const pb = new PocketBase(PocketBaseConfig.url, store);
