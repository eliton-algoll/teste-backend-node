import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('CreateUsuarioService', () => {
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

    it('deve conseguir cadastrar um usuário sendo do tipo root', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste root',
                tipoId: 2,
                senha: '123456',
                email: 'testeRoot@teste.com.br',
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('id');
    });

    it('deve conseguir cadastrar um usuário sendo do tipo admin', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste admin',
                tipoId: 2,
                senha: '123456',
                email: 'testeAdmin@teste.com.br',
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('id');
    });

    it('não pode ser possível cadastrar um usuário sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste geral',
                tipoId: 2,
                senha: '123456',
                email: 'testeGeral@teste.com.br',
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });

    it('não pode ser possível cadastrar um usuário com email já cadastrado', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .post('/usuarios/create')
            .send({
                nome: 'usuario teste mesmo email',
                tipoId: 2,
                senha: '123456',
                email: 'testeRoot@teste.com.br',
            })
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });
});
