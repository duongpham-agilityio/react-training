import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Constants
import { ENDPOINT, PARAM } from '@/constants';

// Components
import { MainLayout } from '@/components/Layout';
const DetailPage = lazy(() => import('@/pages/Detail'));

export const detailRoutes: RouteObject = {
  path: ENDPOINT.Detail,
  Component: MainLayout,
  children: [
    {
      index: true,
      element: <Navigate to={ENDPOINT.Root} />,
    },

    {
      path: PARAM.Product,
      Component: DetailPage,
    },
  ],
};
