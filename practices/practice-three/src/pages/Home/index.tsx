import { memo, useCallback, useMemo } from 'react';
import { Heading } from '@chakra-ui/react';

// Components
import { FilterBar, Pagination, Spinner } from '@/components';
import { Products } from '@/components';
import { FetchingMessage } from '@/components/common';

// Hooks
import {
  useHandleCart,
  useFavorite,
  usePagination,
  useSearch,
  useToast,
  useProducts,
} from '@/hooks';

// Constants
import { MESSAGES, TITLES } from '@/constants';

// Types
import { IProduct } from '@/interface';
import { TFavoriteStore, useFavoriteStore } from '@/stores';

const Component = (): JSX.Element => {
  // Get products
  const { isLoading, isError, data = [] } = useProducts();
  const favorites = useFavoriteStore((state: TFavoriteStore) => state.data);
  // Get handler from favorite store
  const { onToggleFavorite } = useFavorite();

  // Get handle add to cart
  const { handleAddProductToCart } = useHandleCart();

  // Show toast
  const { showToast } = useToast();

  // Calling useSearch hook
  const {
    data: filterProducts,
    searchValue,
    category,
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

      showToast({
        title: isAddSuccess ? TITLES.ADD : TITLES.REMOVE,
        description: isAddSuccess
          ? MESSAGES.ADD_TO_CART_SUCCESS
          : MESSAGES.ADD_TO_CART_FAIL,
        status: isAddSuccess ? 'success' : 'error',
        duration: 1000,
      });
    },
    [handleAddProductToCart, products, showToast],
  );

  const isLiked = useCallback(
    (id: number): boolean => {
      return !!favorites.find((item) => id === item.id);
    },
    [favorites],
  );

  // Format list product
  const formatShowListProduct: IProduct[] = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        isLiked: isLiked(product.id),
      })),
    [isLiked, products],
  );

  if (isLoading) return <Spinner />;

  if (isError) return <FetchingMessage message={MESSAGES.FAIL_TO_FETCH} />;

  return (
    <>
      <FilterBar
        value={searchValue}
        onChange={onChangeSearchInput}
        currentOption={category}
      />

      {/* Title for filter by option */}
      <Heading fontSize="6xl" py={10} color="dark">
        Trending Items
      </Heading>

      {/* Render products */}
      <Products
        data={formatShowListProduct}
        onAddToFavorite={handleSelectFavorite}
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
