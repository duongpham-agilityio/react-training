import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Grid, GridItem } from '@chakra-ui/react';

// Constants
import { TFavoriteStore, useFavoriteStore } from '@/stores';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { ProductCard, TProductCardProps } from '@/components';
import { Message } from '@/components/common';

// Types
import { IProduct } from '@/interface';
import { formatProductCardProps } from '@/helpers';

export interface ProductsProps extends Omit<TProductCardProps, 'info'> {
  data: IProduct[];
}

export const Products = memo(
  ({ data, onAddToCart, onLike }: ProductsProps): JSX.Element => {
    const favorites = useFavoriteStore((state: TFavoriteStore) => state.data);

    // Check for product is liked
    const isLiked = useCallback(
      (id: number): boolean => {
        return !!favorites.find((item) => id === item.id);
      },
      [favorites],
    );

    const handleRenderProduct = useCallback(
      (product: IProduct): JSX.Element => {
        const info = {
          ...formatProductCardProps(product),
          isLiked: isLiked(product.id),
        };

        return (
          <GridItem key={product.id}>
            <ProductCard
              info={info}
              onAddToCart={onAddToCart}
              onLike={onLike}
            />
          </GridItem>
        );
      },
      [isLiked, onAddToCart, onLike],
    );

    return data.length ? (
      <Grid
        templateColumns={{
          base: '1fr',
          xl: '1fr 1fr',
        }}
        gap={6}
      >
        {data.map(handleRenderProduct)}
      </Grid>
    ) : (
      <Message message={MESSAGES.EMPTY} />
    );
  },
  isEqual,
);
