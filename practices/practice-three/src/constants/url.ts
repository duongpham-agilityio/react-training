export interface IRoutes {
  Root: string;
  Home: string;
  Detail: string;
  Auth: string;
  SignIn: string;
}

export const ROUTES: Readonly<IRoutes> = {
  Root: '/',
  Home: 'home',
  Detail: 'detail',
  Auth: 'auth',
  SignIn: 'sign-in',
};

export interface IParam {
  Product: string;
}

export const PARAM: Readonly<IParam> = {
  Product: ':product_id',
};
