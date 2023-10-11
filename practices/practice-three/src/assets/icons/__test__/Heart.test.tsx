import { render } from '@testing-library/react';

// Icons
import { HeartOutline, HeartFill, HeartSideBarFill } from '..';

describe('HeartFill', () => {
  it('Match to snapshot', () => {
    const { container } = render(<HeartFill />);

    expect(container).toMatchSnapshot();
  });
});

describe('HeartOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<HeartOutline />);

    expect(container).toMatchSnapshot();
  });
});

describe('HeartSideBarFill', () => {
  it('Match to snapshot', () => {
    const { container } = render(<HeartSideBarFill />);

    expect(container).toMatchSnapshot();
  });
});
