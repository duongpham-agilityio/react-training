import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

// Routes
import { homeRoutes } from '../home';

// Constants
import { ROUTES } from '@/constants';

const setup = () => {
  const memoryRoute = createMemoryRouter([homeRoutes], {
    initialEntries: [`${ROUTES.ROOT}}`],
  });

  return render(<RouterProvider router={memoryRoute} />);
};

describe('Home route', () => {
  beforeEach(() => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      lazy: (callback: () => any) => callback(),
      Suspense: ({ children }: { children: ReactNode }) => children,
    }));
  });
  it('Match to snapshot', async () => {
    const { container, getByText } = await setup();

    expect(container).toMatchSnapshot();
    expect(getByText('Trending Items')).toBeDefined();
  });
});
