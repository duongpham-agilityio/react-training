import { render } from '@testing-library/react';

// Components
import { FilterOptions } from '../FilterOptions';

const setup = () => render(<FilterOptions currentOption="all" />);

describe('Filteroptions', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
