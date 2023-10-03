import { ThemeOverride } from '@chakra-ui/react';

// Custom colors
export const colors: ThemeOverride['colors'] = {
  red: {
    10: '#E86F6F',
  },
  green: {
    10: '#00A711',
    20: '#02660C',
  },
  gray: {
    10: '#E0E0E0',
    20: '#979797',
    30: '#585858',
    40: '#474747',
  },
  yellow: {
    10: '#F8D442',
    20: '#FEAF00',
  },
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
