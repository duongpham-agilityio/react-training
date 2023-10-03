import { render } from '@testing-library/react';

// Tests
import '@/components/FilterBar/__test__/SearchBar.test';
import '@/components/FilterBar/__test__/FilterOptions.test';

// Components
import { FilterBar, FilterBarProps } from '..';

const onChange = jest.fn();
const defaultProps: FilterBarProps = {
  value: '',
  onChange,
};
const setup = (props = defaultProps) => render(<FilterBar {...props} />);

describe('FilterBar', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
