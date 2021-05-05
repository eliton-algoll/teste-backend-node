import { Router } from 'express';

import UsuariosController from '../modules/Usuarios/controllers/UsuariosController';

const routes = Router();
const usuariosController = new UsuariosController();

routes.post('/create', usuariosController.create);

export default routes;
