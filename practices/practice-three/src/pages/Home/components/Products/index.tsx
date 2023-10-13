import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { Grid, GridItem } from '@chakra-ui/react';

// Constants
import { IFavoriteStore, useFavoriteStore } from '@/stores';

// Constants
import { LIMIT_QUANTITY, MESSAGES } from '@/constants';

// Components
import { IProductCard, ProductCard, ProductCardProps } from '@/components';

// Types
import { IProduct } from '@/interface';
import { Message } from '@/components/common';

export interface ProductsProps extends Omit<ProductCardProps, 'info'> {
  data: IProduct[];
}

export const Products = memo(
  ({ data, onAddToCart, onLike }: ProductsProps): JSX.Element => {
    const favorites = useFavoriteStore((state: IFavoriteStore) => state.data);

    // Check for product is liked
    const isLiked = useCallback(
      (id: number): boolean => {
        return !!favorites.find((item) => id === item.id);
      },
      [favorites],
    );

    const handleRenderProduct = useCallback(
      (product: IProduct): JSX.Element => {
        const { id, imageURL, name, description, price, quantity } = product;
        const info: IProductCard = {
          id,
          imageURL,
          price,
          description,
          title: name,
          status: quantity <= LIMIT_QUANTITY,
          statusMessage: `Only ${quantity} left`,
          isLiked: isLiked(id),
        };

        return (
          <GridItem key={id}>
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
