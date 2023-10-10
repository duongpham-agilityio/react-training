import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Styles
import { IProduct } from '@/interface';

export interface IUseFavorite {
  data: IProduct[];
  onToggleFavorite: (product?: IProduct) => void;
}

export const useFavorite = create(
  persist<IUseFavorite>(
    (set, get) => ({
      data: [],
      onToggleFavorite: (product?: IProduct): void => {
        const { data } = get();

        if (!product) {
          return;
        }

        // check product exists in the store.
        const isExist: boolean = !!data.find((item) => product.id === item.id);

        // Remove from favorites list when Product already exists
        if (isExist) {
          const newFavorites = data.filter((item) => product.id !== item.id);

          return set({ data: newFavorites });
        }

        // Add product to favorites
        return set({
          data: [...data, product],
        });
      },
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
