import { fireEvent, render } from '@testing-library/react';

// Components
import { CartIcon, CartIconProps } from '..';

const onClick = jest.fn();
const defaultProps: CartIconProps = {
  onClick,
};

const setup = (props = defaultProps) => render(<CartIcon {...props} />);

describe('CartIcon', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    setup({ ...defaultProps, color: 'white', border: 'red', variant: 'fill' });
  });

  it('Click', () => {
    const { getByRole } = setup();

    fireEvent.click(getByRole('button'));

    expect(onClick).toBeCalled();
  });
});
