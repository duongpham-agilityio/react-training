import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Constants
import { STORES } from '@/constants';

// Styles
import { IProduct } from '@/interface';

export type TFavoriteStore = {
  data: IProduct[];
  setNewProduct: (product: IProduct) => void;
  updateStore: (products: IProduct[]) => void;
};

export const useFavoriteStore = create(
  persist<TFavoriteStore>(
    (set) => ({
      data: [],
      setNewProduct: (product: IProduct): void =>
        set((state) => ({ data: [...state.data, product] })),
      updateStore: (products: IProduct[]): void => set({ data: products }),
    }),
    {
      name: STORES.FAVORITE,
    },
  ),
);
