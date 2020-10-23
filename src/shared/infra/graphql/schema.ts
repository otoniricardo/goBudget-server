import { buildSchema } from 'type-graphql';

import SessionResolver from '@modules/users/infra/graphql/resolvers/auth';
import SupplierResolver from '@modules/suppliers/infra/graphql/resolvers/supplier';
import ProductResolver from '@modules/products/infra/graphql/resolvers/products';
import SaleResolver from '@modules/sales/infra/graphql/resolvers/Sale';
import HelloResolver from './hello';

async function schema() {
  return buildSchema({
    resolvers: [
      HelloResolver,
      SessionResolver,
      SupplierResolver,
      ProductResolver,
      SaleResolver,
    ],
    validate: false,
  });
}

export default schema();
