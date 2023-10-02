import { extendTheme } from '@chakra-ui/react';

// Base themes
import { colors, fonts, fontWeights } from '@/themes/base';

export const customTheme = extendTheme({
  colors,
  fonts,
  fontWeights,
});
