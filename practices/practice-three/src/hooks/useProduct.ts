import { useCallback } from 'react';

export const useProduct = () => {
  const onAddFavorite = useCallback((id: number): void => {
    // Todo: Update to late
    console.log(id);
  }, []);

  const onAddToCart = useCallback((id: number): void => {
    // Todo: Update to late
    console.log(id);
  }, []);

  return {
    onAddToCart,
    onAddFavorite,
  };
};
