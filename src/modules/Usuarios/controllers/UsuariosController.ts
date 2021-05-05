import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../errors/AppError';

import ShowUsuarioService from '../services/ShowUsuarioService';
import CreateUsuarioService from '../services/CreateUsuarioService';
import UpdateUsuarioService from '../services/UpdateUsuarioService';
import DeleteUsuarioService from '../services/DeleteUsuarioService';
import UsuariosRepository from '../typeorm/repositories/UsuariosRepository';

class UsuariosController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { nome, tipoId, email, senha, usuarioLogado } = request.body;

            const createUsuario = container.resolve(CreateUsuarioService);

            const usuario = await createUsuario.execute({
                nome,
                tipoId,
                email,
                senha,
                usuarioLogado,
            });

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }

    async show(request: Request, response: Response): Promise<Response> {
        try {
            const { usuarioLogado } = request.body;
            const idRota = request.params.id;
            const id = Number(idRota);

            const showUsuario = container.resolve(ShowUsuarioService);

            const usuario = await showUsuario.execute({ id, usuarioLogado });

            if (!usuario) {
                throw new AppError('Usuário não encontrado', 404);
            }

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {
            const { id, nome, tipoId, usuarioLogado } = request.body;

            const updateUsuario = container.resolve(UpdateUsuarioService);

            const usuario = await updateUsuario.execute({
                id,
                nome,
                tipoId,
                usuarioLogado,
            });

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { id, usuarioLogado } = request.body;

            const deleteUsuario = container.resolve(DeleteUsuarioService);

            await deleteUsuario.execute({ id, usuarioLogado });

            return response.status(200).json();
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }
}

export default UsuariosController;
