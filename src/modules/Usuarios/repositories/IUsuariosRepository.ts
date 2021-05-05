import Usuario from '../typeorm/entities/Usuario';
import IcreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';
import IUpdateStatusUsuarioDTO from '../dtos/IUpdateStatusUsuarioDTO';

export default interface IUsuarios {
    create(data: IcreateUsuarioDTO): Promise<Usuario>;

    findOne(id: number): Promise<Usuario | undefined>;

    update(usuario: Usuario): Promise<Usuario>;

    delete(usuario: Usuario): Promise<boolean>;

    alterStatus(data: IUpdateStatusUsuarioDTO): Promise<Usuario>;

    findByEmail(email: string): Promise<Usuario | undefined>;
}
