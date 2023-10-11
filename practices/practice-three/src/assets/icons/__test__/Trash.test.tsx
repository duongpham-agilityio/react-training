import { render } from '@testing-library/react';

// Icons
import { Trash } from '..';

describe('Trash', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Trash />);

    expect(container).toMatchSnapshot();
  });
});
