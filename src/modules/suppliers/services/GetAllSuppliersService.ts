import { inject, injectable } from 'tsyringe';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Supplier from '../infra/typeorm/entities/Supplier';

@injectable()
class GetAllSuppliers {
  constructor(
    @inject('SupplierRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  async execute(): Promise<Supplier[]> {
    const allSuppliers = await this.suppliersRepository.findAll();
    return allSuppliers;
  }
}
export default GetAllSuppliers;
