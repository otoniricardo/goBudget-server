import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { container } from 'tsyringe';
import AuthenticateUserSrvice from '@modules/users/services/AuthenticateUserService';

import User from '@modules/users/infra/typeorm/entities/User';

@ObjectType()
class CreateUserSessionResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}

@Resolver()
export default class AuthResolver {
  @Mutation(() => CreateUserSessionResponse)
  async CreateUserSession(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<CreateUserSessionResponse> {
    const authenticateUser = container.resolve(AuthenticateUserSrvice);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    return { user, token };
  }
}
