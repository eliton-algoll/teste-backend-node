import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('UpdateStatusUsuarioService', () => {
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

    it('deve conseguir alterar o status de um usuário sendo do tipo root', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste status',
                tipoId: 2,
                senha: '123456',
                email: 'testeUpdate@teste.com.br',
            })
            .set('authorization', token);

        const responseUpdated = await request(app)
            .put('/usuarios/alterastatus')
            .send({
                id: response.body.id,
                status: false,
            })
            .set('authorization', token);

        expect(responseUpdated.body).toHaveProperty('status');
    });

    it('deve conseguir alterar o status de um  usuário sendo do tipo admin', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste update admin',
                tipoId: 2,
                senha: '123456',
                email: 'testeUpdateAdmin@teste.com.br',
            })
            .set('authorization', token);

        const responseUpdated = await request(app)
            .put('/usuarios/alterastatus')
            .send({
                id: response.body.id,
                status: false,
            })
            .set('authorization', token);

        expect(responseUpdated.body).toHaveProperty('status');
    });

    it('não deve conseguir conseguir alterar o status de um usuário sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .put('/usuarios/alterastatus')
            .send({
                id: 2,
                nome: 'usuario teste alterado',
                tipoId: 3,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });

    it('deve retornar erro ao tentar alterar o status de um usuário inexistente', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .put('/usuarios/alterastatus')
            .send({
                id: 0,
                status: false,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });
});
