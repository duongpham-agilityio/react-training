import { extendTheme } from '@chakra-ui/react';

// Base themes
import { colors, fonts, fontWeights } from '@/themes/base';
import { button, link } from '@/themes/components';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  components: {
    ...button,
    ...link,
  },
});
