import { ThemeOverride } from '@chakra-ui/react';

export const link: ThemeOverride['components'] = {
  Link: {
    baseStyle: {
      _hover: {
        textDecoration: 'none',
      },
    },
  },
};
