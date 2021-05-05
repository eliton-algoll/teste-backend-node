import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsuarioService from '../services/CreateUsuarioService';

class UsuariosController {
    async create(request: Request, response: Response): Promise<Response> {
        const { nome, tipoId, email, senha } = request.body;

        const createUsuario = container.resolve(CreateUsuarioService);

        const usuario = await createUsuario.execute({
            nome,
            tipoId,
            email,
            senha,
        });

        return response.json(usuario);
    }
}

export default UsuariosController;
