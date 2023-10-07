import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Components
import { MainLayout } from '@/components/Layout';
const HomePage = lazy(() => import('@/pages/Home'));

export const homeRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      Component: HomePage,
    },

    {
      path: 'home',
      Component: HomePage,
    },
  ],
};
