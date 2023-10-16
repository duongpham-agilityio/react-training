import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { VStack } from '@chakra-ui/react';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { Message } from '@/components/common';
import { CartItem, TCartItemProps } from '..';

// Types
import { ICartData } from '@/interface';

export type TListCartItemProps = Omit<TCartItemProps, 'data'> & {
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
            // !Issues: There is a problem when comparing two objects, even though the value is new, it is not re-rendered.
            data={item}
            onChangeQuantity={onChangeQuantity}
            onRemove={onRemove}
          />
        ),
      )
    ) : (
      <Message message={MESSAGES.EMPTY} />
    )}
  </VStack>
);

export const ListCartItem = memo(ListComponent, isEqual);
