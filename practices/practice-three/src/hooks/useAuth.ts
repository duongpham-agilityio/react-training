import { useCallback, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToast } from '@chakra-ui/react';

// Constants
import { MESSAGES, ROUTES, TITLES, TOAST_TIME_OUT } from '@/constants';
import { useNavigate } from 'react-router-dom';

export interface IUseAuthStore {
  isAuth: boolean;
  setIsAuth: () => void;
  clearIsAuth: () => void;
}

export const useAuthStore = create(
  persist<IUseAuthStore>(
    (set) => ({
      isAuth: false,
      setIsAuth: () => set({ isAuth: true }),
      clearIsAuth: () => set({ isAuth: false }),
    }),
    {
      name: 'auth',
    },
  ),
);

export interface IUseHandleAuth<T> {
  isError: boolean;
  error: T;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

interface IUseAuthError<T> {
  isError: boolean;
  error: T;
}

export const useHandleAuth = <T extends object>(): IUseHandleAuth<T> => {
  // Redirect to other page
  const redirect = useNavigate();

  // Show toast
  const toast = useToast({
    duration: TOAST_TIME_OUT,
  });

  // Error
  const [err, setError] = useState<IUseAuthError<T>>({
    isError: false,
    error: {} as T,
  });

  const handleSetAuth = useAuthStore((state: IUseAuthStore) => state.setIsAuth);
  const handleClearAuth = useAuthStore(
    (state: IUseAuthStore) => state.clearIsAuth,
  );

  const onLogin: IUseHandleAuth<T>['onLogin'] = useCallback(
    async (email: string, password: string) => {
      try {
        const response: Response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.status === 404) throw new Error(MESSAGES.FAIL_TO_FETCH);

        if (response.status === 401) {
          const data = await response.json();

          return setError({
            isError: true,
            error: data.data,
          });
        }

        handleSetAuth();
        redirect(ROUTES.ROOT);
      } catch (error) {
        const message: string = (error as unknown as Error).message;

        toast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [handleSetAuth, redirect, toast],
  );

  const onLogout = useCallback(() => handleClearAuth(), [handleClearAuth]);

  return { ...err, onLogin, onLogout };
};
