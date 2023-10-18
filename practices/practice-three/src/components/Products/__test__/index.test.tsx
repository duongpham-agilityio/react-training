import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Products } from '..';

const mockData = [
  {
    name: 'Tasty Plastic Mouse',
    description: 'Quos tempora adipisci quidem ipsum.',
    imageURL: 'https://loremflickr.com/640/480/fashion',
    price: 430,
    quantity: 2,
    isLiked: true,
    id: 1,
    category: 'books',
    createdAt: new Date(),
  },
];

const onAddToCart = jest.fn();
const onAddToFavorite = jest.fn();

const setup = (isUpdateMode?: boolean) =>
  render(
    <Products
      isUpdateMode={isUpdateMode}
      data={mockData}
      onAddToCart={onAddToCart}
      onAddToFavorite={onAddToFavorite}
    />,
    {
      wrapper: BrowserRouter,
    },
  );

describe('Products', () => {
  it('Match to snapshot', () => {
    const { container } = setup(false);

    expect(container).toMatchSnapshot();
  });

  it('Show update mode', async () => {
    const { getAllByRole } = setup(true);

    const buttons = getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(onAddToFavorite).toBeCalled();
    fireEvent.click(buttons[1]);
    expect(onAddToCart).toBeCalled();
  });
});
