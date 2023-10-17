import { fireEvent, render } from '@testing-library/react';

// Components
import Dialog, { TDialogProps } from '..';

const props: TDialogProps = {
  isOpen: true,
  title: 'Test',
  description: 'Implement unit test for Dialog',
  onAccept: jest.fn(),
  onClose: jest.fn(),
};

const setup = () => render(<Dialog {...props} />);

describe('Dialog', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('onClose', () => {
    const { getByText } = setup();

    fireEvent.click(getByText('No'));
    expect(props.onClose).toBeCalled();
  });

  it('onAccept', () => {
    const { getByText } = setup();

    fireEvent.click(getByText('Yes'));
    expect(props.onAccept).toBeCalled();
  });
});
