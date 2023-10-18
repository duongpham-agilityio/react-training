import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import { FilterOptions } from '../FilterOptions';

const setup = () =>
  render(<FilterOptions currentOption="all" />, { wrapper: BrowserRouter });

describe('Filteroptions', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
