import { act, renderHook } from '@testing-library/react';

// Hooks
import { useForm } from '..';

const setup = () =>
  renderHook((props) => useForm(props), {
    initialProps: {
      name: '',
    },
  });

describe('useForm', () => {
  it('onChange', async () => {
    const { result } = setup();

    await act(() => {
      result.current.onChange('duong', 'name');
    });

    expect(result.current.formData).toEqual({
      name: 'duong',
    });
  });

  it('onSubmit', () => {
    const callback = jest.fn();
    const { result } = setup();
    const submit: () => void = result.current.onSubmit(
      callback,
    ) as unknown as () => void;
    const form = document.createElement('form');

    form.addEventListener('submit', submit);
    form.submit();
    expect(callback).toBeCalled();
  });
});
