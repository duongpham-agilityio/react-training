import { act, renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Hooks
import { usePagination } from '..';

const setup = () =>
  renderHook(() => usePagination(Array.from({ length: 12 })), {
    wrapper: BrowserRouter,
  });

describe('usePagination', () => {
  it('onChangePage', async () => {
    const { result } = setup();

    await act(() => {
      result.current.onChangePage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });
});
