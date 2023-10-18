import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

// Components
import { ProductCard, TProductCardProps } from '@/components/ProductCard';

// Mocks
import { productCardProps } from '@/mocks';

const onAddToCard = jest.fn();
const onLike = jest.fn();

const setup = (props: TProductCardProps) =>
  render(
    <BrowserRouter>
      <ProductCard {...props} onAddToCart={onAddToCard} onLike={onLike} />
    </BrowserRouter>,
  );

describe('ProductCard', () => {
  it('Match snapshot', () => {
    const { container } = setup(productCardProps);

    expect(container).toMatchSnapshot();
  });

  it('Render with status  is true', () => {
    const { getByText } = setup({
      ...productCardProps,
      info: {
        ...productCardProps.info,
        status: false,
        statusMessage: '',
      },
    });

    expect(getByText('available')).toBeDefined();
  });

  it('Render with isLiked  is true', () => {
    setup({
      ...productCardProps,
      info: {
        ...productCardProps.info,
        isLiked: true,
      },
    });
  });

  it('Click cart icon', () => {
    const { getAllByRole } = setup(productCardProps);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[0]);

    expect(onAddToCard).toBeCalled();
  });

  it('Click heart icon', () => {
    const { getAllByRole } = setup(productCardProps);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(onLike).toBeCalled();
  });
});
