import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../errors/AppError';

import CreateUsuarioService from '../services/CreateUsuarioService';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

class UsuariosController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { nome, tipoId, email, senha, usuarioLogado } = request.body;

            if (usuarioLogado.tipoId !== 1 && usuarioLogado.tipoId !== 2) {
                throw new AppError(
                    'Usuário não tem permissão para cadastrar novos usuários',
                    401,
                );
            }

            const createUsuario = container.resolve(CreateUsuarioService);

            const usuario = await createUsuario.execute({
                nome,
                tipoId,
                email,
                senha,
            });

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }

    async show(request: Request, response: Response): Promise<Response> {
        try {
            const { usuarioLogado } = request.body;

            const usuariosRepository = new UsuariosRepository();

            const usuario = await usuariosRepository.findOne(usuarioLogado.id);

            if (!usuario) {
                throw new AppError('Usuário não encontrado', 404);
            }

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }
}

export default UsuariosController;
