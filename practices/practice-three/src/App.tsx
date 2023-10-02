import { ChakraProvider } from '@chakra-ui/react';

// Themes
import { customTheme } from '@/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient: QueryClient = new QueryClient();

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
