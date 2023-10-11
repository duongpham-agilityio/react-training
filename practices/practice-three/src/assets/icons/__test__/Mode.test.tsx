import { render } from '@testing-library/react';

// Icons
import { LightMode, DarkMode } from '..';

describe('DarkMode', () => {
  it('Match to snapshot', () => {
    const { container } = render(<DarkMode />);

    expect(container).toMatchSnapshot();
  });
});

describe('LightMode', () => {
  it('Match to snapshot', () => {
    const { container } = render(<LightMode />);

    expect(container).toMatchSnapshot();
  });
});
