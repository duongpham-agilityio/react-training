import { render } from '@testing-library/react';

// Icons
import { Pencil } from '..';

describe('CartOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Pencil />);

    expect(container).toMatchSnapshot();
  });
});
