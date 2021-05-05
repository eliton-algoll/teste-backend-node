import { Request, Response } from 'express';

import TiposRepository from '../typeorm/repositories/TiposRepository';

const tiposRepository = new TiposRepository();

class TiposController {
    public async list(request: Request, response: Response): Promise<Response> {
        const tipos = await tiposRepository.findAll();

        return response.json(tipos);
    }
}

export default TiposController;
