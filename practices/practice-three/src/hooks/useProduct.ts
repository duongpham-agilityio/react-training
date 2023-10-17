import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/// Stores
import {
  TCartStore,
  TFavoriteStore,
  useCartStore,
  useFavoriteStore,
} from '@/stores';

// Components
import { IFormAddData } from '@/pages/Profile/components/FormAdd';

// Services
import { ProductPayload, productAPI } from '@/services/apis';

// Constants
import { ENDPOINT_SERVICES } from '@/constants';

// Helpers
import { formatPayloadProduct } from '@/helpers';

// Types
import { ICartData, IProduct } from '@/interface';

export type TUseProduct = {
  onAddProduct: (data: IFormAddData) => Promise<boolean>;
  onUpdateProduct: (
    id: number,
    product: Partial<ProductPayload>,
  ) => Promise<boolean>;
  onRemoveProduct: (id: number) => Promise<boolean>;
};

export const useProduct = (): TUseProduct => {
  const queryClient = useQueryClient();
  const cart: ICartData[] = useCartStore((state: TCartStore) => state.data);
  const handleUpdateCart = useCartStore(
    (state: TCartStore) => state.updateCart,
  );
  const favorites: IProduct[] = useFavoriteStore(
    (state: TFavoriteStore) => state.data,
  );
  const handleUpdateFavorite = useFavoriteStore(
    (state: TFavoriteStore) => state.updateStore,
  );

  const onAddProduct = useCallback(
    async (data: IFormAddData): Promise<boolean> => {
      try {
        const product: ProductPayload = {
          ...data,
          isLiked: false,
        };

        await productAPI.add(formatPayloadProduct(product) as ProductPayload);

        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
    [queryClient],
  );

  const onUpdateProduct = useCallback(
    async (id: number, product: Partial<ProductPayload>): Promise<boolean> => {
      try {
        await productAPI.update(id, formatPayloadProduct(product));

        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        return true;
      } catch (error) {
        return false;
      }
    },
    [queryClient],
  );

  const onRemoveProduct = useCallback(
    async (id: number): Promise<boolean> => {
      console.log(123);
      try {
        await productAPI.removeById(id);
        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        // Filter product in cart and favorites store
        const newCart: ICartData[] = cart.filter(
          (item) => item.productId !== id,
        );
        const newFavorites: IProduct[] = favorites.filter(
          (item) => item.id !== id,
        );

        // Update cart & favorites store
        handleUpdateCart(newCart);
        handleUpdateFavorite(newFavorites);

        return true;
      } catch (error) {
        return false;
      }
    },
    [cart, favorites, handleUpdateCart, handleUpdateFavorite, queryClient],
  );

  return {
    onAddProduct,
    onUpdateProduct,
    onRemoveProduct,
  };
};
