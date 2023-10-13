import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORES } from '@/constants';

export interface IAuthStore {
  isAuth: boolean;
  setIsAuth: () => void;
  clearIsAuth: () => void;
}

export const authStore = create(
  persist<IAuthStore>(
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
