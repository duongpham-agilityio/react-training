import { Box, Spinner } from '@chakra-ui/react';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';

export const RenderPage = memo(() => (
  <Box flex={1}>
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  </Box>
));
