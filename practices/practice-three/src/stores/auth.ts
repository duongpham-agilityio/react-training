import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORES } from '@/constants';

export type TAuthStore = {
  isAuth: boolean;
  setIsAuth: () => void;
  clearIsAuth: () => void;
};

export const useAuthStore = create(
  persist<TAuthStore>(
    (set) => ({
      isAuth: false,
      setIsAuth: () => set({ isAuth: true }),
      clearIsAuth: () => set({ isAuth: false }),
    }),
    {
      name: STORES.AUTHENTICATION,
    },
  ),
);
