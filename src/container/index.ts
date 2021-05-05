import { container } from 'tsyringe';

import IUsuariosRepository from '../modules/Usuarios/repositories/IUsuariosRepository';
import UsuariosRepository from '../modules/Usuarios/typeorm/repositories/UsuariosRepository';

container.registerSingleton<IUsuariosRepository>(
    'UsuariosRepository',
    UsuariosRepository,
);
