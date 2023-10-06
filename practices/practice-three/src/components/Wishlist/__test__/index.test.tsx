import { render } from '@testing-library/react';

// Components
import Wishlist from '..';

const setup = () => render(<Wishlist />);

describe('Wishlist', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
