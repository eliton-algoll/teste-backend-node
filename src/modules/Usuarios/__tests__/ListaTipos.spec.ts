import request from 'supertest';

import { Connection, getConnection, createConnection } from 'typeorm';
import app from '../../../app';

let connectionTest: Connection;

describe('Tipos', () => {
    beforeAll(async () => {
        connectionTest = await createConnection();
    });

    afterAll(async () => {
        const connection = getConnection();

        await connectionTest.close();
        await connection.close();
    });

    it('deve apresentar lista de tipos cadastradas', async () => {
        const response = await request(app).get('/tipos');

        expect(response.body).toBeInstanceOf(Array);
    });
});
