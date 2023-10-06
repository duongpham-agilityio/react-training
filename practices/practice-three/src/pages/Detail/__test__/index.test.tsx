import { render } from '@testing-library/react';

// Components
import Detail from '..';

jest.mock('@/assets/images/shoes.png', () => ({
  default: '@/assets/images/shoes.png',
}));
jest.mock('@/assets/images/social.png', () => ({
  default: '@/assets/images/social.png',
}));

const setup = () => render(<Detail />);

describe('Details page', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
