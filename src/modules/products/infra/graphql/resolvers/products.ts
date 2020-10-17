import { Resolver, Mutation, Arg, UseMiddleware, Query } from 'type-graphql';

import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

import { container } from 'tsyringe';
import EnsureAuthentication from '@shared/infra/middlewares/EnsureAuthentication';

import UpdateProductsService from '@modules/products/services/UpdateProductsService';

import GetLatestUpdateService from '@modules/products/services/GetLastUpdateService';
import { format } from 'date-fns';

@Resolver()
export default class ProductResolver {
  @Mutation(() => String)
  @UseMiddleware(EnsureAuthentication)
  async UploadProductsStock(
    @Arg('file', () => GraphQLUpload || Boolean)
    file: FileUpload,
  ): Promise<string> {
    const updateProducts = container.resolve(UpdateProductsService);

    await updateProducts.execute(file);

    return 'Arquivo processado com sucesso';
  }

  @Query(() => String)
  @UseMiddleware(EnsureAuthentication)
  async getProductsLastUpdate(): Promise<string> {
    const getLatestUpdate = container.resolve(GetLatestUpdateService);

    const lastUpdate = await getLatestUpdate.execute();

    if (!lastUpdate) return 'Nenhuma atualização foi realizada';

    return format(lastUpdate, "dd/MM/yyyy 'às' HH:mm 'h'");
  }
}
