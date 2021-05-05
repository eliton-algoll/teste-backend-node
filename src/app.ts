import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import './container';
import './database';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);
app.get('/', (req, res) => res.json([{ msgm: 'asd' }]));

export default app;
