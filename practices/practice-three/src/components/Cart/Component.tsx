import { useCallback } from 'react';
import { Box, Flex, VStack, useToast } from '@chakra-ui/react';
import { IUseCartStore, useCartStore, useHandleCart } from '@/hooks';
import { MESSAGES, TITLES } from '@/constants';
import { CartItem, Checkout } from './components';
import { ICartData } from '@/interface';

export const Component = (): JSX.Element => {
  const toast = useToast({
    duration: TOAST_TIME_OUT,
  });
  const carts = useCartStore((state: IUseCartStore): ICartData[] => state.data);
  const { handleRemove, handleQuantity } = useHandleCart();

  //  Todo: Add handle when I apply BE
  const handleCheckout = useCallback((): void => {}, []);

  // Handle remove  product from cart
  const handleRemoveProductFromCart = useCallback(
    async (id: number) => {
      try {
        await handleRemove(id);

        toast({
          title: TITLES.ERROR,
          description: MESSAGES.REMOVE_FORM_CART_SUCCESS,
          status: 'success',
        });
      } catch (error) {
        const message: string = (error as unknown as Error).message;

        toast({
          title: TITLES.ERROR,
          description: message,
          status: 'error',
        });
      }
    },
    [handleRemove, toast],
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
        <VStack>
          {carts.map((cart: ICartData): JSX.Element => {
            return (
              <CartItem
                key={cart.productId}
                // !Issues: There is a problem when comparing two objects, even though the value is new, it is not re-rendered.
                data={{ ...cart }}
                onChangeQuantity={handleQuantity}
                onRemove={handleRemoveProductFromCart}
              />
            );
          })}
        </VStack>
      </Box>

      <Checkout total={0} onCheckout={handleCheckout} />
    </Flex>
  );
};
