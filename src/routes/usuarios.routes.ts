import { Router } from 'express';

import UsuariosController from '../modules/Usuarios/controllers/UsuariosController';
import verificaAutenticacao from '../modules/Usuarios/middlewares/verificaAutenticaco';

const routes = Router();

const usuariosController = new UsuariosController();

routes.use(verificaAutenticacao);
routes.post('/create', usuariosController.create);

export default routes;
