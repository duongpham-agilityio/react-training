import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';

// Lazy components
const HomePage = lazy(() => import('@/pages/Home'));

export const homeRoutes: RouteObject = {
  path: ROUTES.Root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      Component: HomePage,
    },

    {
      path: ROUTES.Home,
      Component: HomePage,
    },
  ],
};
