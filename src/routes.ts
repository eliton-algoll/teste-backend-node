import { Router } from 'express';

import tiposRoutes from './routes/tipos.routes';
import usuariosRoutes from './routes/usuarios.routes';
import authRoutes from './routes/auth.routes';

const routes = Router();

routes.use('/tipos', tiposRoutes);
routes.use('/usuarios', usuariosRoutes);
routes.use('/login', authRoutes);

export default routes;
