import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Tipo from './Tipo';

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'tipo', type: 'integer' })
    tipoId: number;

    @ManyToOne(() => Tipo)
    @JoinColumn({ name: 'tipo' })
    tipoJoin: Tipo;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column('boolean')
    status = true;
}

export default Usuario;
