import { Router } from 'express';

import TiposController from '../modules/Usuarios/controllers/TiposController';

const routes = Router();
const tiposController = new TiposController();

routes.get('/create', tiposController.list);

export default routes;
