import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../errors/AppError';

import CreateUsuarioService from '../services/CreateUsuarioService';

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
}

export default UsuariosController;
