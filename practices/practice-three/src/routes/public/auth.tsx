import { Center, Spinner } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@/constants';

// Pages
const SignIn = lazy(() => import('@/pages/SignIn'));

export const authRoutes: RouteObject = {
  path: ROUTES.auth,
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
      element: <Navigate to={ROUTES.signIn} />,
    },
    {
      path: ROUTES.signIn,
      Component: SignIn,
    },
  ],
};
