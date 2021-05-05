import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('DeleteUsuarioService', () => {
    beforeAll(async () => {
        connectionTest = await createConnection();

        await connectionTest.query(
            'DELETE FROM usuarios where id NOT IN (1,2,3)',
        );
    });

    afterAll(async () => {
        const connection = getConnection();

        await connectionTest.close();
        await connection.close();
    });

    it('deve conseguir deletar um usuário sendo do tipo root', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste delete',
                tipoId: 2,
                senha: '123456',
                email: 'testeDelete@teste.com.br',
            })
            .set('authorization', token);

        const responseDeleted = await request(app)
            .delete('/usuarios/delete')
            .send({
                id: response.body.id,
            })
            .set('authorization', token);

        expect(responseDeleted.status).toBe(200);
    });

    it('não deve conseguir deletar um usuário não sendo do tipo root', async () => {
        const responseLoginRoot = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '123456',
        });

        const tokenAdmin = `Bearer ${responseLoginRoot.body.token}`;

        const responseLoginAdmin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const tokenGeral = `Bearer ${responseLoginAdmin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste delete',
                tipoId: 2,
                senha: '123456',
                email: 'testeDelete@teste.com.br',
            })
            .set('authorization', tokenAdmin);

        const responseDeletedAdmin = await request(app)
            .delete('/usuarios/delete')
            .send({
                id: response.body.id,
            })
            .set('authorization', tokenAdmin);

        expect(responseDeletedAdmin.body).toHaveProperty('error');

        const responseDeletedGeral = await request(app)
            .delete('/usuarios/delete')
            .send({
                id: response.body.id,
            })
            .set('authorization', tokenGeral);

        expect(responseDeletedGeral.body).toHaveProperty('error');
    });

    it('deve retornar erro ao tentar deletar um usuário inexistente', async () => {
        const responseLoginRoot = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLoginRoot.body.token}`;

        const response = await request(app)
            .delete('/usuarios/delete')
            .send({
                id: 0,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });
});
