import { Router } from 'express';

import tiposRoutes from './routes/tipos.routes';
import usuariosRoutes from './routes/usuarios.routes';

const routes = Router();

routes.use('/tipos', tiposRoutes);
routes.use('/usuarios', usuariosRoutes);

export default routes;
