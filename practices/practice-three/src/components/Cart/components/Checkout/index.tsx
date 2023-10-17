import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import { memo } from 'react';

export type TCheckoutProps = {
  total: number;
  onCheckout: () => void;
};

export const Checkout = memo(
  ({ total, onCheckout }: TCheckoutProps): JSX.Element => {
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
            base: 'md',
            xl: '2xl',
          }}
          textTransform="uppercase"
          padding={5}
        >
          Checkout
        </Heading>

        <Divider />

        {/* Info */}
        <Box py={5}>
          <Text>Total: {`$${total}`}</Text>
          <Button
            textTransform="uppercase"
            bg="successToLight"
            w="full"
            mt={5}
            _hover={{
              bg: 'success',
            }}
            isDisabled={!total}
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    );
  },
);
