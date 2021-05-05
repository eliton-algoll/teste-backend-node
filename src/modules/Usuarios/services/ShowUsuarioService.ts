import { injectable, inject } from 'tsyringe';

import AppError from '../../../errors/AppError';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Usuario from '../typeorm/entities/Usuario';
import IDeleteUsuarioDTO from '../dtos/IDeleteUsuarioDTO';

@injectable()
class ShowUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({
        id,
        usuarioLogado,
    }: IDeleteUsuarioDTO): Promise<Usuario> {
        if (usuarioLogado?.tipoId === 3 && id !== usuarioLogado?.id) {
            throw new AppError(
                'Usuário não tem permissão para visualizar dados de outros usuários',
                401,
            );
        }

        const usuario = await this.usuariosRepository.findOne(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado', 404);
        }

        return usuario;
    }
}

export default ShowUsuarioService;
