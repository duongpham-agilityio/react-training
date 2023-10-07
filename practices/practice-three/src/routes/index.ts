import { createBrowserRouter } from 'react-router-dom';

// Routes
import { privateRoutes } from './private';
import { publicRoutes } from './public';

export const routes = createBrowserRouter([...privateRoutes, ...publicRoutes], {
  basename: '/',
});
