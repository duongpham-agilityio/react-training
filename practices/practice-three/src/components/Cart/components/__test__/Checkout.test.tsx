import { fireEvent, render } from '@testing-library/react';

// Components
import { Checkout, TCheckoutProps } from '..';

const onCheckout = jest.fn();
const init: TCheckoutProps = {
  total: 200,
  onCheckout,
};

const setup = (props = init) => render(<Checkout {...props} />);

describe('Checkout', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('onCheckout', () => {
    const { getByRole } = setup();

    fireEvent.click(getByRole('button'));

    expect(onCheckout).toMatchSnapshot();
  });
});
