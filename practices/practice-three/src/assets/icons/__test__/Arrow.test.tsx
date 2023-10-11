import { render } from '@testing-library/react';

// Icons
import { ArrowRightOutline, ArrowLeftOutline, ArrowRight, ArrowLeft } from '..';

describe('ArrowRight', () => {
  it('Match to snapshot', () => {
    const { container } = render(<ArrowRight />);

    expect(container).toMatchSnapshot();
  });
});

describe('ArrowLeft', () => {
  it('Match to snapshot', () => {
    const { container } = render(<ArrowLeft />);

    expect(container).toMatchSnapshot();
  });
});

describe('ArrowRightOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<ArrowRightOutline />);

    expect(container).toMatchSnapshot();
  });
});

describe('ArrowLeftOutline', () => {
  it('Match to snapshot', () => {
    const { container } = render(<ArrowLeftOutline />);

    expect(container).toMatchSnapshot();
  });
});
