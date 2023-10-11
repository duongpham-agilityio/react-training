import { render } from '@testing-library/react';

// Icons
import { Increase, Decrease } from '..';

describe('Decrease', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Decrease />);

    expect(container).toMatchSnapshot();
  });
});

describe('Increase', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Increase />);

    expect(container).toMatchSnapshot();
  });
});
