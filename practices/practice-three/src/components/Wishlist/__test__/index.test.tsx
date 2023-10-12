import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Hooks
import { useFavorite } from '@/hooks';

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
    useFavorite.setState({
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
      'button[ aria-label="Button add to favorite"]',
    );

    expect(useFavorite.getState().data.length).toBe(2);

    fireEvent.click(buttons[0]);

    expect(useFavorite.getState().data.length).toBe(1);
  });
});
