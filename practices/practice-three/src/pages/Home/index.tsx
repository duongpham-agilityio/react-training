import { memo, useCallback } from 'react';
import { Heading, Spinner, Square, Text, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

// Components
import { FilterBar, Pagination } from '@/components';
import { Products } from '@/pages/Home/components';

// Hooks
import {
  IUseFavorite,
  useHandleCart,
  useFavorite,
  usePagination,
  useSearch,
} from '@/hooks';

// Services
import { productAPI } from '@/services/apis';

// Constants
import {
  MESSAGES,
  ENDPOINT_SERVICES,
  TITLES,
  TOAST_TIME_OUT,
} from '@/constants';

// Types
import { IProduct } from '@/interface';

const Component = (): JSX.Element => {
  // Get products
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: [ENDPOINT_SERVICES.PRODUCTS],
    queryFn: productAPI.getAll,
    notifyOnChangeProps: ['data'],
  });

  // Get handler from favorite store
  const onToggleFavorite = useFavorite(
    (state: IUseFavorite) => state.onToggleFavorite,
  );

  // Get handle add to cart
  const { handleAddProductToCart } = useHandleCart();

  // Show toast
  const toast = useToast({
    duration: TOAST_TIME_OUT,
  });

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

  // Handle add product to wishlist
  const handleSelectFavorite = useCallback(
    (id: number): void => {
      const product = data.find((item) => item.id === id);

      onToggleFavorite(product);
    },
    [data, onToggleFavorite],
  );

  // Filter and handle add product to cart
  const handleAddToCart = useCallback(
    (id: number): void => {
      const product: IProduct = products.find(
        (product) => product.id === id,
      ) as IProduct;

      const isAddSuccess: boolean = handleAddProductToCart(product);

      toast({
        title: isAddSuccess ? TITLES.ADD : TITLES.REMOVE,
        description: isAddSuccess
          ? MESSAGES.ADD_TO_CART_SUCCESS
          : MESSAGES.ADD_TO_CART_FAIL,
        status: isAddSuccess ? 'success' : 'error',
        duration: 1000,
      });
    },
    [handleAddProductToCart, products, toast],
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
        <Text>{MESSAGES.FAIL_TO_FETCH}</Text>
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
        onAddToCart={handleAddToCart}
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
