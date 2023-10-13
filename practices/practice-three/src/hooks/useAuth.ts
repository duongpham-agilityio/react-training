import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Stores
import { IAuthStore, authStore } from '@/stores';

// Constants
import { MESSAGES, ROUTES, TITLES, TIMES } from '@/constants';

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
    duration: TIMES.TOAST,
  });

  // Error
  const [err, setError] = useState<IUseAuthError<T>>({
    isError: false,
    error: {} as T,
  });

  const handleSetAuth = authStore((state: IAuthStore) => state.setIsAuth);
  const handleClearAuth = authStore((state: IAuthStore) => state.clearIsAuth);

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
