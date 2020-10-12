/* eslint-disable import/prefer-default-export */
import { AuthenticationError } from 'apollo-server-express';
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';

import { MyContext } from '../graphql/context';

export default class EnsureAuthentication
  implements MiddlewareInterface<MyContext> {
  use({ context }: ResolverData<MyContext>, next: NextFn): Promise<NextFn> {
    const { user_id } = context;

    if (!user_id) throw new AuthenticationError('Não autorizado');

    return next();
  }
}
