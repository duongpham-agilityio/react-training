import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Stores
import { useCartStore, useFavoriteStore } from '@/stores';

// Components
import Wishlist from '..';

const setup = () =>
  render(
    <BrowserRouter>
      <Wishlist />
    </BrowserRouter>,
  );

describe('Wishlist', () => {
  beforeEach(() => {
    useCartStore.setState({ data: [] });
    useFavoriteStore.setState({
      data: [
        {
          name: 'Tasty Plastic Mouse',
          description: 'Quos tempora adipisci quidem ipsum.',
          imageURL: 'https://loremflickr.com/640/480/fashion',
          price: 430,
          quantity: 10,
          isLiked: true,
          id: 1,
          category: 'fashion',
          createdAt: new Date(),
        },
        {
          name: 'Tasty Plastic Mouse',
          description: 'Quos tempora adipisci quidem ipsum.',
          imageURL: 'https://loremflickr.com/640/480/fashion',
          price: 430,
          quantity: 10,
          isLiked: true,
          id: 2,
          category: 'books',
          createdAt: new Date(),
        },
      ],
    });
  });

  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Remove from wishlist', () => {
    const { container } = setup();
    const buttons = container.querySelectorAll(
      'button[aria-label="Button add to favorite"]',
    );

    expect(useFavoriteStore.getState().data.length).toBe(2);

    fireEvent.click(buttons[0]);

    expect(useFavoriteStore.getState().data.length).toBe(1);
  });

  it('Remove from wishlist', () => {
    const { container } = setup();
    const buttons = container.querySelectorAll(
      'button[aria-label="Button add to cart"]',
    );

    expect(useCartStore.getState().data.length).toBe(0);
    fireEvent.click(buttons[0]);
    expect(useCartStore.getState().data.length).toBe(1);
  });
});
