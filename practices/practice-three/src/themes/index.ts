import { extendTheme } from '@chakra-ui/react';

// Base themes
import {
  colors,
  fonts,
  fontWeights,
  shadows,
  radii,
  fontSizes,
} from '@/themes/base';
import { button, link, container } from '@/themes/components';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
  shadows,
  radii,
  fontSizes,
  components: {
    ...button,
    ...link,
    ...container,
  },
});
