import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import { Header } from '..';
// jest.mock()

describe('Header', () => {
  it('Match to snapshot', () => {
    const { container } = render(<Header />, {
      wrapper: BrowserRouter,
    });

    expect(container).toMatchSnapshot();
  });
});
