import { extendTheme } from '@chakra-ui/react';

// Base themes
import { colors, fonts, fontWeights } from '@/themes/base';
import { button } from '@/themes/components';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  components: {
    ...button,
  },
});
