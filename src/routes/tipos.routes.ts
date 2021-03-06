import { Router } from 'express';

import TiposController from '../modules/Usuarios/controllers/TiposController';

const routes = Router();
const tiposController = new TiposController();

routes.get('/', tiposController.list);

export default routes;
