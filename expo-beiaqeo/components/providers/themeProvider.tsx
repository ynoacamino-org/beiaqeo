import { ThemeProvider as RNThemeProvider, DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const lightNavTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#3f51b5',
    background: '#ffffff',
    text: '#08080a',
    card: '#ffffff',
    border: '#e4e4eb',
    notification: '#f59e0b',
  },
};

const darkNavTheme = {
  ...DarkTheme,
  colors: {
    primary: '#3f51b5',
    background: '#08080a',
    text: '#f9f9f9',
    card: '#08080a',
    border: '#29292d',
    notification: '#f59e0b',
  },
};

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkNavTheme : lightNavTheme;

  return <RNThemeProvider value={theme}>{children}</RNThemeProvider>;
};
