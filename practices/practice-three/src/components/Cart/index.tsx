import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { memo, useCallback, useMemo } from 'react';
import { Box, Flex, Spinner, Square, VStack } from '@chakra-ui/react';

// Hooks
import { useHandleCart, useToast } from '@/hooks';

// Constants
import { ENDPOINT_SERVICES, MESSAGES, TITLES } from '@/constants';

// Stores
import { TCartStore, useCartStore } from '@/stores';

// Components
import { CartItem, Checkout } from './components';
import { Message } from '@/components/common';

// Types
import { ICartData, IResponse } from '@/interface';

const Component = (): JSX.Element => {
  const queryClient: QueryClient = useQueryClient();

  // Toast
  const { showToast } = useToast();

  //  Get data from cart
  const cart = useCartStore((state: TCartStore): ICartData[] => state.data);

  // Get method clearCart
  const clearCart = useCartStore((state: TCartStore) => state.updateCart);

  // Destructure to get the handler
  const { handleRemove, handleQuantity, handleCheckout } = useHandleCart();

  // Total money
  const total: number = useMemo(
    () =>
      cart.reduce(
        (result: number, nextItem: ICartData) =>
          result + Number(nextItem.price),
        0,
      ),
    [cart],
  );

  // Handle checkout
  const { isLoading, mutate } = useMutation({
    mutationFn: handleCheckout,
    onSuccess: () => {
      //  Remove all product from cart
      clearCart([]);

      // Trigger data refetch request
      queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

      // Show notification
      showToast({
        title: TITLES.SUCCESS,
        description: MESSAGES.REMOVE_FORM_CART_SUCCESS,
        status: 'success',
      });
    },
    onError: (error: Error) => {
      const message: string = error.message;

      showToast({
        title: TITLES.ERROR,
        description: message,
        status: 'error',
      });
    },
  });

  // Handle remove  product from cart
  const handleRemoveProductFromCart = useCallback(
    (id: number) => {
      const { isError, message }: IResponse = handleRemove(id);

      showToast({
        title: isError ? TITLES.ERROR : TITLES.SUCCESS,
        description: message,
        status: isError ? 'error' : 'success',
      });
    },
    [handleRemove, showToast],
  );

  // Handle change quantity
  const handleChangeQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const { isError, message }: IResponse = await handleQuantity(
        productId,
        quantity,
      );

      if (isError) {
        return showToast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [handleQuantity, showToast],
  );

  return (
    <Flex
      h="full"
      gap={7}
      flexDirection={{
        base: 'column',
        '2xl': 'row',
      }}
    >
      <Box flex={1} h="full" overflowY={{ base: 'scroll' }}>
        {isLoading ? (
          <Square size="full">
            <Spinner />
          </Square>
        ) : (
          <VStack>
            {cart.length ? (
              cart.map(
                (item: ICartData): JSX.Element => (
                  <CartItem
                    key={item.productId}
                    // !Issues: There is a problem when comparing two objects, even though the value is new, it is not re-rendered.
                    data={item}
                    onChangeQuantity={handleChangeQuantity}
                    onRemove={handleRemoveProductFromCart}
                  />
                ),
              )
            ) : (
              <Message message={MESSAGES.EMPTY} />
            )}
          </VStack>
        )}
      </Box>

      <Checkout total={total} onCheckout={mutate} />
    </Flex>
  );
};

const Cart = memo(Component);

export default Cart;
