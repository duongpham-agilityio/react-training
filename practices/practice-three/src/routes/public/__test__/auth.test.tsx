import { act, render } from '@testing-library/react';
import { ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

// Routes
import { authRoutes } from '../auth';

// Constants
import { ROUTES } from '@/constants';

const setup = () => {
  const memoryRoute = createMemoryRouter([authRoutes], {
    initialEntries: [`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`],
  });

  return render(<RouterProvider router={memoryRoute} />);
};

describe('Auth router', () => {
  beforeEach(() => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      lazy: (callback: () => any) => callback(),
      Suspense: ({ children }: { children: ReactNode }) => children,
    }));
  });
  it('Match to snapshot', async () => {
    const { container } = await act(() => setup());

    expect(container).toMatchSnapshot();
  });
});
