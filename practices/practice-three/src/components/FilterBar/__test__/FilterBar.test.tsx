import { render } from '@testing-library/react';

// Tests
import '@/components/FilterBar/__test__/SearchBar.test';
import '@/components/FilterBar/__test__/FilterOptions.test';

// Components
import { FilterBar, TFilterBarProps } from '..';

const onChange = jest.fn();
const defaultProps: TFilterBarProps = {
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
