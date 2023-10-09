import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Constants
import { ROUTES, PARAM } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';

// Lazy components
const DetailPage = lazy(() => import('@/pages/Detail'));

export const detailRoutes: RouteObject = {
  path: ROUTES.detail,
  Component: MainLayout,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTES.root} />,
    },

    {
      path: PARAM.product,
      Component: DetailPage,
    },
  ],
};
