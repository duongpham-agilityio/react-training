import { memo, useCallback, useState } from 'react';
import { Heading, Spinner, Square, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

// Components
import { FilterBar } from '@/components';
import { Products } from '@/pages/Home/components';

// Hooks
import { useProduct } from '@/hooks';
import { ENDPOINT_SERVICES } from '@/constants';

// Services
import { productAPI } from '@/services/apis';
import { MESSAGES } from '@/constants/message';

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
  });

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
        <Text>{MESSAGES.FailToFetch}</Text>
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
      <Products data={data} onLike={onAddFavorite} onAddToCart={onAddToCart} />
    </>
  );
};

const HomePage = memo(Component);

export default HomePage;
