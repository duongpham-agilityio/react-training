import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import { memo } from 'react';

export interface CheckoutProps {
  total: number;
  onCheckout: () => void;
}

export const Checkout = memo(
  ({ total, onCheckout }: CheckoutProps): JSX.Element => {
    return (
      <Box
        h={{
          base: 'fit-content',
        }}
        w={{
          base: 'full',
          '2xl': 300,
        }}
        bg="white"
      >
        <Heading
          textAlign="center"
          fontSize={{
            base: 16,
            xl: 22,
          }}
          textTransform="uppercase"
          padding={5}
        >
          Checkout
        </Heading>

        <Divider />

        {/* Info */}
        <Box py={5}>
          <Text>Total: {`${total}`}</Text>
          <Button
            textTransform="uppercase"
            bg="green.10"
            w="full"
            mt={5}
            _hover={{
              bg: 'green.20',
            }}
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    );
  },
);
