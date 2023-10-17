import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';

// HOCs
import { withIsAuth, withIsUnAuth } from '..';

import { useAuthStore } from '@/stores';

// Constants
import { ROUTES } from '@/constants';

const HOME = 'Home page';
const LOGIN = 'Login Page';

const setupIsAuth = (memoryPath: string) => (
  <MemoryRouter initialEntries={[memoryPath]}>
    <Routes>
      <Route
        path={`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`}
        element={<p>{LOGIN}</p>}
      />
      <Route
        path={`${ROUTES.ROOT}`}
        Component={withIsAuth(() => (
          <p>{HOME}</p>
        ))}
      />
    </Routes>
  </MemoryRouter>
);

const setupIsUnAuth = (memoryPath: string) => (
  <MemoryRouter initialEntries={[memoryPath]}>
    <Routes>
      <Route
        path={`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`}
        Component={withIsUnAuth(() => (
          <p>{LOGIN}</p>
        ))}
      />
      <Route path={`${ROUTES.ROOT}`} element={<p>{HOME}</p>} />
    </Routes>
  </MemoryRouter>
);

describe('withIsAuth', () => {
  it('No logged', () => {
    useAuthStore.setState({ isAuth: false });
    const { getByText } = render(setupIsAuth('/'));

    expect(getByText(LOGIN)).toBeDefined();
  });

  it('Logged', () => {
    useAuthStore.setState({ isAuth: true });
    const { getByText } = render(setupIsAuth('/'));

    expect(getByText(HOME)).toBeDefined();
  });
});

describe('withIsUnAuth', () => {
  it('No logged', () => {
    useAuthStore.setState({ isAuth: false });
    const { getByText } = render(
      setupIsUnAuth(`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`),
    );

    expect(getByText(LOGIN)).toBeDefined();
  });

  it('Logged', () => {
    useAuthStore.setState({ isAuth: true });
    const { getByText } = render(
      setupIsUnAuth(`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`),
    );

    expect(getByText(HOME)).toBeDefined();
  });
});
