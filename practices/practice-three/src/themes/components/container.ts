import { ThemeOverride } from '@chakra-ui/react';

export const container: ThemeOverride['components'] = {
  Container: {
    baseStyle: {
      maxWidth: {
        sm: '340px',
        md: '720px',
        lg: '940px',
        xl: '1200px',
        '2xl': '1400px',
      },
      margin: '0 auto',
    },
  },
};
