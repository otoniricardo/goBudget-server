import { Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';

import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

import { container } from 'tsyringe';
import EnsureAuthentication from '@shared/infra/middlewares/EnsureAuthentication';
import CreateOrUpdateSalesService from '@modules/sales/services/CreateOrUpdateSalesService';

@Resolver()
export default class ProductResolver {
  @Mutation(() => String)
  @UseMiddleware(EnsureAuthentication)
  async CreateMonthSales(
    @Arg('file', () => GraphQLUpload || Boolean) file: FileUpload,
    @Arg('sold_in') sold_in: string,
  ): Promise<string> {
    const createSales = container.resolve(CreateOrUpdateSalesService);

    await createSales.execute({ file, sold_in });

    return 'vendas cadastradas com sucesso';
  }
}
