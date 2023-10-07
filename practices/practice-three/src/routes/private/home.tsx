import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Constants
import { ENDPOINT } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';
const HomePage = lazy(() => import('@/pages/Home'));

export const homeRoutes: RouteObject = {
  path: ENDPOINT.Root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      Component: HomePage,
    },

    {
      path: ENDPOINT.Home,
      Component: HomePage,
    },
  ],
};
