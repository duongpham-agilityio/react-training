import { ThemeOverride } from '@chakra-ui/react';

// Custom colors
export const colors: ThemeOverride['colors'] = {
  red: {
    10: '#E86F6F',
    20: '#FF7979',
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
    alpha: {
      10: 'rgba(164, 164, 164, 0.30)',
    },
  },
  yellow: {
    10: '#F8D442',
    20: '#FEAF00',
  },
  blue: {
    alpha: {
      10: 'rgba(0, 133, 255, 0.7)',
    },
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

// Custom boxShadow
export const shadows: ThemeOverride['shadows'] = {
  base: '5px 5px 20px 0px rgba(133, 133, 133, 0.20)',
};
