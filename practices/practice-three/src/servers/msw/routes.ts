import { RequestHandler, rest } from 'msw';

// handlers
import { signIn } from './handlers';
import { ROUTES } from '@/constants';

const signInRoute = rest.post(`/${ROUTES.AUTH}/${ROUTES.SIGN_IN}`, signIn);

export const routes: RequestHandler[] = [signInRoute];
