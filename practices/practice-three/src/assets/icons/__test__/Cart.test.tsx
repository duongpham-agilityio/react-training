import { render } from '@testing-library/react';

// Icons
import { CartFill, CartOutline } from '..';

describe('CartOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<CartOutline />);

    expect(container).toMatchSnapshot();
  });
});

describe('CartFill', () => {
  it('Match to snapshot', () => {
    const { container } = render(<CartFill />);

    expect(container).toMatchSnapshot();
  });
});
