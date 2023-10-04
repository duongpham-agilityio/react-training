import { memo } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

// Components
import { ProductCard } from '@/components';

// Mocks
import { productCardProps } from '@/mocks';

export interface ProductsProps {
  data: string[];
}

export const Products = memo(() => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {Array.from({ length: 10 }).map(
        (
          _,
          index, // Todo: Update when apply BE
        ) => (
          <GridItem key={index}>
            <ProductCard {...productCardProps} />
          </GridItem>
        ),
      )}
    </Grid>
  );
});
