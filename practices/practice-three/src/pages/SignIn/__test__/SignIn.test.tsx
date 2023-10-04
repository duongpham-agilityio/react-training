import { render } from '@testing-library/react';

// Pages
import SignIn from '..';

const setup = () => render(<SignIn />);

describe('SignIn', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
