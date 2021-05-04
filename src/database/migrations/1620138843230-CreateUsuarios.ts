import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateUsuarios1620138843230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'tipo',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'usuarios',
            new TableForeignKey({
                name: 'fk_tipo_id',
                columnNames: ['tipo'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tipos',
                onDelete: 'RESTRICT',
                onUpdate: 'NO ACTION',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios');
    }
}
