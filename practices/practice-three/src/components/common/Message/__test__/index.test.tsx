import { render } from '@testing-library/react';

// Constants
import { MESSAGES } from '@/constants';

// Components
import { Message } from '..';

describe('CartOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Message message={MESSAGES.EMPTY} />);

    expect(container).toMatchSnapshot();
  });
});
