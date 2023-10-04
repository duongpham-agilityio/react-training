import { Box, Container, Flex } from '@chakra-ui/react';
import { ReactNode, memo } from 'react';

// Components
import { SideBar } from '@/components';

// Todo: Change children to <Outlet /> when I setup router
export const MainLayout = memo(({ children }: { children?: ReactNode }) => {
  return (
    <Container minH="100vh">
      <Flex>
        <Box w={1024} py={10}>
          {children}
        </Box>
        <Box
          position="fixed"
          top="50%"
          right="14%"
          transform="translateY(-50%)"
        >
          <SideBar />
        </Box>
      </Flex>
    </Container>
  );
});
