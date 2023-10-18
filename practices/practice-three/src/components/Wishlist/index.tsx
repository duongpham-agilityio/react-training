import { memo, useCallback, useMemo } from 'react';

// Hooks
import { useFavorite, useHandleCart, useToast } from '@/hooks';

// Stores
import { TFavoriteStore, useFavoriteStore } from '@/stores';

// Constants
import { MESSAGES, TITLES } from '@/constants';

// Components
import { Products } from '@/components';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  const favorites = useFavoriteStore((state: TFavoriteStore) => state.data);
  const { onToggleFavorite } = useFavorite();
  // Show toast
  const { showToast } = useToast();
  // Get handle add to cart
  const { handleAddProductToCart } = useHandleCart();

  const formatFavorites: IProduct[] = useMemo(
    () =>
      favorites.map((product) => {
        return {
          ...product,
          isLiked: true,
        };
      }),
    [favorites],
  );

  // Handle toggle favorite
  const handleToggleFavorite = useCallback(
    (id: number) => {
      const product: IProduct | undefined = favorites.find(
        (item) => item.id === id,
      );

      onToggleFavorite(product);
    },
    [favorites, onToggleFavorite],
  );

  // Filter and handle add product to cart
  const handleAddToCart = useCallback(
    (id: number): void => {
      const product: IProduct = formatFavorites.find(
        (product) => product.id === id,
      ) as IProduct;

      const isAddSuccess: boolean = handleAddProductToCart(product);

      showToast({
        title: isAddSuccess ? TITLES.ADD : TITLES.REMOVE,
        description: isAddSuccess
          ? MESSAGES.ADD_TO_CART_SUCCESS
          : MESSAGES.ADD_TO_CART_FAIL,
        status: isAddSuccess ? 'success' : 'error',
        duration: 1000,
      });
    },
    [formatFavorites, handleAddProductToCart, showToast],
  );
  return (
    <Products
      data={formatFavorites}
      onAddToCart={handleAddToCart}
      onAddToFavorite={handleToggleFavorite}
    />
  );
};
const Wishlist = memo(Component);

export default Wishlist;
