import { render } from '@testing-library/react';

// Components
import { ListCartItem } from '../..';

// Types
import { ICartData } from '@/interface';

// Constants
import { MESSAGES } from '@/constants';

const setup = (data: ICartData[]) =>
  render(
    <ListCartItem
      data={data}
      onChangeQuantity={jest.fn()}
      onRemove={jest.fn()}
    />,
  );

const mock: ICartData[] = [
  {
    productId: 1,
    description: 'Adidas Men’s T-Shirt',
    name: 'Adidas T-Shirt',
    imageURL:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d455e5b6-23e9-4f06-8b86-32610d838937/renew-run-3-road-running-shoes-395S7c.png',
    price: 200,
    quantity: 2,
  },

  {
    productId: 2,
    description: 'Adidas Men’s T-Shirt',
    name: 'Adidas T-Shirt',
    imageURL:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d455e5b6-23e9-4f06-8b86-32610d838937/renew-run-3-road-running-shoes-395S7c.png',
    price: 200,
    quantity: 2,
  },
];

describe('ListCartItem', () => {
  it('Match to snapshot', () => {
    const { container } = setup(mock);

    expect(container).toMatchSnapshot();
  });

  it('Show empty', () => {
    const { getByText } = setup([]);

    expect(getByText(MESSAGES.EMPTY)).toBeDefined();
  });
});
