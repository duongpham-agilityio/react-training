import { render } from '@testing-library/react';
import Cart from '..';

const setup = () => render(<Cart />);

describe('Cart', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
