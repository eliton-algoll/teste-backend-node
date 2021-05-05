import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('AuthService', () => {
    beforeAll(async () => {
        connectionTest = await createConnection();
    });

    afterAll(async () => {
        const connection = getConnection();

        await connectionTest.close();
        await connection.close();
    });

    it('usuário deve conseguir efetuar login', async () => {
        const response = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '123456',
        });

        expect(response.body).toHaveProperty('token');
    });

    it('não pode ser possível logar com um email inexistente', async () => {
        const response = await request(app).post('/login').send({
            email: 'testeAdminInexistente@admin.com.br',
            senha: '123456',
        });

        expect(response.body).toHaveProperty('error');
    });

    it('não pode ser possível logar com senha inválida', async () => {
        const response = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '1234',
        });

        expect(response.body).toHaveProperty('error');
    });
});
