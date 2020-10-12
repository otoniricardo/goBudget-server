import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export interface MyContext {
  user_id?: string;
}

interface TokenPayload {
  iat: number;
  ext: number;
  sub: string;
}

export function createContext(context: ExpressContext): MyContext {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    return {};
  }

  const [, token] = authHeader.split(' ');

  const {
    jwt: { secret },
  } = authConfig;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    return { user_id: sub };
  } catch {
    throw new AuthenticationError('Token de autenticação inválido');
  }
}
