import { renderHook } from '@testing-library/react';
import { useDebounce } from '..';

describe('useDebounce', () => {
  jest.useFakeTimers();
  it('debounce', async () => {
    const callback = jest.fn();
    const { result } = renderHook(({ callback }) => useDebounce(callback), {
      initialProps: {
        callback,
      },
    });

    result.current('hel');
    result.current('hello');
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledWith('hello');
  });
});
