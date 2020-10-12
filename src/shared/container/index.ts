import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import SupplierRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<ISuppliersRepository>(
  'SupplierRepository',
  SupplierRepository,
);
