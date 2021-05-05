import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthService from '../services/AuthService';

class AuthController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, senha } = request.body;

            const authService = container.resolve(AuthService);

            const usuario = await authService.execute({
                email,
                senha,
            });

            return response.json(usuario);
        } catch (e) {
            return response.status(e.statusCode).json({ error: e.message });
        }
    }
}

export default AuthController;
