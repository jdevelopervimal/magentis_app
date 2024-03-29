import {ColorValue} from 'react-native';

enum Theme {
  LIGHT_THEME = 'LIGHT_THEME',
  DARK_THEME = 'DARK_THEME',
}
export const DEFAULT_THEME = Theme.LIGHT_THEME;
export const themeColors: {
  [Theme.DARK_THEME]: {[key: string]: ColorValue | string | undefined};
  [Theme.LIGHT_THEME]: {[key: string]: ColorValue | string | undefined};
} = {
  [Theme.DARK_THEME]: {
    black: '#000000',
    primary: '#000000',
    secondary: '#000000',
    success: '#000000',
    danger: '#000000',
    info: '#000000',
  },
  [Theme.LIGHT_THEME]: {
    black: '#000000',
    primary: '#000000',
    secondary: '#000000',
    success: '#000000',
    danger: '#000000',
    info: '#000000',
  },
};

export const androidRipple = {color: '#ccc', borderless: false};

export const colors = themeColors[DEFAULT_THEME];
