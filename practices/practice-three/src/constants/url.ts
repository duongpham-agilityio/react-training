// Browser Endpoints
export interface IEndpoint {
  Root: string;
  Home: string;
  Detail: string;
  Auth: string;
  SignIn: string;
}

export const ENDPOINT: Readonly<IEndpoint> = {
  Root: '/',
  Home: 'home',
  Detail: 'detail',
  Auth: 'auth',
  SignIn: 'sign-in',
};

//  Params
export interface IParam {
  Product: string;
}

export const PARAM: Readonly<IParam> = {
  Product: ':product_id',
};

// Service Endpoints
export interface IEndpointService {
  Users: string;
  Products: string;
  Carts: string;
}

export const ENDPOINT_SERVICES: Readonly<IEndpointService> = {
  Users: 'users',
  Products: 'products',
  Carts: 'carts',
};
