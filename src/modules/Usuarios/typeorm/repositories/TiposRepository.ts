import { getRepository } from 'typeorm';

import ITiposRepository from '../../repositories/ITiposRepository';

import Tipo from '../entities/Tipo';

class TiposRepository implements ITiposRepository {
    public async findAll(): Promise<Tipo[]> {
        const ormRepository = getRepository(Tipo);

        const tipos = await ormRepository.find();

        return tipos;
    }
}

export default TiposRepository;
