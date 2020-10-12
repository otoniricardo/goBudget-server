import { inject, injectable } from 'tsyringe';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import { ApolloError } from 'apollo-server-express';
import Supplier from '../infra/typeorm/entities/Supplier';

@injectable()
class GetSupplierByIdService {
  constructor(
    @inject('SupplierRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  async execute(id: string): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findById(id);

    if (!supplier) throw new ApolloError('Fornecedor não encontrado');

    return supplier;
  }
}
export default GetSupplierByIdService;
