import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import { SideBarWrapper } from '../SidebarWrapper';

describe('SideBarWrapper', () => {
  it('Match to snapshot', () => {
    const { container } = render(<SideBarWrapper />, {
      wrapper: BrowserRouter,
    });

    expect(container).toMatchSnapshot();
  });
});
