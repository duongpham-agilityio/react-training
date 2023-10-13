import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

// Stores
import { IAuthStore, authStore } from '@/stores';

// Constant
import { ROUTES } from '@/constants';

export const withIsAuth = <T extends object>(
  Component: FunctionComponent<T>,
) => {
  const AuthComponent = (props: T) => {
    const isAuth = authStore((state: IAuthStore) => state.isAuth);

    if (!isAuth) return <Navigate to={`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`} />;

    return <Component {...props} />;
  };

  return AuthComponent;
};

export const withIsUnAuth = <T extends object>(
  Component: FunctionComponent<T>,
) => {
  const AuthComponent = (props: T) => {
    const isAuth = authStore((state: IAuthStore) => state.isAuth);

    if (isAuth) return <Navigate to={ROUTES.ROOT} replace />;

    return <Component {...props} />;
  };

  return AuthComponent;
};
