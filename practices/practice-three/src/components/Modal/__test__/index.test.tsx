import { fireEvent, render } from '@testing-library/react';

// Components
import ModalCustom from '..';

// Mocks
import { defaultModalProps } from '@/mocks';

const setup = (props = defaultModalProps) => render(<ModalCustom {...props} />);

describe('Modal', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render with children', () => {
    const { getByText, rerender } = setup({
      ...defaultModalProps,
      children: <p>children</p>,
    });

    expect(getByText('children')).toBeDefined();

    rerender(
      <ModalCustom {...defaultModalProps}>
        <p>update</p>
      </ModalCustom>,
    );

    expect(getByText('update')).toBeDefined();
  });

  it('Close modal', () => {
    const onClose = jest.fn();
    const { getByRole } = setup({
      ...defaultModalProps,
      onClose,
    });

    fireEvent.click(getByRole('button'));

    expect(onClose).toBeCalled();
  });
});
