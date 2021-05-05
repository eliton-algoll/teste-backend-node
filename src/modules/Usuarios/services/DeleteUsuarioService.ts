import { injectable, inject } from 'tsyringe';

import AppError from '../../../errors/AppError';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IDeleteUsuarioDTO from '../dtos/IDeleteUsuarioDTO';

@injectable()
class DeleteUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({
        id,
        usuarioLogado,
    }: IDeleteUsuarioDTO): Promise<boolean> {
        if (usuarioLogado.tipoId !== 1) {
            throw new AppError(
                'Usuário não tem permissão para excluir um usuário',
                401,
            );
        }

        const usuario = await this.usuariosRepository.findOne(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado', 404);
        }

        const deleted = this.usuariosRepository.delete(usuario);
        if (!deleted) {
            return false;
        }

        return true;
    }
}

export default DeleteUsuarioService;
