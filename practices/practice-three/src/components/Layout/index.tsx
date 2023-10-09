import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { SideBar } from '@/components';

// Images
import { Logo } from '@/assets/images';

export const MainLayout = memo(() => {
  return (
    <Container>
      <VStack>
        <Center
          as={Link}
          py={2}
          gap={3}
          href="/"
          w="full"
          justifyContent="flex-start"
        >
          <Image
            w={45}
            h={45}
            src={Logo}
            objectFit="cover"
            borderRadius={5}
            alt="Logo for website"
          />
          <Text fontSize={18} letterSpacing={2}>
            Agility
          </Text>
        </Center>
        <Divider />
        <Flex w="full" justifyContent="space-between">
          <Box flex={1}>
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <Outlet />
            </Suspense>
          </Box>

          <Box
            w={{
              base: 100,
              md: 230,
              '2xl': 280,
            }}
            minH="100vh"
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
      </VStack>
    </Container>
  );
});
