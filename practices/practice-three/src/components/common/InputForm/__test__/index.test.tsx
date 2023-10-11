import { fireEvent, render } from '@testing-library/react';

// Components
import { InputForm } from '..';

// Mocks
import { inputFormProps } from '@/mocks';

const setup = (props = inputFormProps) => render(<InputForm {...props} />);

describe('InputForm', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Change value', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = setup({
      ...inputFormProps,
      onChange,
    });
    const input = getByPlaceholderText(inputFormProps.placeholder ?? '');

    fireEvent.change(input, {
      target: {
        value: 'a',
      },
    });

    expect(onChange).toBeCalled();
  });

  it('Change value with name isEmpty', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = setup({
      ...inputFormProps,
      name: '',
      onChange,
    });
    const input = getByPlaceholderText(inputFormProps.placeholder ?? '');

    fireEvent.change(input, {
      target: {
        value: 'a',
      },
    });

    expect(onChange).toBeCalled();
  });
});
