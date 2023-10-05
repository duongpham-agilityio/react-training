import { extendTheme } from '@chakra-ui/react';

// Base themes
import {
  colors,
  fonts,
  fontWeights,
  shadows,
  breakpoints,
} from '@/themes/base';
import { button, link, container } from '@/themes/components';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  shadows,
  breakpoints,
  components: {
    ...button,
    ...link,
    ...container,
  },
});
