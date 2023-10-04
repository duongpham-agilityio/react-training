import { Box, Container, Flex } from '@chakra-ui/react';
import { ReactNode, memo } from 'react';
import { FilterBar, ProductCard, SideBar } from '..';
import { productCardProps } from '@/mocks';

// Todo: Change children to <Outlet /> when I setup router
export const MainLayout = memo(({ children }: { children?: ReactNode }) => {
  return (
    <Container minH="100vh" bg="gray.100">
      <Flex h="full">
        <Box w={1141} py={32}>
          {children}
          <FilterBar value="" onChange={() => {}} />
          {Array.from({ length: 30 }).map(() => (
            <ProductCard {...productCardProps} />
          ))}
        </Box>
        <Flex
          flex={1}
          h="100vh"
          justifyContent="flex-end"
          alignItems="center"
          // position="fixed"
        >
          <SideBar />
        </Flex>
      </Flex>
    </Container>
  );
});
