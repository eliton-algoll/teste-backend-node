import { getRepository, Repository } from 'typeorm';
import IUsuariosRepository from '../../repositories/IUsuariosRepository';
import Usuario from '../entities/Usuario';
import IcreateUsuarioDTO from '../../dtos/ICreateUsuarioDTO';
import IUpdateUsuarioDTO from '../../dtos/IUpdateUsuarioDTO';
import IUpdateStatusUsuarioDTO from '../../dtos/IUpdateStatusUsuarioDTO';

class UsuariosRepository implements IUsuariosRepository {
    private ormRepository: Repository<Usuario>;

    constructor() {
        this.ormRepository = getRepository(Usuario);
    }

    public async create(data: IcreateUsuarioDTO): Promise<Usuario> {
        const profile = this.ormRepository.create(data);
        await this.ormRepository.save(profile);

        return profile;
    }

    public async findOne(id: number): Promise<Usuario | undefined> {
        const usuario = await this.ormRepository.findOne(id);

        return usuario || undefined;
    }

    public async update(data: IUpdateUsuarioDTO): Promise<Usuario> {
        const { id, nome, tipoId } = data;

        const findUsuario = await this.ormRepository.findOne(id);

        const usuario = { ...findUsuario, nome, tipoId };

        const usuarioUpdated = await this.ormRepository.save(usuario);

        return usuarioUpdated;
    }

    public async delete(id: number): Promise<boolean> {
        const usuario = await this.ormRepository.findOne(id);

        if (!usuario) {
            return false;
        }

        await this.ormRepository.delete(usuario);

        return true;
    }

    public async alterStatus(data: IUpdateStatusUsuarioDTO): Promise<Usuario> {
        const { id, status } = data;

        const findUsuario = await this.ormRepository.findOne(id);

        const usuario = { ...findUsuario, status };

        const usuarioUpdated = await this.ormRepository.save(usuario);

        return usuarioUpdated;
    }

    public async findByEmail(email: string): Promise<Usuario | undefined> {
        const usuario = await this.ormRepository
            .createQueryBuilder('usuario')
            .where('usuario.email = :email', {
                email,
            })
            .getOne();

        return usuario || undefined;
    }
}

export default UsuariosRepository;
