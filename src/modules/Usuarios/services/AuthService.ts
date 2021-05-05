import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { sign } from 'jsonwebtoken';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import AppError from '../../../errors/AppError';
import authConfig from '../../../config/auth';

import Usuario from '../typeorm/entities/Usuario';
import IAuthRequestDTO from '../dtos/IAuthRequestDTO';

interface IResponse {
    usuario: Usuario;
    token: string;
}

@injectable()
class AuthService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({
        email,
        senha,
    }: IAuthRequestDTO): Promise<IResponse> {
        const usuario = await this.usuariosRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError('Usuário ou senha inválida.', 401);
        }

        const senhaValida = await compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new AppError('Usuário ou senha inválida.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ tipoId: usuario.tipoId }, secret, {
            subject: `${usuario.id}`,
            expiresIn,
        });

        return { usuario, token };
    }
}

export default AuthService;
