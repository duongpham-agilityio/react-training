import { Center, Spinner } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

// Constants
import { ENDPOINT } from '@/constants';

// Pages
const SignIn = lazy(() => import('@/pages/SignIn'));

export const authRoutes: RouteObject = {
  path: ENDPOINT.Auth,
  element: (
    <Suspense
      fallback={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <Navigate to={ENDPOINT.SignIn} />,
    },
    {
      path: ENDPOINT.SignIn,
      Component: SignIn,
    },
  ],
};
