import { Router } from 'express';

import UsuariosController from '../modules/Usuarios/controllers/UsuariosController';

const routes = Router();
const tiposController = new UsuariosController();

routes.post('/create', tiposController.create);

export default routes;
