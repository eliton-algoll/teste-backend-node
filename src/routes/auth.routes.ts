import { Router } from 'express';

import AuthController from '../modules/Usuarios/controllers/AuthController';

const routes = Router();
const authController = new AuthController();

routes.post('/', authController.create);

export default routes;
