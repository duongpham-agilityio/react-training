import { useCallback, useRef } from 'react';

// Constants
import { TIMES } from '@/constants';

export type TUseDebounce<T> = (value: T) => void;

/**
 * - This is a custom hook that listens for user input
 * @param callback Have a string as parameter
 * @returns
 */
export const useDebounce = <T>(callback?: TUseDebounce<T>): TUseDebounce<T> => {
  const refTime = useRef<ReturnType<typeof setTimeout>>();

  const debounce = useCallback(
    (value: T): void => {
      if (refTime.current) clearTimeout(refTime.current);

      refTime.current = setTimeout(() => {
        if (callback) callback(value);
      }, TIMES.DEBOUNCE);
    },
    [callback],
  );

  return debounce;
};
