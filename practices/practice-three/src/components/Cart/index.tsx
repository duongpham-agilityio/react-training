import { memo } from 'react';
import { CartItem } from './components';

const Component = (): JSX.Element => {
  return <CartItem />;
};

const Cart = memo(Component);

export default Cart;
