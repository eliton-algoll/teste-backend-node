import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos')
class Tipos {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    descricao: string;
}

export default Tipos;
