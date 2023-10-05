import { Box, Container, Flex } from '@chakra-ui/react';
import { ReactNode, memo } from 'react';

// Components
import { SideBar } from '@/components';

// Todo: Change children to <Outlet /> when I setup router
export const MainLayout = memo(({ children }: { children?: ReactNode }) => (
  <Container minH="100vh" py={51}>
    <Flex justifyContent="space-between">
      <Box flex={1} py={10}>
        {children}
      </Box>

      <Box
        w={{
          base: 100,
          md: 200,
          '2xl': 350,
        }}
        h="100vh"
      ></Box>
      <Box
        w="fit-content"
        position="fixed"
        top="50%"
        right={{
          base: 10,
          '2xl': 128,
        }}
        transform="translateY(-50%)"
      >
        <SideBar />
      </Box>
    </Flex>
  </Container>
));
