import { TCartItemProps } from '@/components/Cart/components';

export const cartItemProps: TCartItemProps = {
  productId: 1,
  description: 'Adidas Men’s T-Shirt',
  name: 'Adidas T-Shirt',
  imageURL:
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d455e5b6-23e9-4f06-8b86-32610d838937/renew-run-3-road-running-shoes-395S7c.png',
  price: 200,
  quantity: 2,
  onChangeQuantity: () => {},
  onRemove: () => {},
};
