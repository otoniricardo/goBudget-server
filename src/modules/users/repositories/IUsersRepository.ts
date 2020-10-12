import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByEmail(data: string): Promise<User | undefined>;
}
