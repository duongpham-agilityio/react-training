import { memo, useCallback } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

// Types
import { ICartData } from '@/interface';

// Icons
import { Decrease, Increase, Trash } from '@/assets/icons';

export type TCartItemProps = {
  data: ICartData;
  onRemove: (productId: number) => void;
  onChangeQuantity: (productId: number, currentQuantity: number) => void;
};

const CartItemComponent = (props: TCartItemProps): JSX.Element => {
  const { data, onChangeQuantity, onRemove } = props;
  const { name, description, imageURL, productId, price, quantity } = data;

  const handleIncrease = useCallback((): void => {
    onChangeQuantity(productId, quantity + 1);
  }, [onChangeQuantity, productId, quantity]);

  const handleDecrease = useCallback((): void => {
    onChangeQuantity(productId, quantity - 1);
  }, [onChangeQuantity, productId, quantity]);

  const handleRemove = useCallback((): void => {
    onRemove(productId);
  }, [onRemove, productId]);

  return (
    <Flex
      w="full"
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      py={2}
      px={3}
    >
      <Flex flex={1} gap={18} alignItems="center">
        <Image
          src={imageURL}
          objectFit="cover"
          boxSize="80px"
          borderRadius="sm"
        />

        {/* Show info */}
        <Box>
          <Heading
            fontSize={{
              base: 'sm',
              xl: 'lg',
            }}
          >
            {name}
          </Heading>
          <Text
            fontSize={{
              base: 'xs',
              xl: 'sm',
            }}
            fontWeight="regular"
            noOfLines={2}
          >
            {description}
          </Text>
        </Box>
      </Flex>

      {/* Actions */}
      <Center flex={1} justifyContent="space-between">
        {/* Quantity */}
        <Center flex={1}>
          <IconButton
            aria-label="Button decrease quantity"
            icon={<Decrease />}
            onClick={handleDecrease}
          />
          <Text>{quantity}</Text>
          <IconButton
            aria-label="Button increase quantity"
            icon={<Increase />}
            onClick={handleIncrease}
          />
        </Center>

        {/* Price */}
        <Text flex={1} textAlign="center">
          ${price}
        </Text>

        <Center flex={1}>
          <IconButton
            aria-label="Button remove from cart"
            icon={<Trash />}
            onClick={handleRemove}
          />
        </Center>
      </Center>
    </Flex>
  );
};

export const CartItem = memo(CartItemComponent);
