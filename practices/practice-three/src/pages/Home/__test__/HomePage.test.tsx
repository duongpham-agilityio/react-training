import { fireEvent, render } from '@testing-library/react';

// Components
import HomePage from '..';

const setup = () => render(<HomePage />);

describe('Home page', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Change filter', () => {
    const { getByPlaceholderText } = setup();
    const input: HTMLInputElement = getByPlaceholderText(
      'Search',
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        value: '1',
      },
    });

    expect(input.value).toBe('1');
  });
});
