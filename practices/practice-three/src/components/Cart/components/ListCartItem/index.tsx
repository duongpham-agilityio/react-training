import { VStack } from '@chakra-ui/react';
import { memo } from 'react';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { Message } from '@/components/common';
import { CartItem, TCartItemProps } from '..';

// Types
import { ICartData } from '@/interface';

export type TListCartItemProps = Pick<
  TCartItemProps,
  'onChangeQuantity' | 'onRemove'
> & {
  data: ICartData[];
};

const ListComponent = ({
  data,
  onChangeQuantity,
  onRemove,
}: TListCartItemProps): JSX.Element => (
  <VStack>
    {data.length ? (
      data.map(
        (item: ICartData): JSX.Element => (
          <CartItem
            key={item.productId}
            onChangeQuantity={onChangeQuantity}
            onRemove={onRemove}
            {...item}
          />
        ),
      )
    ) : (
      <Message message={MESSAGES.EMPTY} />
    )}
  </VStack>
);

export const ListCartItem = memo(ListComponent);
