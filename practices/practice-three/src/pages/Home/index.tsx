import { memo, useCallback } from 'react';
import { Heading, Spinner, Square, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

// Components
import { FilterBar, Pagination } from '@/components';
import { Products } from '@/pages/Home/components';

// Hooks
import {
  IUseFavorite,
  useFavorite,
  usePagination,
  useProduct,
  useSearch,
} from '@/hooks';

// Services
import { productAPI } from '@/services/apis';

// Constants
import { MESSAGES, ENDPOINT_SERVICES } from '@/constants';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  // Get products
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: [ENDPOINT_SERVICES.products],
    queryFn: productAPI.getAll,
    notifyOnChangeProps: ['data'],
  });

  // Get handler from favorite store
  const onToggleFavorite = useFavorite(
    (state: IUseFavorite) => state.handleToggleFavorite,
  );

  // Calling useSearch hook
  const {
    data: filterProducts,
    searchValue,
    onChangeSearchInput,
  } = useSearch(data);

  // Pagination
  const {
    data: products,
    pagination,
    currentPage,
    isNextPage,
    isPrevPage,
    onChangePage,
  } = usePagination<IProduct>(filterProducts);

  //  Handle with product
  const { onAddToCart } = useProduct();

  const handleSelectFavorite = useCallback(
    (id: number): void => {
      const product = data.find((item) => item.id === id);

      onToggleFavorite(product);
    },
    [data, onToggleFavorite],
  );

  if (isLoading)
    return (
      <Square size="full">
        <Spinner />
      </Square>
    );

  if (isError)
    return (
      <Square size="full">
        <Text>{MESSAGES.failToFetch}</Text>
      </Square>
    );

  return (
    <>
      <FilterBar value={searchValue} onChange={onChangeSearchInput} />

      {/* Title for filter by option */}
      <Heading fontSize={32} py={10} color="gray.40">
        Trending Items
      </Heading>

      {/* Render products */}
      <Products
        data={products}
        onLike={handleSelectFavorite}
        onAddToCart={onAddToCart}
      />

      {/* Pagination */}
      <Pagination
        data={pagination}
        currentPage={currentPage}
        isNextPage={isNextPage}
        isPrevPage={isPrevPage}
        onChangePage={onChangePage}
        onNextPage={onChangePage}
        onPreviousPage={onChangePage}
      />
    </>
  );
};

const HomePage = memo(Component);

export default HomePage;
