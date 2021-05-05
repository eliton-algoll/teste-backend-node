import { Router } from 'express';

import tiposRoutes from './routes/tipos.routes';

const routes = Router();

routes.use('/tipos', tiposRoutes);

export default routes;
