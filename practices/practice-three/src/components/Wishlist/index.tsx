import { Box, Grid, GridItem } from '@chakra-ui/react';
import { memo, useCallback } from 'react';

// Hooks
import { IUseFavorite, useFavorite } from '@/hooks';

// Constants
import { LIMIT_QUANTITY } from '@/constants';

// Components
import { IProductCard, ProductCard } from '@/components';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  const favorites = useFavorite((state: IUseFavorite) => state.data);
  const onAddToFavorite = useFavorite(
    (state: IUseFavorite) => state.handleToggleFavorite,
  );

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

      onAddToFavorite(product);
    },
    [favorites, onAddToFavorite],
  );

  // Todo: Update to late
  const handleAddToCart = useCallback(() => {}, []);

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
        {favorites.map(handleRenderProduct)}
      </Grid>
    </Box>
  );
};

const Wishlist = memo(Component);

export default Wishlist;
