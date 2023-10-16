import { useCallback, useState } from 'react';

// Hooks
import { useToast } from '@/hooks';

// Stores
import { TAuthStore, useAuthStore } from '@/stores';

// Constants
import { TITLES } from '@/constants';
import { accountAPI } from '@/services/apis';

export type TUseHandleAuth<T> = {
  isError: boolean;
  error: T;
  onLogin: (
    data: { email: string; password: string },
    onSuccess: () => void,
  ) => void;
  onLogout: () => void;
};

type TUseAuthError<T> = {
  isError: boolean;
  error: T;
};

export const useHandleAuth = <T extends object>(): TUseHandleAuth<T> => {
  // Redirect to other page

  // Show toast
  const { showToast } = useToast();

  // Error
  const [err, setError] = useState<TUseAuthError<T>>({
    isError: false,
    error: {} as T,
  });

  const handleClearAuth = useAuthStore(
    (state: TAuthStore) => state.clearIsAuth,
  );

  const onLogin: TUseHandleAuth<T>['onLogin'] = useCallback(
    async (data, onSuccess) => {
      const { email, password } = data;

      try {
        const { isError, error } = await accountAPI.verify<T>(email, password);

        if (!isError) return onSuccess();

        setError({ isError, error } as TUseAuthError<T>);
      } catch (error) {
        const message: string = (error as unknown as Error).message;

        showToast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [showToast],
  );

  const onLogout = useCallback(() => handleClearAuth(), [handleClearAuth]);

  return { ...err, onLogin, onLogout };
};
