import { injectable, inject } from 'tsyringe';

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
        usuarioLogado,
    }: IUpdateUsuarioDTO): Promise<Usuario> {
        if (usuarioLogado?.tipoId === 3 && id !== usuarioLogado?.id) {
            throw new AppError(
                'Usuário não tem permissão para alterar dados de outros usuários',
                401,
            );
        }

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
