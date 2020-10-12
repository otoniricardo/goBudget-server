import { Resolver, Query } from 'type-graphql';

@Resolver()
export default class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'bye';
  }
}
