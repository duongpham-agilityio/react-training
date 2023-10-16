import { Box } from '@chakra-ui/react';
import { memo } from 'react';

// Components
import { SideBar } from '@/components';

export const SideBarWrapper = memo(() => (
  <>
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
  </>
));
