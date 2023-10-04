import { fireEvent, render } from '@testing-library/react';

// Components
import { SideBar } from '..';

const setup = () => render(<SideBar />);

describe('Sidebar', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Show full sidebar', () => {
    const { getByRole, getByText } = setup();

    fireEvent.click(getByRole('button'));

    expect(getByText('Wishlist')).toBeDefined();
  });
});
