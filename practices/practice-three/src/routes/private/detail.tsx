import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Components
import { MainLayout } from '@/components/Layout';
const DetailPage = lazy(() => import('@/pages/Detail'));

export const detailRoutes: RouteObject = {
  path: 'detail',
  Component: MainLayout,
  children: [
    {
      index: true,
      element: <Navigate to="/" />,
    },

    {
      path: ':product_id',
      Component: DetailPage,
    },
  ],
};
