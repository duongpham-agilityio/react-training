import { Box, Grid, GridItem } from '@chakra-ui/react';
import { memo, useCallback } from 'react';

// Hooks
import { useFavorite } from '@/hooks';

// Stores
import { TFavoriteStore, useFavoriteStore } from '@/stores';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { TProductCard, ProductCard } from '@/components';
import { Message } from '@/components/common';

// Types
import { IProduct } from '@/interface';
import { formatProductCardProps } from '@/helpers';

const Component = (): JSX.Element => {
  const favorites = useFavoriteStore((state: TFavoriteStore) => state.data);
  const { onToggleFavorite } = useFavorite();

  // Check for product is liked
  const isLiked = useCallback(
    (id: number): boolean => {
      return !!favorites.find((item) => id === item.id);
    },
    [favorites],
  );

  const handleAddToFavorite = useCallback(
    (id: number) => {
      const product: IProduct | undefined = favorites.find(
        (item) => item.id === id,
      );

      onToggleFavorite(product);
    },
    [favorites, onToggleFavorite],
  );

  // Todo: Update to late
  const handleAddToCart = useCallback(() => {}, []);

  const handleRenderProduct = useCallback(
    (product: IProduct): JSX.Element => {
      const { id } = product;

      const info: TProductCard = {
        ...formatProductCardProps(product),
        isLiked: isLiked(id),
      };

      return (
        <GridItem key={id}>
          <ProductCard
            info={info}
            onLike={handleAddToFavorite}
            onAddToCart={handleAddToCart}
          />
        </GridItem>
      );
    },
    [handleAddToCart, handleAddToFavorite, isLiked],
  );

  return (
    <Box overflowY="scroll" h="full" py={5}>
      <Grid
        gridTemplateColumns={{
          base: '1fr',
          '2xl': '1fr 1fr',
        }}
        gap={5}
      >
        {favorites.length ? (
          favorites.map(handleRenderProduct)
        ) : (
          <Message message={MESSAGES.EMPTY} />
        )}
      </Grid>
    </Box>
  );
};

const Wishlist = memo(Component);

export default Wishlist;
