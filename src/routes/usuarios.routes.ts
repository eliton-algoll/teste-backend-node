import { Router } from 'express';

import UsuariosController from '../modules/Usuarios/controllers/UsuariosController';
import verificaAutenticacao from '../modules/Usuarios/middlewares/verificaAutenticaco';

const routes = Router();

const usuariosController = new UsuariosController();

routes.use(verificaAutenticacao);

routes.get('/show/:id', usuariosController.show);

routes.post('/create', usuariosController.create);

routes.put('/update', usuariosController.update);

routes.delete('/delete', usuariosController.delete);

export default routes;
