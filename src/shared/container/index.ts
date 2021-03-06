import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import SupplierRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

import IproductRepository from '@modules/products/repositories/IProductRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

import ISaleRepository from '@modules/sales/repositories/ISalesRepository';
import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<ISuppliersRepository>(
  'SupplierRepository',
  SupplierRepository,
);

container.registerSingleton<IproductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<ISaleRepository>('SaleRepository', SaleRepository);
