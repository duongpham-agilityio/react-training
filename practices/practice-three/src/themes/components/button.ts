import { ThemeOverride } from '@chakra-ui/react';

export const button: ThemeOverride['components'] = {
  Button: {
    defaultProps: {
      colorScheme: 'transparent',
    },
  },
};
