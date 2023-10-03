import { fireEvent, render } from '@testing-library/react';

// Components
import { HeartIcon, HeartIconProps } from '..';

const onClick = jest.fn();
const defaultProps: HeartIconProps = {
  onClick,
};

const setup = (props = defaultProps) => render(<HeartIcon {...props} />);

describe('HeartIcon', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render with props', () => {
    setup({ ...defaultProps, color: 'red', variant: 'fill' });
  });

  it('Click', () => {
    const { getByRole } = setup();

    fireEvent.click(getByRole('button'));

    expect(onClick).toBeCalled();
  });
});
