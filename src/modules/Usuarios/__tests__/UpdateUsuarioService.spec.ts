import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('UpdateUsuarioService', () => {
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

    it('deve conseguir editar um usuário sendo do tipo root', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste update',
                tipoId: 2,
                senha: '123456',
                email: 'testeUpdate@teste.com.br',
            })
            .set('authorization', token);

        const responseUpdated = await request(app)
            .put('/usuarios/update')
            .send({
                id: response.body.id,
                nome: 'usuario teste alterado',
                tipoId: 1,
            })
            .set('authorization', token);

        expect(responseUpdated.body).toHaveProperty('email');
    });

    it('deve conseguir editar um usuário sendo do tipo admin', async () => {
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
            .put('/usuarios/update')
            .send({
                id: response.body.id,
                nome: 'usuario teste alterado',
                tipoId: 3,
            })
            .set('authorization', token);

        expect(responseUpdated.body).toHaveProperty('email');
    });

    it('deve conseguir editar seus proprios dados sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .put('/usuarios/update')
            .send({
                id: 3,
                nome: 'usuario teste alterado',
                tipoId: 2,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('email');

        const responseUpdated = await request(app)
            .put('/usuarios/update')
            .send({
                id: 3,
                nome: 'usuario teste geral',
                tipoId: 3,
            })
            .set('authorization', token);

        expect(responseUpdated.body).toHaveProperty('email');
    });

    it('não deve conseguir editar um usuário diferente do seu sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .put('/usuarios/update')
            .send({
                id: 2,
                nome: 'usuario teste alterado',
                tipoId: 3,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });

    it('deve retornar erro ao tentar editar um usuário inexistente', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .put('/usuarios/update')
            .send({
                id: 0,
                nome: 'usuario teste alterado',
                tipoId: 3,
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });
});
