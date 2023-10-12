import { ThemeOverride } from '@chakra-ui/react';

export const button: ThemeOverride['components'] = {
  Button: {
    baseStyle: {
      color: 'black',
    },
    defaultProps: {
      colorScheme: 'transparent',
      color: 'black',
    },
    variants: {
      hoverShadow: {
        _hover: {
          boxShadow: 'base',
        },
      },
    },
  },
};
