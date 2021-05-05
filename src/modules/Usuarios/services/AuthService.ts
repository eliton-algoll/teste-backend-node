import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import AppError from '../../../errors/AppError';

import Usuario from '../typeorm/entities/Usuario';
import IAuthRequestDTO from '../dtos/IAuthRequestDTO';

@injectable()
class AuthService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({ email, senha }: IAuthRequestDTO): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError('Usuário ou senha inválida.', 401);
        }

        const senhaValida = await compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new AppError('Usuário ou senha inválida.', 401);
        }

        return usuario;
    }
}

export default AuthService;
