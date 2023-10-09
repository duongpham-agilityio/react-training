import { memo, useCallback, useState } from 'react';
import { Heading, Spinner, Square, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

// Components
import { FilterBar, Pagination } from '@/components';
import { Products } from '@/pages/Home/components';

// Hooks
import { usePagination, useProduct } from '@/hooks';

// Services
import { productAPI } from '@/services/apis';

// Constants
import { MESSAGES, ENDPOINT_SERVICES } from '@/constants';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  // Search
  const [filter, setFilter] = useState<string>('');

  // Get products
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: [ENDPOINT_SERVICES.Products],
    queryFn: productAPI.getAll,
    notifyOnChangeProps: ['data'],
  });

  const {
    data: products,
    pagination,
    currentPage,
    isNextPage,
    isPrevPage,
    onChangePage,
  } = usePagination<IProduct>(data);

  //  Handle with product
  const { onAddFavorite, onAddToCart } = useProduct();

  //  Handle change search value
  const onChangeFilter = useCallback((value: string): void => {
    setFilter(value);
  }, []);

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
      <FilterBar value={filter} onChange={onChangeFilter} />

      {/* Title for filter by option */}
      <Heading fontSize={32} py={10} color="gray.40">
        Trending Items
      </Heading>

      {/* Render products */}
      <Products
        data={products}
        onLike={onAddFavorite}
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
