import { renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Hooks
import { useAuthStore, useHandleAuth } from '..';

// Constants
import { MESSAGES } from '@/constants';
import { act } from 'react-dom/test-utils';

const setup = () =>
  renderHook(useHandleAuth, {
    wrapper: BrowserRouter,
  });

describe('useAuth', () => {
  it('onLogin (404)', () => {
    try {
      global.fetch = jest.fn().mockImplementation(
        () =>
          ({
            status: 404,
          }) as unknown as Promise<Response>,
      );
      const { result } = setup();

      result.current.onLogin('duong', '123');
    } catch (error) {
      const message: string = (error as unknown as Error).message;

      expect(message).toBe(MESSAGES.FAIL_TO_FETCH);
    }
  });

  it('onLogin (401)', async () => {
    global.fetch = jest.fn().mockImplementation(
      () =>
        ({
          status: 401,
          json: () => ({
            name: 'Duong',
          }),
        }) as unknown as Promise<Response>,
    );
    const { result } = setup();

    await act(async () => await result.current.onLogin('duong', '123'));

    expect(result.current.isError).toBeTruthy();
  });

  it('onLogin (200)', async () => {
    global.fetch = jest.fn().mockImplementation(
      () =>
        ({
          status: 200,
        }) as unknown as Promise<Response>,
    );
    const { result } = setup();

    await act(async () => await result.current.onLogin('duong', '123'));

    expect(result.current.isError).toBeFalsy();
  });

  it('onLogout', async () => {
    const { result } = setup();

    await act(async () => await result.current.onLogout());

    expect(useAuthStore.getState().isAuth).toBeFalsy();
  });
});
