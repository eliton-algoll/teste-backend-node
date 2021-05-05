import { injectable, inject } from 'tsyringe';

import { hash } from 'bcryptjs';

import AppError from '../../../errors/AppError';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Usuario from '../typeorm/entities/Usuario';
import IUpdateUsuarioDTO from '../dtos/IUpdateUsuarioDTO';

@injectable()
class UpdateUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({
        id,
        nome,
        tipoId,
    }: IUpdateUsuarioDTO): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findOne(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado', 404);
        }

        const usuarioUpdated = this.usuariosRepository.update({
            ...usuario,
            nome,
            tipoId,
        });

        return usuarioUpdated;
    }
}

export default UpdateUsuarioService;
