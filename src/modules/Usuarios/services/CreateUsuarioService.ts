import { injectable, inject } from 'tsyringe';

import { hash } from 'bcryptjs';

import AppError from '../../../errors/AppError';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import Usuario from '../typeorm/entities/Usuario';
import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';

@injectable()
class CreateUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
    ) {}

    public async execute({
        nome,
        tipoId,
        email,
        senha,
        usuarioLogado,
    }: ICreateUsuarioDTO): Promise<Usuario> {
        if (usuarioLogado?.tipoId !== 1 && usuarioLogado?.tipoId !== 2) {
            throw new AppError(
                'Usuário não tem permissão para cadastrar novos usuários',
                401,
            );
        }

        const usuarioExiste = await this.usuariosRepository.findByEmail(email);

        if (usuarioExiste) {
            throw new AppError('Email já cadastrado');
        }

        const hashedSenha = await hash(senha, 10);

        const usuario = this.usuariosRepository.create({
            nome,
            senha: hashedSenha,
            tipoId,
            email,
        });

        return usuario;
    }
}

export default CreateUsuarioService;
