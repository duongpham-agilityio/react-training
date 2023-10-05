import { memo } from 'react';
import { HStack } from '@chakra-ui/react';

// Types
import { ICart } from '@/interface';

export interface CartItemProps {
  data: ICart;
  onRemove: (productId: number) => void;
  onChangeQuantity: (productId: number, currentQuantity: number) => void;
}

export const CartItem = memo((): JSX.Element => <HStack>asdasdasd</HStack>);
