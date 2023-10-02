import { ChakraProvider } from '@chakra-ui/react';

// Themes
import { customTheme } from '@/themes';

const App = () => {
  return <ChakraProvider theme={customTheme}></ChakraProvider>;
};

export default App;
