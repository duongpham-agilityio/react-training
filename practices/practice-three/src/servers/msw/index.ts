import { setupWorker } from 'msw';

// Routes
import { routes } from './routes';

export const worker = setupWorker(...routes);
