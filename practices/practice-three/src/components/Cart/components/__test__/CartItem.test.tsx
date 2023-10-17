import { fireEvent, render } from '@testing-library/react';

// Components
import { CartItem } from '..';

// Mocks
import { cartItemProps } from '@/mocks';

const setup = (props = cartItemProps) => render(<CartItem {...props} />);

describe('CartItem', () => {
  it('Match top snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Re-render', () => {
    const { rerender } = setup();

    rerender(
      <CartItem
        {...{
          ...cartItemProps,
          data: {
            ...cartItemProps,
            name: 'Duong',
          },
        }}
      />,
    );
  });

  it('Actions', () => {
    const onChangeQuantity = jest.fn();
    const onRemove = jest.fn();
    const { getAllByRole } = setup({
      ...cartItemProps,
      onChangeQuantity,
      onRemove,
    });
    const buttons = getAllByRole('button');
    const increaseBtn = buttons[1];
    const decreaseBtn = buttons[0];
    const removeBtn = buttons[2];

    fireEvent.click(decreaseBtn);
    expect(onChangeQuantity).toBeCalled();

    fireEvent.click(increaseBtn);
    expect(onChangeQuantity).toBeCalledTimes(2);

    fireEvent.click(removeBtn);
    expect(onRemove).toBeCalled();
  });
});
