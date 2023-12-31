import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Constants
import { STORES } from '@/constants';

// Types
import { ICartData } from '@/interface';

export type TCartStore = {
  data: ICartData[];
  addNewProduct: (product: ICartData) => void;
  updateCart: (product: ICartData[]) => void;
};

//  Cart store
export const useCartStore = create(
  persist<TCartStore>(
    (set) => ({
      data: [],
      addNewProduct: (product: ICartData): void =>
        set((state) => ({ data: [...state.data, product] })),
      updateCart: (products: ICartData[]) => set({ data: products }),
    }),
    {
      name: STORES.CART,
    },
  ),
);
