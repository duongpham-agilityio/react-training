import { act, renderHook } from '@testing-library/react';
import { useSearch } from '..';
import { IProduct } from '@/interface';
import { BrowserRouter } from 'react-router-dom';

const mock = [
  {
    name: 'duong',
    category: 'books',
  },

  {
    name: 'pham',
    category: 'books',
  },

  {
    name: 'tan',
    category: 'books',
  },
];

const setup = () =>
  renderHook(() => useSearch(mock as IProduct[]), {
    wrapper: BrowserRouter,
  });

describe('useSearch', () => {
  jest.useFakeTimers();
  it('handleSetSearchParam', async () => {
    const { result } = setup();

    await act(() => {
      result.current.onChangeSearchInput('duong');
      jest.clearAllTimers();

      console.log(result.current.searchValue);
    });
  });
});
