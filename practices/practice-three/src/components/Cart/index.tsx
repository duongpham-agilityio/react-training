import { memo, useCallback } from 'react';
import { Box, Grid, VStack } from '@chakra-ui/react';

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
    <Grid
      h="full"
      gridTemplateColumns={{
        base: '1fr',
        '2xl': '2fr 1fr',
      }}
      gap={5}
      overflowY={{ base: 'scroll', '2xl': 'unset' }}
    >
      <Box
        w={{
          base: 'full',
        }}
        h="full"
        overflowY={{ base: 'unset', '2xl': 'scroll' }}
      >
        <VStack>
          {Array.from({ length: 1 }).map(() => (
            <CartItem
              {...cartItemProps}
              onChangeQuantity={onChangeQuantity}
              onRemove={onRemoveFromCart}
            />
          ))}
        </VStack>
      </Box>

      <Checkout total={0} onCheckout={onCheckout} />
    </Grid>
  );
};

const Cart = memo(Component);

export default Cart;
