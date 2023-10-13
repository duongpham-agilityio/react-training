import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Constants
import { STORES } from '@/constants';

// Types
import { ICartData } from '@/interface';

export interface ICartStore {
  data: ICartData[];
  addNewProduct: (product: ICartData) => void;
  updateCart: (product: ICartData[]) => void;
}

//  Cart store
export const cartStore = create(
  persist<ICartStore>(
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
