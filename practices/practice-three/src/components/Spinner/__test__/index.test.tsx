import { render } from '@testing-library/react';

// Components
import Spinner from '..';

describe('Spinner', () => {
  const { container } = render(<Spinner />);

  expect(container).toMatchSnapshot();
});
