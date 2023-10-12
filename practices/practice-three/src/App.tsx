import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

// Themes
import { customTheme } from '@/themes';

// Routes
import { routes } from '@/routes';

// Servers
import { worker } from '@/servers/msw';

const queryClient: QueryClient = new QueryClient();

//  Start MSW
worker.start();

const App = (): JSX.Element => (
  <ChakraProvider theme={customTheme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
