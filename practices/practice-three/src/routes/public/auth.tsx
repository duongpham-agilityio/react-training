import { Center, Spinner } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

// Pages
const SignIn = lazy(() => import('@/pages/SignIn'));

export const authRoutes: RouteObject = {
  path: 'auth',
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
      element: <Navigate to="sign-in" />,
    },
    {
      path: 'sign-in',
      Component: SignIn,
    },
  ],
};
