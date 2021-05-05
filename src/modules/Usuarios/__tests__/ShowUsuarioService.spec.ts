import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('ShowUsuarioService', () => {
    beforeAll(async () => {
        connectionTest = await createConnection();
    });

    afterAll(async () => {
        const connection = getConnection();

        await connectionTest.close();
        await connection.close();
    });

    it('deve conseguir visualizar dados de um usuário sendo do tipo root', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .get('/usuarios/show/2')
            .send()
            .set('authorization', token);

        expect(response.body).toHaveProperty('email');
    });

    it('deve conseguir visualizar dados de um  usuário sendo do tipo admin', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeAdmin@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .get('/usuarios/show/1')
            .send()
            .set('authorization', token);

        expect(response.body).toHaveProperty('email');
    });

    it('deve conseguir visualizar seus próprios dados sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .get('/usuarios/show/3')
            .send()
            .set('authorization', token);

        expect(response.body).toHaveProperty('email');
    });

    it('deve ser emitido mensagem de erro ao tentar vizualizar dados de usuário inexistente', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeRoot@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .get('/usuarios/show/0')
            .send()
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });

    it('não pode ser possível vizualizar dados de outro usuário sendo do tipo geral', async () => {
        const responseLogin = await request(app).post('/login').send({
            email: 'testeGeral@admin.com.br',
            senha: '123456',
        });

        const token = `Bearer ${responseLogin.body.token}`;

        const response = await request(app)
            .get('/usuarios/show/2')
            .send()
            .set('authorization', token);

        expect(response.body).toHaveProperty('error');
    });
});
