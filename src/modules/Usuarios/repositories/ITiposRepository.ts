import Tipo from '../typeorm/entities/Tipo';

export default interface ITiposRepository {
    findAll(): Promise<Tipo[]>;
}
