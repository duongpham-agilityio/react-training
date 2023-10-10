import { createBrowserRouter } from 'react-router-dom';

// Routes
import { privateRoutes } from './private';
import { publicRoutes } from './public';

// Constants
import { ROUTES } from '@/constants';

export const routes = createBrowserRouter([...privateRoutes, ...publicRoutes], {
  basename: ROUTES.ROOT,
});
