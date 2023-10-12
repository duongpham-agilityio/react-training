import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';

// Pages
import HomePage from '@/pages/Home';

export const homeRoutes: RouteObject = {
  path: ROUTES.ROOT,
  element: <MainLayout />,
  children: [
    {
      index: true,
      Component: HomePage,
    },

    {
      path: ROUTES.HOME,
      Component: HomePage,
    },
  ],
};
