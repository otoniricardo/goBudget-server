import { buildSchema } from 'type-graphql';

import SessionResolver from '@modules/users/infra/graphql/resolvers/auth';
import SupplierResolver from '@modules/suppliers/infra/graphql/resolvers/supplier';
import ProductResolver from '@modules/products/infra/graphql/resolvers/products';
import HelloResolver from './hello';

async function schema() {
  return buildSchema({
    resolvers: [
      HelloResolver,
      SessionResolver,
      SupplierResolver,
      ProductResolver,
    ],
    validate: false,
  });
}

export default schema();
