import Usuario from '../typeorm/entities/Usuario';
import IcreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';
import IUpdateUsuarioDTO from '../dtos/IUpdateUsuarioDTO';
import IUpdateStatusUsuarioDTO from '../dtos/IUpdateStatusUsuarioDTO';

export default interface IUsuarios {
    create(data: IcreateUsuarioDTO): Promise<Usuario>;

    findOne(id: number): Promise<Usuario | undefined>;

    update(data: IUpdateUsuarioDTO): Promise<Usuario>;

    delete(id: number): Promise<boolean>;

    alterStatus(data: IUpdateStatusUsuarioDTO): Promise<Usuario>;

    findByEmail(email: string): Promise<Usuario | undefined>;
}
