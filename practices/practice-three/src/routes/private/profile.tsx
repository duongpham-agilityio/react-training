import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';

// Lazy components
const Profile = lazy(() => import('@/pages/Profile'));

export const profileRoutes: RouteObject = {
  path: ROUTES.PROFILE,
  Component: MainLayout,
  children: [
    {
      index: true,
      element: <Profile />,
    },
  ],
};
