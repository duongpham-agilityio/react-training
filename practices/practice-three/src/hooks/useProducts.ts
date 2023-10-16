import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

// Constants
import { ENDPOINT_SERVICES } from '@/constants';

// Services
import { productAPI } from '@/services/apis';

// Types
import { IProduct } from '@/interface';

const queryFn = () => {
  return productAPI.getAll() || [];
};

export const useProducts = (
  options?: UseQueryOptions<IProduct[]>,
): UseQueryResult<IProduct[]> => {
  const result: UseQueryResult<IProduct[]> = useQuery<IProduct[]>({
    queryKey: [ENDPOINT_SERVICES.PRODUCTS],
    queryFn,
    ...options,
  });

  return result;
};
