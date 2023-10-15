import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useToast } from '@/hooks';

// Stores
import { TAuthStore, useAuthStore } from '@/stores';

// Constants
import { MESSAGES, ROUTES, TITLES } from '@/constants';

export type TUseHandleAuth<T> = {
  isError: boolean;
  error: T;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
};

type TUseAuthError<T> = {
  isError: boolean;
  error: T;
};

export const useHandleAuth = <T extends object>(): TUseHandleAuth<T> => {
  // Redirect to other page
  const redirect = useNavigate();

  // Show toast
  const { showToast } = useToast();

  // Error
  const [err, setError] = useState<TUseAuthError<T>>({
    isError: false,
    error: {} as T,
  });

  const handleSetAuth = useAuthStore((state: TAuthStore) => state.setIsAuth);
  const handleClearAuth = useAuthStore(
    (state: TAuthStore) => state.clearIsAuth,
  );

  const onLogin: TUseHandleAuth<T>['onLogin'] = useCallback(
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

        showToast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [handleSetAuth, redirect, showToast],
  );

  const onLogout = useCallback(() => handleClearAuth(), [handleClearAuth]);

  return { ...err, onLogin, onLogout };
};
