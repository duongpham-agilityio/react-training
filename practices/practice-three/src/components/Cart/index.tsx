import { memo, useCallback } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';

// Components
import { CartItem, Checkout } from './components';

// Mocks
import { cartItemProps } from '@/mocks';

//  Todo: Call API get data from cart
const Component = (): JSX.Element => {
  //  Todo: Add handle when I apply BE
  const onCheckout = useCallback((): void => {}, []);

  const onChangeQuantity = useCallback((): void => {}, []);

  const onRemoveFromCart = useCallback((): void => {}, []);

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
          {Array.from({ length: 9 }).map(() => (
            <CartItem
              {...cartItemProps}
              onChangeQuantity={onChangeQuantity}
              onRemove={onRemoveFromCart}
            />
          ))}
        </VStack>
      </Box>

      <Checkout total={0} onCheckout={onCheckout} />
    </Flex>
  );
};

const Cart = memo(Component);

export default Cart;
