import { fireEvent, render } from '@testing-library/react';

// Components
import { ProductCard, ProductCardProps } from '@/components/ProductCard';

// Mocks
import { productCardProps } from '@/mocks';

const onAddToCard = jest.fn();
const onLike = jest.fn();

const setup = (props: ProductCardProps) => render(<ProductCard {...props} />);

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
        status: true,
        statusMessage: '',
      },
    });

    expect(getByText('available')).toBeDefined();
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
