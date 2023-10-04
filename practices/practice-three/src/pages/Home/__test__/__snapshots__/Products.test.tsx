import { render } from '@testing-library/react';
import { Products } from '@/pages/Home/components';

const setup = () => render(<Products />);

describe('Products', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
