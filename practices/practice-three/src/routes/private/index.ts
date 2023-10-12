import { RouteObject } from 'react-router-dom';

// Routes
import { homeRoutes } from './home';
import { detailRoutes } from './detail';
import { profileRoutes } from './profile';

export const privateRoutes: RouteObject[] = [
  homeRoutes,
  detailRoutes,
  profileRoutes,
];
