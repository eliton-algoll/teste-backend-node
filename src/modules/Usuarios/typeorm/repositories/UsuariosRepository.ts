import { getRepository, Repository } from 'typeorm';
import IUsuariosRepository from '../../repositories/IUsuariosRepository';
import Usuario from '../entities/Usuario';
import IcreateUsuarioDTO from '../../dtos/ICreateUsuarioDTO';
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

    public async update(usuario: Usuario): Promise<Usuario> {
        return this.ormRepository.save(usuario);
    }

    public async delete(usuario: Usuario): Promise<boolean> {
        if (!this.ormRepository.delete(usuario)) {
            return false;
        }

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
