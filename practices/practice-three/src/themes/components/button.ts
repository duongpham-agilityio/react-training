import { ThemeOverride } from '@chakra-ui/react';

export const button: ThemeOverride['components'] = {
  Button: {
    baseStyle: {
      color: 'darkGrey30',
      bg: 'white',
      transition: '0.3s linear',
      borderColor: 'darkGrey30',
      borderRadius: 'md',
    },
    defaultProps: {
      colorScheme: 'transparent',
      color: 'primary',
    },
    variants: {
      default: {
        bg: 'white',
        color: 'darkGrey30',
      },

      active: {
        bg: 'successToLight',
        color: 'white',
      },

      hoverShadow: {
        _hover: {
          boxShadow: 'base',
        },
      },
    },
  },
};
