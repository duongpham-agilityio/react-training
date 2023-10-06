import { memo, useCallback } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';

// Components
import { CartItem, Checkout } from './components';

// Mocks
import { cartItemProps } from '@/mocks';

//  Todo: Call API get data from cart
const Component = (): JSX.Element => {
  //  Todo: Add handle when I apply BE
  const handleCheckout = useCallback((): void => {}, []);

  const handleChangeQuantity = useCallback((): void => {}, []);

  const handleRemoveFromCart = useCallback((): void => {}, []);

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
              onChangeQuantity={handleChangeQuantity}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </VStack>
      </Box>

      <Checkout total={0} onCheckout={handleCheckout} />
    </Flex>
  );
};

const Cart = memo(Component);

export default Cart;
