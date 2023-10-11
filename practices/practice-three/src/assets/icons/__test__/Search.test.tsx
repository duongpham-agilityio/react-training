import { render } from '@testing-library/react';

// Icons
import { Search } from '..';

describe('Search', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Search />);

    expect(container).toMatchSnapshot();
  });
});
