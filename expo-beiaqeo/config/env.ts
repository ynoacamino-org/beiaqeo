const ENV = {
  POCKETBASE_URL: process.env.EXPO_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090',
  GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
};


export default ENV;

export const PocketBaseConfig = {
  url: ENV.POCKETBASE_URL,
};

export const AuthConfig = {
  googleClientId: ENV.GOOGLE_CLIENT_ID,
  sessionTimeout: 24 * 60 * 60 * 1000,
};
