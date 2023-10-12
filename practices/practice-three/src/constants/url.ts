export interface IRoutes {
  ROOT: string;
  HOME: string;
  DETAIL: string;
  AUTH: string;
  SIGN_IN: string;
  PROFILE: string;
}

export const ROUTES: Readonly<IRoutes> = {
  ROOT: '/',
  HOME: 'home',
  DETAIL: 'detail',
  AUTH: 'auth',
  SIGN_IN: 'sign-in',
  PROFILE: 'profile',
};

//  Params
export interface IParam {
  PRODUCT: string;
}

export const PARAM: Readonly<IParam> = {
  PRODUCT: 'productId',
};

// Service Endpoints
export interface IEndpointService {
  USERS: string;
  PRODUCTS: string;
  CARTS: string;
}

export const ENDPOINT_SERVICES: Readonly<IEndpointService> = {
  USERS: 'users',
  PRODUCTS: 'products',
  CARTS: 'carts',
};

// Search params
export interface ISearchParam {
  PAGE: string;
  NAME: string;
  CATEGORY: string;
}

export const SEARCH_PARAMS: Readonly<ISearchParam> = {
  PAGE: 'page',
  NAME: 'name',
  CATEGORY: 'category',
};
