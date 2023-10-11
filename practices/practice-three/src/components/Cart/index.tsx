import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import { Box, Flex, Spinner, Square, VStack, useToast } from '@chakra-ui/react';

// Hooks
import { IUseCartStore, useCartStore, useHandleCart } from '@/hooks';

// Constants
import {
  ENDPOINT_SERVICES,
  MESSAGES,
  TITLES,
  TOAST_TIME_OUT,
} from '@/constants';

// Components
import { CartItem, Checkout } from './components';

// Types
import { ICartData, IResponse } from '@/interface';

const Component = (): JSX.Element => {
  const queryClient: QueryClient = useQueryClient();

  // Toast
  const toast = useToast({
    duration: TOAST_TIME_OUT,
  });

  //  Get data from cart
  const carts = useCartStore((state: IUseCartStore): ICartData[] => state.data);

  // Get method clearCart
  const clearCart = useCartStore((state: IUseCartStore) => state.updateCart);

  // Destructure to get the handler
  const { handleRemove, handleQuantity, handleCheckout } = useHandleCart();

  // Handle checkout
  const { isLoading, mutate } = useMutation({
    mutationFn: handleCheckout,
    onSuccess: () => {
      //  Remove all product from cart
      clearCart([]);

      // Trigger data refetch request
      queryClient.invalidateQueries([ENDPOINT_SERVICES.PRODUCTS]);

      // Show notification
      toast({
        title: TITLES.SUCCESS,
        description: MESSAGES.REMOVE_FORM_CART_SUCCESS,
        status: 'success',
      });
    },
    onError: (error: Error) => {
      const message: string = error.message;

      toast({
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

      toast({
        title: isError ? TITLES.ERROR : TITLES.SUCCESS,
        description: message,
        status: isError ? 'error' : 'success',
      });
    },
    [handleRemove, toast],
  );

  // Handle change quantity
  const handleChangeQuantity = useCallback(
    async (productId: number, quantity: number) => {
      const { isError, message }: IResponse = await handleQuantity(
        productId,
        quantity,
      );

      if (isError) {
        return toast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [handleQuantity, toast],
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
            {carts.map(
              (cart: ICartData): JSX.Element => (
                <CartItem
                  key={cart.productId}
                  // !Issues: There is a problem when comparing two objects, even though the value is new, it is not re-rendered.
                  data={cart}
                  onChangeQuantity={handleChangeQuantity}
                  onRemove={handleRemoveProductFromCart}
                />
              ),
            )}
          </VStack>
        )}
      </Box>

      <Checkout total={0} onCheckout={mutate} />
    </Flex>
  );
};

const Cart = memo(Component);

export default Cart;
