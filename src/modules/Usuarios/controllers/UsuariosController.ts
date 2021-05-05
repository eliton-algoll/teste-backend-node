import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsuarioService from '../services/CreateUsuarioService';

class UsuariosController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { nome, tipoId, email, senha } = request.body;

            const createUsuario = container.resolve(CreateUsuarioService);

            const usuario = await createUsuario.execute({
                nome,
                tipoId,
                email,
                senha,
            });

            return response.json(usuario);
        } catch (e) {
            return response.status(e.satusCode).json({ error: e.message });
        }
    }
}

export default UsuariosController;
