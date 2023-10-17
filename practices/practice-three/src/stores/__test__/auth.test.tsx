import { act, fireEvent, render } from '@testing-library/react';
import { TAuthStore, useAuthStore } from '..';

const Component = () => {
  const setAuth = useAuthStore((state: TAuthStore) => state.setIsAuth);
  const clearAuth = useAuthStore((state: TAuthStore) => state.clearIsAuth);
  const isAuth = useAuthStore((state: TAuthStore) => state.isAuth);

  return (
    <>
      {isAuth ? 'Logged' : 'No logged'}
      <button onClick={clearAuth}>Clear auth</button>
      <button onClick={setAuth}>Set auth</button>
    </>
  );
};

const setup = () => render(<Component />);

describe('Auth store', () => {
  it('Set Auth', async () => {
    const { getAllByRole, getByText } = setup();

    await act(() => fireEvent.click(getAllByRole('button')[1]));

    expect(getByText('Logged')).toBeDefined();
  });

  it('Set Auth', async () => {
    const { getAllByRole, getByText } = setup();
    const buttons = getAllByRole('button');

    await act(() => fireEvent.click(buttons[1]));

    expect(getByText('Logged')).toBeDefined();

    await act(() => fireEvent.click(buttons[0]));

    expect(getByText('No logged')).toBeDefined();
  });
});
