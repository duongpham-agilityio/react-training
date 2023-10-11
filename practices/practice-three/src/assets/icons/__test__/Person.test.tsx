import { render } from '@testing-library/react';

// Icons
import { PersonCircle } from '..';

describe('PersonCircle', () => {
  it('Match to snapshot', () => {
    const { container } = render(<PersonCircle />);

    expect(container).toMatchSnapshot();
  });
});
