import { ThemeOverride } from '@chakra-ui/react';

// Custom colors
export const colors: ThemeOverride['colors'] = {
  primary: ' #000',
  secondary: '#979797',
  error: '#E86F6F',
  errorToLight: '#FF7979',
  warning: '#FEAF00',
  warningToLight: '#F8D442',
  success: '#02660C',
  successToLight: '#00A711',
  dark: '#474747',
  darkToLight: '#E0E0E0',
  darkGrey30: '#979797',
  darkGrey40: '#585858',
  darkRGB: 'rgba(164, 164, 164, 0.30)',
  infoRGB: 'rgba(0, 133, 255, 0.7)',
};

// Custom fonts
const defaultFont = '"Almarai", sans-serif';
export const fonts: ThemeOverride['fonts'] = {
  heading: defaultFont,
  body: defaultFont,
  mono: defaultFont,
};

// Custom fontWeights
export const fontWeights: ThemeOverride['fontWeights'] = {
  light: 300,
  regular: 400,
  bold: 700,
  extrabold: 800,
};

// Custom boxShadow
export const shadows: ThemeOverride['shadows'] = {
  base: '5px 5px 20px 0px rgba(133, 133, 133, 0.20)',
};

// Custom radii
export const radii: ThemeOverride['radii'] = {
  sm: '5px',
  md: '10px',
  lg: '20px',
  xl: '25px',
  '2xl': '30px',
  '3xl': '50px',
};

// Custom fontSize
export const fontSizes: ThemeOverride['fontSizes'] = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '24px',
  '4xl': '26px',
  '5px': '30px',
  '6xl': '32px',
  '7xl': '50px',
};
