import { TIMES } from '@/constants';
import { useToast as useToastChakra, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface IUseToast {
  showToast: (options?: UseToastOptions) => void;
}

export const useToast = (defaultOptions?: UseToastOptions): IUseToast => {
  const toast = useToastChakra();

  const showToast: IUseToast['showToast'] = useCallback(
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
