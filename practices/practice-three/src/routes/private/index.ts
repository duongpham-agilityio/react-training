import { RouteObject } from 'react-router-dom';

// Routes
import { homeRoutes } from './home';
import { detailRoutes } from './detail';

export const privateRoutes: RouteObject[] = [homeRoutes, detailRoutes];
