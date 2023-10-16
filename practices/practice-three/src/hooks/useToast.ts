import { TIMES } from '@/constants';
import { useToast as useToastChakra, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

export type TUseToast = {
  showToast: (options?: UseToastOptions) => void;
};

export const useToast = (defaultOptions?: UseToastOptions): TUseToast => {
  const toast = useToastChakra();

  const showToast: TUseToast['showToast'] = useCallback(
    (options) =>
      toast({
        ...options,
        duration: TIMES.TOAST,
        ...defaultOptions,
      }),
    [],
  );

  return {
    showToast,
  };
};
