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

  it('Click show wishlist option', () => {
    const { container, getAllByRole } = setup();

    fireEvent.click(getAllByRole('button')[0]);

    expect(container).toMatchSnapshot();
  });

  it('Click show cart option', () => {
    const { container, getAllByRole } = setup();

    fireEvent.click(getAllByRole('button')[1]);

    expect(container).toMatchSnapshot();
  });
});
