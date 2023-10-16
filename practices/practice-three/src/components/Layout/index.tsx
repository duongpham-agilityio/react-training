import { Container, Divider, VStack } from '@chakra-ui/react';
import { memo } from 'react';

// HOCs
import { withIsAuth } from '@/hocs';

// Components
import { Header } from './Header';
import { Body } from './Body';

const MainLayoutComponent = () => {
  return (
    <Container>
      <VStack>
        <Header />
        <Divider />
        <Body />
      </VStack>
    </Container>
  );
};

export const MainLayout = memo(withIsAuth(MainLayoutComponent));
