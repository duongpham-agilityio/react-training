export interface IRoutes {
  root: string;
  home: string;
  detail: string;
  auth: string;
  signIn: string;
}

export const ROUTES: Readonly<IRoutes> = {
  root: '/',
  home: 'home',
  detail: 'detail',
  auth: 'auth',
  signIn: 'sign-in',
};

//  Params
export interface IParam {
  product: string;
}

export const PARAM: Readonly<IParam> = {
  product: ':product_id',
};

// Service Endpoints
export interface IEndpointService {
  users: string;
  products: string;
  carts: string;
}

export const ENDPOINT_SERVICES: Readonly<IEndpointService> = {
  users: 'users',
  products: 'products',
  carts: 'carts',
};

// Search params
export interface ISearchParam {
  page: string;
  name: string;
  category: string;
}

export const SEARCH_PARAMS: Readonly<ISearchParam> = {
  page: 'page',
  name: 'name',
  category: 'category',
};
