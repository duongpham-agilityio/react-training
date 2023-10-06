import { Box, Grid } from '@chakra-ui/react';
import { memo } from 'react';

// Components
import { ProductCard } from '@/components';

// Mocks
import { productCardProps } from '@/mocks';

const Component = () => (
  <Box overflowY="scroll" h="full" py={5}>
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        '2xl': '1fr 1fr',
      }}
      gap={5}
    >
      {/* 
    // Todo: Update to late 
  */}
      {Array.from({ length: 3 }).map(() => (
        <ProductCard {...productCardProps} />
      ))}
    </Grid>
  </Box>
);

const Wishlist = memo(Component);

export default Wishlist;
