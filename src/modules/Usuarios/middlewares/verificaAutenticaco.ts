import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';
import authConfig from '../../../config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    tipoId: number;
}

export default function validaAutenticacao(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Usuário não autenticado', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, tipoId } = decoded as ITokenPayload;

        request.body.usuarioLogado = {
            id: Number(sub),
            tipoId,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
