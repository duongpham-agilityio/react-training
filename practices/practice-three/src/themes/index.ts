import { extendTheme } from '@chakra-ui/react';

// Base themes
import { colors, fonts, fontWeights, shadows } from '@/themes/base';
import { button, link, container } from '@/themes/components';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  shadows,
  components: {
    ...button,
    ...link,
    ...container,
  },
});
