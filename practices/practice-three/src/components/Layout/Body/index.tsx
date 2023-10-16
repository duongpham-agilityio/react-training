import { memo } from 'react';
import { Flex } from '@chakra-ui/react';

// Components
import { SideBarWrapper } from './components/SidebarWrapper';
import { RenderPage } from './components/RenderPage';

export const Body = memo(() => (
  <Flex w="full" justifyContent="space-between" py={10}>
    <RenderPage />
    <SideBarWrapper />
  </Flex>
));
