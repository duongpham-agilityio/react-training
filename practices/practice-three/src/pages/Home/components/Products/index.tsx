import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Grid, GridItem } from '@chakra-ui/react';

// Components
import { ProductCard } from '@/components';

// Mocks
import { productCardProps } from '@/mocks';

export interface ProductsProps {
  data: string[];
}

const areCompare = (prevProps: ProductsProps, nextProps: ProductsProps) =>
  isEqual(prevProps.data, nextProps.data);

export const Products = memo(
  (): JSX.Element => (
    <Grid
      templateColumns={{
        base: '1fr',
        xl: '1fr 1fr',
      }}
      gap={6}
    >
      {Array.from({ length: 10 }).map(
        (
          _,
          index: number, // Todo: Update when apply BE
        ): JSX.Element => (
          <GridItem key={index}>
            <ProductCard {...productCardProps} />
          </GridItem>
        ),
      )}
    </Grid>
  ),
  areCompare,
);
