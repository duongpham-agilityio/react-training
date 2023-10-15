import { useCallback } from 'react';

// Stores
import { TFavoriteStore, useFavoriteStore } from '@/stores';

// Types
import { IProduct } from '@/interface';

export type TUseFavorite = {
  onToggleFavorite: (product?: IProduct) => void;
};

export const useFavorite = (): TUseFavorite => {
  const favorites: IProduct[] = useFavoriteStore(
    (state: TFavoriteStore) => state.data,
  );

  const addToStore = useFavoriteStore(
    (state: TFavoriteStore) => state.setNewProduct,
  );

  const updateStore = useFavoriteStore(
    (state: TFavoriteStore) => state.updateStore,
  );

  const onToggleFavorite = useCallback(
    (product?: IProduct) => {
      if (!product) {
        return;
      }

      // check product exists in the store.
      const isExist: boolean = !!favorites.find(
        (item) => product.id === item.id,
      );

      // Remove from favorites list when Product already exists
      if (isExist) {
        const newFavorites = favorites.filter((item) => product.id !== item.id);

        return updateStore(newFavorites);
      }

      return addToStore(product);
    },
    [addToStore, favorites, updateStore],
  );

  return {
    onToggleFavorite,
  };
};
