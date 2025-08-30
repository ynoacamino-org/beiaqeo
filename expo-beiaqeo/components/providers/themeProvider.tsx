import { DarkColors, LightColors } from '@/config/colors';
import { ThemeProvider as RNThemeProvider, DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const lightNavTheme = {
  ...DefaultTheme,
  colors: LightColors,
};

const darkNavTheme = {
  ...DarkTheme,
  colors: DarkColors,
};

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkNavTheme : lightNavTheme;

  return <RNThemeProvider value={theme}>{children}</RNThemeProvider>;
};
