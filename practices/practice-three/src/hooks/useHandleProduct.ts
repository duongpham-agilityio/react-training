import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Types
import { IFormAddData } from '@/pages/Profile/components/FormAdd';

// Services
import { ProductPayload, productAPI } from '@/services/apis';

// Constants
import { ENDPOINT_SERVICES } from '@/constants';

export type TUseHandleProduct = {
  onAddProduct: (data: IFormAddData) => Promise<boolean>;
  onUpdateProduct: (
    id: number,
    product: Partial<ProductPayload>,
  ) => Promise<boolean>;
  onRemoveProduct: (id: number) => Promise<boolean>;
};

export const useHandleProduct = (): TUseHandleProduct => {
  const queryClient = useQueryClient();

  const onAddProduct = useCallback(
    async (data: IFormAddData): Promise<boolean> => {
      try {
        const product: ProductPayload = {
          ...data,
          isLiked: false,
        };
        await productAPI.add(product);

        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        return true;
      } catch (error) {
        return false;
      }
    },
    [queryClient],
  );

  const onUpdateProduct = useCallback(
    async (id: number, product: Partial<ProductPayload>): Promise<boolean> => {
      try {
        await productAPI.update(id, product);
        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        return true;
      } catch (error) {
        return false;
      }
    },
    [queryClient],
  );

  const onRemoveProduct = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await productAPI.removeById(id);
        queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

        return true;
      } catch (error) {
        return false;
      }
    },
    [queryClient],
  );

  return {
    onAddProduct,
    onUpdateProduct,
    onRemoveProduct,
  };
};
