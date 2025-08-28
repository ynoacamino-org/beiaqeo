import ENV from "./env";

export const AppConfig = {
  NAME: 'Beiaqeo',
  DESCRIPTION: 'Control de Asistencia Inteligente',

  SCHEME: 'beiaqeo',
  DEEP_LINK_PREFIX: 'beiaqeo://',
};

export const PocketBaseConfig = {
  url: ENV.POCKETBASE_URL,
};

export const AuthConfig = {
  googleClientId: ENV.GOOGLE_CLIENT_ID,
  sessionTimeout: 24 * 60 * 60 * 1000,
};
