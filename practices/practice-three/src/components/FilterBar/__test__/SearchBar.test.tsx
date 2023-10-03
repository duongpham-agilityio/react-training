import { fireEvent, render } from '@testing-library/react';

// Components
import { SearchBar, SearchBarProps } from '../SearchBar';

const onChange = jest.fn();
const defaultProps: SearchBarProps = {
  value: '',
  onChange,
};
const setup = (props = defaultProps) => render(<SearchBar {...props} />);

describe('SearchBar', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Change value', () => {
    const { getByPlaceholderText } = setup();
    const input: HTMLInputElement = getByPlaceholderText(
      'Search',
    ) as HTMLInputElement;

    fireEvent.input(input, { target: { value: 'a' } });

    expect(onChange).toBeCalled();
  });
});
