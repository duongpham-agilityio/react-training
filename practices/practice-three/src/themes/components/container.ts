import { ThemeOverride } from '@chakra-ui/react';

export const container: ThemeOverride['components'] = {
  Container: {
    baseStyle: {
      maxWidth: {
        sm: '340px',
        md: '720px',
        lg: '940px',
        xl: '1140px',
        '2xl': '1472px',
      },
      margin: '0 auto',
    },
  },
};
